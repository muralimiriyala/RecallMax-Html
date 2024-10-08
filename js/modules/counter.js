import {CountUp} from 'countup.js'
const counter = {
    $ele: document.querySelectorAll('[data-count-to]'),
    init(){
     
        const _ = this;
        _.$ele.forEach($el=>{
           
            $el.counter = new CountUp($el, $el.getAttribute('data-count-to'), {
                startVal: Number($($el).html()),
                duration: 3.5
            })
        })
    }
}
export default counter;