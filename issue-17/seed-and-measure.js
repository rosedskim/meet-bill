window.__seed = (kind) => {
  const M = ['지우', '하준', '서연', '도윤', '예린', '민재', '수아', '태오'];
  const mk = (id, name, total, participants, fixed = {}, sent = {}) => ({ id, name, total, participants, fixed, sent });
  let data;
  if (kind === 'one') {
    data = { title: '', members: M.slice(0, 4), rounds: [mk(1, '칼국수', 100000, M.slice(0, 4))] };
  } else {
    const rounds = [
      mk(1, '칼국수', 42000, ['지우', '하준', '서연'], { 하준: 17000 }),
      mk(2, '볼링', 36000, ['지우', '하준', '서연', '도윤', '예린', '민재']),
      mk(3, '카페', 9500, ['서연']),
      mk(4, '고깃집', 175000, M, { 수아: 21000 }),
      mk(5, '호프', 143200, M, { 태오: 18000 }),
      mk(6, '편의점', 23500, ['서연', '도윤', '예린', '민재', '태오']),
    ];
    if (kind === 'paid') {
      rounds[0].sent = { 서연: true };
      rounds[1].sent = { 지우: true };
      rounds[3].sent = { 수아: true };
      rounds[4].sent = { 태오: true };
    }
    data = { title: '5/17 번개 모임', members: M, rounds };
  }
  localStorage.setItem('meet-bill:v1', JSON.stringify(data));
};
window.__measure = () => {
  const wrap = document.querySelector('.table-wrap');
  if (!wrap) return null;
  const table = wrap.firstChild;
  const cells = [...table.querySelectorAll('td')].filter(td => /\d/.test(td.textContent) && !td.querySelector('.extra'));
  let multi = 0;
  for (const td of cells) {
    const tn = [...td.childNodes].find(n => n.nodeType === 3);
    if (!tn) continue;
    const r = document.createRange(); r.selectNodeContents(tn);
    if (r.getClientRects().length > 1) multi++;
  }
  return {
    vw: innerWidth, wrapClient: wrap.clientWidth, tableScroll: table.scrollWidth, tableRect: +table.getBoundingClientRect().width.toFixed(2),
    wrapScroll: wrap.scrollWidth, font: wrap.style.fontSize, cols: table.rows[0].cells.length, multiLineNumbers: multi,
    clipped: table.getBoundingClientRect().width > wrap.clientWidth + 0.5,
  };
};
