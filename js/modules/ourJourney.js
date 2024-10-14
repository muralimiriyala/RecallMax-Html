import $ from 'jquery';
const ourJourney = {
    $e: document.querySelectorAll("ul.our-journey-links > li > a"),
    $t: document.querySelector("ul.our-journey-links > li:first-child > a"),
    jn(e, $e){
        e.preventDefault();
        $e.forEach((d)=> d.classList.remove('active'));
        let target = e.target;  
        if(target.tagName==="SPAN") target = target.parentElement;
        target.classList.toggle('active')
        let n = target.getAttribute("data-name");
        let c = document.querySelectorAll(`.our-journey-row`);
        let d = document.querySelector(`.our-journey-row[data-value=${n}]`);
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
        _.$e.forEach((e)=>{
            e.addEventListener("click", (event) => _.jn(event, _.$e));
        });
    },
}
export default ourJourney;
