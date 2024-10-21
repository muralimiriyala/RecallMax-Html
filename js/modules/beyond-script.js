import $ from 'jquery';
const beyond = {
    $e: document.querySelectorAll("ul.beyond-links > li > a"),
    $t: document.querySelector("ul.beyond-links > li:first-child > a"),
    $firstp: document.querySelector("ul.beyond-links > li:first-child > a > p"),
    $p: document.querySelectorAll("ul.beyond-links > li > a > p"),
    beyondfun(e, $e, $p){
        e.preventDefault();
        $e.forEach((d)=> d.classList.remove('active'));
        $e.forEach((p)=>{
            p.children[2].style.maxHeight = `${0}px`;
            p.style.maxHeight = `${$p.scrollHeight}px`;
        });
        let target = e.target;  
        if(target.tagName==="SPAN") target = target.parentElement;
        target.classList.toggle('active')

        const cscroll = target.children[2];
        cscroll.style.maxHeight = `${cscroll.scrollHeight}px`;
        let n = target.getAttribute("data-name");
        let c = document.querySelectorAll(`.beyond-row`);
        let d = document.querySelectorAll(`.beyond-row[data-value=${n}]`);
        let f = $(d);    
 
        c.forEach((e)=>{
            $(e).hide();
        })
        f.fadeIn(800);
    },
    init(){
        const _=this;
        if(!_.$t) return;
        _.$t.classList.add("active");
        _.$firstp.style.maxHeight = `${_.$firstp.scrollHeight}px`;
        _.$e.forEach((e)=>{
            e.addEventListener("click", (event) => _.beyondfun(event, _.$e, _.$p));
        });
    },
}
export default beyond;
