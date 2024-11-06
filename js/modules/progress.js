const svgprogress = {
    $max: document.querySelector('.max-total'),
    $circlesvg: document.querySelectorAll('.round-default-svg'),
    $circlepath: document.querySelectorAll('[data-count-path]'),
    $circleto: document.querySelectorAll('[data-count-to]'),
    init(){
        const _=this;

        let $svgvalues = [];
        _.$circleto.forEach(($item, $i) => {
            $svgvalues[$i] = $item.dataset.countTo;
        });
        if (!_.$circleto.length) return;
        _.$circlesvg.forEach(($ele, $index) => {
            let pathsInSvg = $ele.querySelectorAll('circle');
            if (!pathsInSvg.length) return;
            pathsInSvg.forEach(($path, pathIndex) => {
                $path.setAttribute('data-count-path', $svgvalues[$index]);
            });
        });


        if(!_.$max) return;
        let start = parseInt(_.$max.innerHTML.replace(/,/g, ''), 10) || 0;
        if(start<0) return;
        localStorage.getItem('name')
        // let end= 337234349;
        // let count=[];
        const countermain = () =>{
            start++;
            const localvalue = localStorage.setItem('name', start);
            _.$max.innerHTML = start.toLocaleString();
            // count.push(start)
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