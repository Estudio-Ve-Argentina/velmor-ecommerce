async function test() {
  const res = await fetch('https://velmor.mitiendanube.com/productos/cinturon-negro-simbolo-y-logo/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const formMatch = html.match(/<form[\s\S]*?action=["']\/comprar\/["'][\s\S]*?<\/form>/);
  if (formMatch) {
    const inputs = formMatch[0].match(/<input[^>]+>/g);
    console.log('Inputs:', inputs);
    const selects = formMatch[0].match(/<select[^>]+>/g);
    console.log('Selects:', selects);
  }
}
test();
