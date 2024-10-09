import {CountUp} from 'countup.js'
const counter = {
    $ele: document.querySelectorAll('[data-count-to]'),
    init(){
        const _ = this;
        _.$ele.forEach($el=>{

            console.log($el.getAttribute('data-duration') / 1000, "tetetet131313")
            $el.counter = new CountUp($el, $el.getAttribute('data-count-to'), {
                startVal: Number($($el).html()),
                duration: Number($el.getAttribute('data-duration') / 1000 * 1.5),
            })
        })
    }
}
export default counter;