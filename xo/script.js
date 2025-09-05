const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const btnReset = document.getElementById('btnReset');

let current = 'X';
let cells = Array(9).fill('');
let active = true;

/* สร้างกระดาน 3x3 */
function init(){
  boardEl.innerHTML = '';
  cells = Array(9).fill('');
  active = true;
  current = 'X';
  statusEl.textContent = `ถึงตา: ${current}`;
  for(let i=0;i<9;i++){
    const d = document.createElement('button');
    d.className = 'cell';
    d.setAttribute('data-idx', i);
    d.setAttribute('aria-label', `ช่องที่ ${i+1}`);
    d.addEventListener('click', onPlay);
    boardEl.appendChild(d);
  }
}

/* เช็กผู้ชนะ */
const wins = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];
function checkWinner(){
  for(const [a,b,c] of wins){
    if(cells[a] && cells[a]===cells[b] && cells[a]===cells[c]) return [a,b,c];
  }
  return null;
}

/* เมื่อผู้เล่นคลิก */
function onPlay(e){
  if(!active) return;
  const idx = +e.currentTarget.dataset.idx;
  if(cells[idx]) return; // ช่องถูกเล่นไปแล้ว
  cells[idx] = current;
  e.currentTarget.textContent = current;

  const win = checkWinner();
  if(win){
    active = false;
    document.querySelectorAll('.cell').forEach((c,i)=>{ if(win.includes(i)) c.classList.add('win'); });
    statusEl.textContent = `ผู้ชนะคือ: ${current} 🎉`;
    return;
  }
  if(cells.every(Boolean)){
    active = false;
    statusEl.textContent = 'เสมอ!';
    return;
  }
  current = current === 'X' ? 'O' : 'X';
  statusEl.textContent = `ถึงตา: ${current}`;
}

btnReset.addEventListener('click', init);
init();
