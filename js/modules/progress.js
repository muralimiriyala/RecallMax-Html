const progress = {
    $circlepath: document.querySelectorAll('[data-count-path]'),
    play(){
        const _ = this;
        _.$circlepath.forEach($path=>{
            let $dash = $path.getAttribute('stroke-dasharray');
            let $pathvalue = $path.getAttribute('data-count-path');
            $dash = parseInt($dash)
            $pathvalue = parseInt($pathvalue)
            const $progress = $dash - ($dash * $pathvalue / 100);
            $path.style.strokeDashoffset = $progress;
        })
    },
    reset(){
        const _ = this;
        _.$circlepath.forEach($path=>{
            let $dash = $path.getAttribute('stroke-dasharray');
            $path.style.strokeDashoffset = Number($dash);
        });
    }
}
export default progress;