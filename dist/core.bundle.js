const eleScroll=function(e){e.preventDefault();let t=document.querySelector("header").clientHeight;const o=e.target.getAttribute("href").substring(1);l=/^\d/.test(o)?document.querySelector(`#\\3${o.charAt(0)} ${o.slice(1)}`):document.querySelector(`#${o}`);let l=document.querySelector(`#${o}`);(l||o)&&window.scroll({top:l.offsetTop-t,behavior:"smooth"})};window.onscroll=function(){parseInt(this.scrollY)};let atags=document.querySelectorAll("a[href]").forEach((e=>{let t=e.getAttribute("href"),o=t.length>0,l=t.substring(1);t.includes(`#${l}`)&&o&&e.addEventListener("click",(function(e){eleScroll(e)}))}));const pageScroll=function(){};