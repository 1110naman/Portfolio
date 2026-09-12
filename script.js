const links=[...document.querySelectorAll('.side-link')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>observer.observe(s));

const reveals=[...document.querySelectorAll('.reveal')];
const ro=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
reveals.forEach(x=>ro.observe(x));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener('click',()=>{
   const target=document.querySelector(a.getAttribute('href'));
   if(target) setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),0);
 });
});
