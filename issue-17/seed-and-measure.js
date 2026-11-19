window.__seed = (kind) => {
  const M = ['문원','수민','동현','석현','선진','일준','주희','범석'];
  const all = M;
  const mk = (id, name, total, participants, fixed = {}, sent = {}) => ({ id, name, total, participants, fixed, sent });
  let data;
  if (kind === 'one') {
    data = { title: '', members: ['문원','수민','동현','석현'], rounds: [mk(1, '', 100000, ['문원','수민','동현','석현'])] };
  } else {
    const rounds = [
      mk(1, '초밥', 49300, ['수민','동현'], { 수민: 28200 }),
      mk(2, '보드게임', 36000, ['문원','수민','동현','석현','선진','일준']),
      mk(3, '보드게임음료', 21900, ['동현']),
      mk(4, '미미철판', 181000, all, { 주희: 20000 }),
      mk(5, '바차술집', 164700, all, { 주희: 19000 }),
      mk(6, '편의점', 22700, ['수민','동현','석현','선진','범석']),
    ];
    if (kind === 'paid') {
      rounds[0].sent = { 수민: true, 동현: true };
      rounds[1].sent = { 문원: true, 수민: true, 동현: true, 석현: true, 선진: true, 일준: true };
      rounds[2].sent = { 동현: true };
      rounds[3].sent = { 문원: true, 주희: true };
      rounds[4].sent = { 주희: true };
    }
    data = { title: kind === 'paid' ? '11월 번개 회식' : '', members: M, rounds };
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
    const r = document.createRange(); r.selectNodeContents(tn);
    if (r.getClientRects().length > 1) multi++;
  }
  return {
    vw: innerWidth, wrapClient: wrap.clientWidth, tableScroll: table.scrollWidth, tableRect: +table.getBoundingClientRect().width.toFixed(2),
    wrapScroll: wrap.scrollWidth, font: wrap.style.fontSize, cols: table.rows[0].cells.length, multiLineNumbers: multi,
    clipped: table.getBoundingClientRect().width > wrap.clientWidth + 0.5,
  };
};
