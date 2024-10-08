import {CountUp} from 'countup.js'
const counter = {
    $ele: document.querySelectorAll('[data-count-to]'),
    $circlepath: document.querySelectorAll('[data-count-path]'),
    init(){
        const _ = this;
        _.$ele.forEach($el=>{
            $el.counter = new CountUp($el, $el.getAttribute('data-count-to'), {
                startVal: Number($($el).html()),
                duration: 3.5
            })
        })
        _.$circlepath.forEach($path=>{
            const $dash = $path.getAttribute('stroke-dasharray');
            const $pathvalue = $path.getAttribute('data-count-path');
            const $progress = $dash - ($dash * $pathvalue / 100);
            $path.style.strokeDashoffset = $progress;
            console.log('$p', $path, $progress  )
        })
    }
}
export default counter;