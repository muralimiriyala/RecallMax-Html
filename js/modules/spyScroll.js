const spyScroll = {
    $header: document.querySelector('.site-header'),
    $section: document.querySelector('.scrolly-section'),
    $links: document.querySelectorAll('.scrolly-link'),
    $rows: document.querySelectorAll('.scrolly-row'),
    init(){
        const _ = this;
        let linksReveal = () => {
            const fromTop = Math.ceil(window.scrollY);   
            _.$links.forEach(($link)=>{
                if (
                    $link.offsetTop <= fromTop &&
                    $link.offsetTop + $link.offsetHeight > fromTop
                  ) {
                    $link.classList.add("scrolly-spy");
                  } else {
                    $link.classList.remove("scrolly-spy");
                  }
            })
        }
        window.addEventListener('scroll', linksReveal);

        const secReveals = () => {
            var reveals = _.$rows;
            reveals.forEach((ele, i)=>{
              var windowHeight = window.innerHeight;
              var elementTop = reveals[i].getBoundingClientRect().top;
              var elementVisible = 150;
          
              if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("scroll-sticky");
              } else {
                reveals[i].classList.remove("scroll-sticky");
              }
            });
          }
          window.addEventListener("scroll", secReveals);



        const stickyReveals = () => {
          if(!_.$section) return;
            const stickyTop = _.$section.offsetTop - _.$header.offsetHeight;
            const scrollTop = Math.ceil(window.scrollY);
            const stickyRadius = Number(_.$section.getAttribute('data-radius'));
            const stickyTransition = Number(_.$section.getAttribute('data-speed'));
            console.log(stickyRadius)
            if(scrollTop>=stickyTop){
                _.$section.style.borderRadius = `0 0 ${stickyRadius}px ${stickyRadius}px`;
                _.$section.style.transition = '';
            }
            else{
                _.$section.style.borderRadius = `${stickyRadius}px`;
                _.$section.style.transition = `all ${stickyTransition}ms ease`;
            }
        };
        window.addEventListener("scroll", stickyReveals);

    }
}
export default spyScroll;