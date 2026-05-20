// /api/quickbooks/assinaturas.js
//
// Detecta cobranças recorrentes (Purchase + Bill) nos últimos 18 meses.
// Categoriza: Software, Infraestrutura, Marketing, Seguros, Bancos/Taxas, Outros.

const CAT_KEYS = {
  Software: ['adobe','figma','notion','slack','microsoft','365','office','quickbooks','intuit',
    'google workspace','gsuite','dropbox','zoom','asana','trello','monday','airtable','todoist',
    'lastpass','1password','github','gitlab','jetbrains','visual studio','linear','clickup',
    'apple','icloud','audible','spotify','netflix','calendly','loom','grammarly','typeform',
    'descript','superhuman','sketch','linear','plausible'],
  Infraestrutura: ['aws','amazon web','azure','google cloud','gcp','vercel','supabase','cloudflare',
    'digitalocean','heroku','netlify','render','railway','fly.io','linode','mongodb','redis',
    'twilio','sendgrid','mailgun','stripe','plaid','rapidapi','postman','datadog','sentry',
    'fastly','akamai','contabo','hostinger','hostgator','godaddy','namecheap','squarespace','wordpress'],
  Marketing: ['mailchimp','brevo','sendinblue','activecampaign','constant contact','hubspot',
    'salesforce','canva','semrush','ahrefs','moz','klaviyo','convertkit','drip','buffer',
    'hootsuite','later','sprout social','meta business','facebook ads','google ads','linkedin ads',
    'tiktok ads','snapchat ads','intercom','drift','calendly'],
  Seguros: ['geico','progressive','statefarm','state farm','allstate','liberty','farmers',
    'nationwide','travelers','usaa','aaa','metlife','aetna','blue cross','blue shield',
    'cigna','humana','kaiser','united health','next insur','next insurance','hiscox','simply business',
    'biberk','thimble','assurant','chubb','hartford','intuit insurance','insur','insurance'],
  'Bancos/Taxas': ['checking','savings','credit card','debit card','chase','bank of america',
    'wells fargo','citi','capital one','american express','amex','discover','visa','mastercard',
    'paypal','venmo','zelle','wire fee','overdraft','atm fee','monthly fee','service fee',
    'apple card','wallet','revolut','wise','klarna','affirm']
};
const EMAIL_MKT = ['mailchimp','brevo','sendinblue','activecampaign','constant contact','klaviyo','convertkit','drip','hubspot'];

// Keywords pra detectar nome de conta/cartão (não é um vendor real)
const NAO_VENDOR = [
  'checking', 'savings', 'credit card', 'debit card', 'cartao', 'cartão',
  'account', 'conta', 'wallet'
];

function categorizar(nome){
  const n = (nome||'').toLowerCase();
  for(const [cat, keys] of Object.entries(CAT_KEYS)){
    if(keys.some(k => n.includes(k))) return cat;
  }
  return 'Outros';
}

function isNomeConta(nome){
  const n = (nome||'').toLowerCase();
  return NAO_VENDOR.some(k => n.includes(k));
}

function pertoDe(v1, v2, tol = 0.05){
  const med = (Math.abs(v1) + Math.abs(v2)) / 2;
  if(med === 0) return false;
  return Math.abs(Math.abs(v1) - Math.abs(v2)) / med <= tol;
}

function detectFreq(diasArr){
  if(diasArr.length === 0) return null;
  const med = diasArr.reduce((a,b)=>a+b,0) / diasArr.length;
  if(med >= 25 && med <= 35)  return { tipo:'Mensal',      dias:30  };
  if(med >= 80 && med <= 100) return { tipo:'Trimestral',  dias:90  };
  if(med >= 170 && med <= 200)return { tipo:'Semestral',   dias:180 };
  if(med >= 340 && med <= 400)return { tipo:'Anual',       dias:365 };
  return null;
}

