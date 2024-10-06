import $ from 'jquery';
const ourJourney = {
    $e: document.querySelectorAll("ul.our-journey-links > li > a"),
    $t: document.querySelector("ul.our-journey-links > li:first-child > a"),
    jn(e){
        e.preventDefault();
        let n = e.target.getAttribute("data-name");
        let c = document.querySelectorAll(`.our-journey-row`);
        let d = document.querySelector(`.our-journey-row[data-value=${n}]`);
        let f = $(d);
        let $i = document.querySelectorAll("ul.our-journey-links > li > a")
     
        $i.forEach((d)=>{
            d.classList.remove('active');
        })
        e.target.classList.toggle('active')
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
            e.addEventListener("click", this.jn)
        });
    },
}
export default ourJourney;
