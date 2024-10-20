const svgprogress = {
    $dollar: document.querySelector('.max-dollar'),
    $max: document.querySelector('.max-total'),
    $circlepath: document.querySelectorAll('[data-count-path]'),
    init(){
        const _=this;
        let start = 0;
        // let end= 337234349;
        // let count=[];
        const countermain = () =>{
            if(start<0) return;
            if(!_.$dollar) return;
            if(!_.$max) return;
            _.$dollar.innerHTML='$';
            _.$max.innerHTML=start.toLocaleString();
            // count.push(start)
            start++;
            // if(start===end){
            //     clearInterval(counter)
            // }
        }
        const counter = setInterval(countermain, 1000);
    },
    play(){
        const _ = this;
        _.$circlepath.forEach($path=>{
            let $dash = $path.getAttribute('stroke-dasharray');
            let $pathvalue = $path.getAttribute('data-count-path');
            let $duration = Number($path.getAttribute('data-duration') / 1000);
            $dash = parseInt($dash)
            $pathvalue = parseInt($pathvalue)
            const $progress = Math.floor($dash - ($dash * $pathvalue / 100));
            $path.style.strokeDashoffset = $progress+'px';
            $path.style.transitionDuration = `${$duration}s`;
        })
    },
    reset(){
        const _ = this;
        _.$circlepath.forEach($path=>{
            let $dash = $path.getAttribute('stroke-dasharray');
            $path.style.strokeDashoffset = Number($dash);
            let $duration = Number($path.getAttribute('data-duration') / 1000);
            $path.style.transitionDuration = `${$duration}s`;
        });
    }
}
export default svgprogress;