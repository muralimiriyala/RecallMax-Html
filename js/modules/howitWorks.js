import $ from 'jquery';
const howitWorks = {
    $e: document.querySelectorAll("ul.how-work-links > li > a"),
    $t: document.querySelector("ul.how-work-links > li:first-child > a"),
    $firstp: document.querySelector("ul.how-work-links > li:first-child > a > p"),
    $p: document.querySelectorAll("ul.how-work-links > li > a > p"),
    jn(e, $e, $p){
        e.preventDefault();
        $e.forEach((d)=> d.classList.remove('active'));
        $e.forEach((p)=>{
            p.children[2].style.maxHeight = `${0}px`;
            p.style.maxHeight = `${$p.scrollHeight}px`;
        });
        let target = e.target;  
        if(target.tagName==="SPAN") target = target.parentElement;
        console.log(target)
        target.classList.toggle('active')

        const cscroll = target.children[2];
        cscroll.style.maxHeight = `${cscroll.scrollHeight}px`;
        let n = target.getAttribute("data-name");
        let c = document.querySelectorAll(`.how-work-row`);
        let d = document.querySelectorAll(`.how-work-row[data-value=${n}]`);
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
            e.addEventListener("click", (event) => _.jn(event, _.$e, _.$p));
        });
    },
}
export default howitWorks;
