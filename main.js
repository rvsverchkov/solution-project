(()=>{"use strict";var e,t,o,n,r,c,u,l,i,s,a,d,_={989:(e,t,o)=>{e.exports=o.p+"34ad0292d65f7cf4b26d.png"}},v={};function m(e){var t=v[e];if(void 0!==t)return t.exports;var o=v[e]={exports:{}};return _[e](o,o.exports,m),o.exports}m.p="",o=m(989),n=document.querySelector(".action__logo"),r=document.querySelector(".textbox__button"),c=document.querySelector(".action__textbox"),u=document.querySelector(".action__logo"),l=document.querySelectorAll(".action__solution"),i=document.querySelector(".solution__form"),s=document.querySelector(".solution__subform"),a=document.querySelector(".solution__button-beyond"),d=new Map,i.addEventListener("submit",(function(o){o.preventDefault();var n=i.querySelectorAll(".solution__input");e=n[0],t=n[1].value.split(" "),console.log(e),console.log(t),l[1].classList.remove("action__solution-hidden"),l[0].classList.add("action__solution-hidden")})),s.addEventListener("submit",(function(e){e.preventDefault();var t=s.querySelector(".solution__input").value,o=s.querySelector(".solution__select").value;switch(String(o)){case"Несущественно":o=1;break;case"Не очень важно":o=2;break;case"Важно":o=3}d.set(t,o)})),a.addEventListener("click",(function(){console.log(d)})),r.addEventListener("click",(function(){c.remove(),u.remove(),l[0].classList.remove("action__solution-hidden")})),n.src=o})();