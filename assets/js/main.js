// ==== Active menu by current file ====
(function(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('.nav-link[data-page]').forEach(a=>{
    if(a.dataset.page.toLowerCase() === path){ a.classList.add('active'); }
    if((path==="" || path==="/") && a.dataset.page==="index.html"){ a.classList.add('active'); }
  });
})();

// ==== Horizontal shelf smooth scroll (wheel -> horizontal) ====
document.querySelectorAll('.eg-track').forEach(track=>{
  track.addEventListener('wheel', (e)=>{
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      e.preventDefault();
      track.scrollBy({left: e.deltaY, behavior:'smooth'});
    }
  }, {passive:false});
});

// ==== Chips filter demo on Home (id="shelf-projects") ====
const chips = document.querySelectorAll('.eg-chip');
chips.forEach(ch => ch.addEventListener('click', ()=>{
  chips.forEach(c=>c.classList.remove('active'));
  ch.classList.add('active');
  const tag = ch.dataset.chip;
  const cards = document.querySelectorAll('#shelf-projects .eg-card');
  cards.forEach(card=>{
    card.style.display = (tag==='all' || card.dataset.tag===tag) ? 'block' : 'none';
  });
}));

// ==== Reveal on scroll (.fx-reveal -> .is-inview) ====
(() => {
  const els = document.querySelectorAll('.fx-reveal');
  if(!('IntersectionObserver' in window) || els.length===0) return els.forEach(el=>el.classList.add('is-inview'));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('is-inview'); io.unobserve(e.target); }
    });
  }, {rootMargin:'0px 0px -10% 0px', threshold:0.1});
  els.forEach(el=>io.observe(el));
})();

// ==== Parallax for hero (.eg-hero[data-parallax]) ====
(() => {
  const hero = document.querySelector('.eg-hero[data-parallax]');
  if(!hero) return;
  const strength = parseFloat(hero.dataset.parallax || '0.12');
  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    hero.style.transform = `translateY(${rect.top * strength}px)`;
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// ==== Back to Top ====
const backBtn = document.getElementById('backToTop');
if(backBtn){
  window.addEventListener('scroll',()=>{
    backBtn.style.display = (window.scrollY>300) ? 'inline-flex' : 'none';
  });
  backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// ==== Awards modal (if used) ====
document.addEventListener('click', function(e){
  const card = e.target.closest('[data-award-src]');
  if(!card) return;
  const img = document.getElementById('galleryImage');
  const cap = document.getElementById('galleryCaption');
  if(img) img.src = card.getAttribute('data-award-src');
  if(cap) cap.textContent = card.getAttribute('data-award-caption') || "";
});
// ปิด parallax/tilt บนจอเล็กหรืออุปกรณ์สัมผัส
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ปิด parallax ถ้าเป็นมือถือ
(() => {
  const hero = document.querySelector('.eg-hero[data-parallax]');
  if(!hero) return;
  if(isTouch || window.innerWidth < 576){ hero.style.transform = ''; return; }
  const strength = parseFloat(hero.dataset.parallax || '0.12');
  const onScroll = () => {
    const r = hero.getBoundingClientRect();
    hero.style.transform = `translateY(${r.top * strength}px)`;
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// ปิด tilt บนมือถือ
(() => {
  if(isTouch) return;
  const cards = document.querySelectorAll('.tilt');
  if(cards.length===0) return;
  const max = 8;
  cards.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      const cover = card.querySelector('.cover');
      if(cover) cover.style.transform = `translateZ(14px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
      const cover = card.querySelector('.cover');
      if(cover) cover.style.transform = 'translateZ(14px)';
    });
  });
})();

