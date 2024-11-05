let share = {
    $hdr: document.querySelector('header.site-header'),
    $ele: document.querySelector('.sticky-share'),
    $aside: document.querySelector('aside.resource-aside'),
    init() {
        const _ = this;
        if(!_.$aside) return;
        // Debounce function to optimize scroll event
        const debounce = (fn, delay) => {
            let timer;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(context, args), delay);
            };
        };
        // Scroll handler
        let scroll = () => {
            if(!_.$hdr || !_.$aside || !_.$ele) return;
            const $barHeight = _.$hdr.clientHeight + 100;
            const $stickHeight = _.$aside.clientHeight;
            const $tipHeight = $barHeight + $stickHeight;
            const $eleHeight = _.$ele.clientHeight - $tipHeight;
            const $scroll = Math.floor(window.scrollY);
            $scroll>$eleHeight ? _.$aside.classList.add('opa') : _.$aside.classList.remove('opa')     
        };
        scroll();
        window.addEventListener('load', scroll);
        window.addEventListener('scroll', debounce(scroll, 10));
        window.addEventListener('resize', debounce(scroll, 50));
    }
}
export default share;