function ymKey(dateStr){
  return dateStr.slice(0,7);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';

    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setMonth(inicio.getMonth() - 18);
    const inicioStr = inicio.toISOString().slice(0,10);
    const hojeStr = hoje.toISOString().slice(0,10);

    const q = (entity) => `select * from ${entity} where TxnDate >= '${inicioStr}' and TxnDate <= '${hojeStr}' MAXRESULTS 1000`;

    const [purRes, billRes] = await Promise.all([
      fetch(`${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(q('Purchase'))}&minorversion=70`),
      fetch(`${proto}://${host}/api/quickbooks/proxy?endpoint=query&query=${encodeURIComponent(q('Bill'))}&minorversion=70`)
    ]);

    const purData  = purRes.ok ? await purRes.json() : {};
    const billData = billRes.ok ? await billRes.json() : {};

    const purchases = purData?.QueryResponse?.Purchase || [];
    const bills = billData?.QueryResponse?.Bill || [];

    // Normaliza pra { vendor, valor, data, isConta }
    const transacoes = [];

    purchases.forEach(p => {
      // Tenta achar o nome do vendor real primeiro. Se não tiver, usa fallback.
      let vendor = p?.EntityRef?.name;
      let isConta = false;

      if (!vendor) {
        // Fallback: tenta extrair de Description ou Memo
        const desc = (p?.PrivateNote || p?.Memo || '').trim();
        if (desc) {
          // Pega só primeira parte antes de qualquer numero/data
          vendor = desc.split(/\s+\d|\s+\$/)[0].trim().substring(0, 60);
        }
      }

      if (!vendor) {
        // Último fallback: nome da conta/cartão
        vendor = p?.PaymentMethodRef?.name || p?.AccountRef?.name || 'Unknown';
        isConta = true;
      }

      const valor = Math.abs(parseFloat(p?.TotalAmt || 0));
      const data = p?.TxnDate;
      if(valor > 0 && data) transacoes.push({ vendor, valor, data, id: p?.Id, src: 'Purchase', isConta });
    });

    bills.forEach(b => {
      const vendor = b?.VendorRef?.name || 'Unknown';
      const valor = Math.abs(parseFloat(b?.TotalAmt || 0));
      const data = b?.TxnDate;
      if(valor > 0 && data) transacoes.push({ vendor, valor, data, id: b?.Id, src: 'Bill', isConta: false });
    });

    // Detecta isConta também por nome (segurança)
    transacoes.forEach(t => {
      if (!t.isConta && isNomeConta(t.vendor)) t.isConta = true;
    });

    // Agrupa por (vendor + valor ±5%)
    const grupos = [];
    transacoes.forEach(t => {
      let g = grupos.find(x =>
        x.vendor.toLowerCase() === t.vendor.toLowerCase() && pertoDe(x.valor, t.valor)
      );
      if(!g){
        g = { vendor: t.vendor, valor: t.valor, txs: [], isConta: t.isConta };
        grupos.push(g);
      }
      g.txs.push(t);
      g.valor = g.txs.reduce((a,x)=>a+x.valor,0) / g.txs.length;
    });

    // Pra cada grupo com 3+ transações, identifica frequência
    const assinaturas = [];
    grupos.forEach(g => {
      if(g.txs.length < 3) return;

      const ts = [...g.txs].sort((a,b) => a.data.localeCompare(b.data));
      const diasEntre = [];
      for(let i = 1; i < ts.length; i++){
        const d1 = new Date(ts[i-1].data);
        const d2 = new Date(ts[i].data);
        diasEntre.push(Math.round((d2 - d1) / (1000*60*60*24)));
      }
      const freq = detectFreq(diasEntre);
      if(!freq) return;

      const ultimaData = new Date(ts[ts.length-1].data);
      const proximaData = new Date(ultimaData);
      proximaData.setDate(proximaData.getDate() + freq.dias);

      let porMes = g.valor;
      if(freq.tipo === 'Trimestral') porMes = g.valor / 3;
      else if(freq.tipo === 'Semestral') porMes = g.valor / 6;
      else if(freq.tipo === 'Anual') porMes = g.valor / 12;
      const totalAnual = porMes * 12;

      let aumentoPct = 0;
      let valorAnterior = null;
      let valorAtual = g.valor;
      if(ts.length >= 4){
        const meio = Math.floor(ts.length / 2);
        const med1 = ts.slice(0, meio).reduce((a,x)=>a+x.valor,0) / meio;
        const med2 = ts.slice(meio).reduce((a,x)=>a+x.valor,0) / (ts.length - meio);
        const diff = (med2 - med1) / med1;
        if(diff > 0.05){
          aumentoPct = diff * 100;
          valorAnterior = med1;
          valorAtual = med2;
        }
      }

      const diasDesdeUltima = Math.round((hoje - ultimaData) / (1000*60*60*24));
      const ativa = diasDesdeUltima < (freq.dias * 1.5);

      // Categoria: se for conta, força Bancos/Taxas (mesmo se nome bater outras keywords)
      let categoria = g.isConta ? 'Bancos/Taxas' : categorizar(g.vendor);

      assinaturas.push({
        vendor: g.vendor,
        categoria,
        frequencia: freq.tipo,
        valorAtual,
        valorAnterior,
        aumentoPct,
        ocorrencias: ts.length,
        primeiraCobranca: ts[0].data,
        ultimaCobranca: ts[ts.length-1].data,
        proximaCobranca: proximaData.toISOString().slice(0,10),
        totalMensal: porMes,
        totalAnual,
        ativa,
        diasDesdeUltima,
        isConta: g.isConta,
        qboLink: null
      });
    });

    assinaturas.sort((a,b) => b.totalAnual - a.totalAnual);

    const ativas = assinaturas.filter(a => a.ativa);

    // Redundâncias de email marketing
    const emailMktAtivas = ativas.filter(a => EMAIL_MKT.some(k => a.vendor.toLowerCase().includes(k)));
    const alertas = [];
    if(emailMktAtivas.length >= 2){
      const totalMes = emailMktAtivas.reduce((a,b)=>a+b.totalMensal,0);
      const ordenado = [...emailMktAtivas].sort((a,b) => a.totalMensal - b.totalMensal);
      const economiaMes = totalMes - ordenado[0].totalMensal;
      alertas.push({
        grupo: 'Email Marketing',
        ferramentas: emailMktAtivas.map(a => a.vendor),
        qtd: emailMktAtivas.length,
        totalMes,
        economiaMes
      });
    }

    const totalMes = ativas.reduce((a,b)=>a+b.totalMensal,0);
    const totalAno = totalMes * 12;
    const qtdMensais = ativas.filter(a => a.frequencia === 'Mensal').length;
    const qtdAnuais = ativas.filter(a => a.frequencia === 'Anual').length;
    const qtdAumentaram = ativas.filter(a => a.aumentoPct > 0).length;
    const economiaPotencialAno = alertas.reduce((a,b)=>a+b.economiaMes,0) * 12;

    const totalPorCategoria = {};
    ativas.forEach(a => {
      totalPorCategoria[a.categoria] = (totalPorCategoria[a.categoria] || 0) + a.totalMensal;
    });

    const meses = [];
    for(let i = 11; i >= 0; i--){
      const d = new Date(hoje);
      d.setMonth(d.getMonth() - i);
      const ym = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      meses.push({ mes: ym, total: 0 });
    }
    transacoes.forEach(t => {
      const ym = ymKey(t.data);
      const slot = meses.find(m => m.mes === ym);
      if(slot){
        const isAssin = assinaturas.some(a =>
          a.vendor.toLowerCase() === t.vendor.toLowerCase() && pertoDe(a.valorAtual, t.valor, 0.1)
        );
        if(isAssin) slot.total += t.valor;
      }
    });
    const crescimento = meses;

    return res.status(200).json({
      assinaturas,
      resumo: {
        totalMes,
        totalAno,
        qtdAtivas: ativas.length,
        qtdMensais,
        qtdAnuais,
        qtdAumentaram,
        economiaPotencialAno,
        totalPorCategoria
      },
      alertas,
      crescimento,
      _meta: {
        transacoesAnalisadas: transacoes.length,
        gruposEncontrados: grupos.length,
        janelaInicio: inicioStr,
        janelaFim: hojeStr,
        purchasesQtd: purchases.length,
        billsQtd: bills.length
      }
    });
  } catch(err){
    console.error('[assinaturas] error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
};
