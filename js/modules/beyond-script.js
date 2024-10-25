import $ from 'jquery';
const beyond = {
    $e: document.querySelectorAll(".beyond-link"),
    $t: document.querySelector("ul.beyond-links > li:first-child > .beyond-link"),
    $firstp: document.querySelector("ul.beyond-links > li:first-child .beyond-link-desc"),
    $p: document.querySelectorAll(".beyond-link-desc"),
    $row: document.querySelectorAll('.beyond-row'),
    $textrow: document.querySelectorAll('.beyond-text-row'),
    beyondfun(e, $e, $p){
        e.preventDefault();
        $e.forEach((d)=> d.classList.remove('active'));
        $e.forEach((p)=>{
            p.children[2].style.maxHeight = `${0}px`;
            p.style.maxHeight = `${$p.scrollHeight}px`;
        });
        let target = e.target;  
        if(target.tagName==="IMG") target = target.parentElement;
        if(target.tagName==="SPAN") target = target.parentElement;
        target.classList.toggle('active')

        const cscroll = target.children[2];
        if(!cscroll) return
        cscroll.style.maxHeight = `${cscroll.scrollHeight}px`;

        let n = target.getAttribute("data-name");
        let c = document.querySelectorAll(`.beyond-row`);
        let d = document.querySelectorAll(`.beyond-row[data-value=${n}]`);
        let f = $(d).children('.beyond-image')
        c.forEach((e)=>{
            const beyondimg = $(e).children('.beyond-image')
            beyondimg.css({
                'transform': 'scale(0)'
            })
        })
        f.css({
            'transform': 'scale(1)'
        })

        let btr = document.querySelectorAll(`.beyond-text-row`);
        let btrv = document.querySelectorAll(`.beyond-text-row[data-value=${n}]`);

        btr.forEach((ele)=>{
            ele.style.maxHeight = `${0}px`;
        });
        btrv.forEach((ele) => {
            ele.style.maxHeight = `${ele.scrollHeight}px`;
        });

    },
    init(){
        const _=this;
        _.$t.classList.add("active");
        _.$firstp.style.maxHeight = `${_.$firstp.scrollHeight}px`;

        _.$row[0].classList.add('open');

 
        _.$textrow[0].classList.add('open');
        _.$textrow[0].style.maxHeight = `${_.$textrow[0].scrollHeight}px`;



        _.$e.forEach((e)=>{
            e.addEventListener("click", (event) => _.beyondfun(event, _.$e, _.$p));
        });
    },
}
export default beyond;
