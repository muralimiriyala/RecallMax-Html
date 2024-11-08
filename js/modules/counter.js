import {CountUp} from 'countup.js'
const counter = {
    $ele: document.querySelectorAll('[data-count-to]'),
    init(){
        const _ = this;
        _.$ele.forEach($el=>{
            console.log($el)
                $el.counter = new CountUp($el, $el.getAttribute('data-count-to'), {
                    startVal: Number($($el).html()) > 1 ? Number($($el).html()) : '',
                    duration: Number($el.getAttribute('data-duration') / 1000 * 1),
                })
            
        })
    }
}
export default counter;