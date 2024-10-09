const progress = {
    $circlepath: document.querySelectorAll('[data-count-path]'),
    play(){
        const _ = this;
        _.$circlepath.forEach($path=>{
            let $dash = $path.getAttribute('stroke-dasharray');
            let $pathvalue = $path.getAttribute('data-count-path');
            let $duration = Number($path.getAttribute('data-duration') / 1000);
            $dash = parseInt($dash)
            $pathvalue = parseInt($pathvalue)
            const $progress = $dash - ($dash * $pathvalue / 100);
            $path.style.strokeDashoffset = $progress;
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
export default progress;