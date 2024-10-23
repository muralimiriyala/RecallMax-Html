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
            const stickyTop = _.$section.offsetTop;
            const scrollTop = Math.ceil(window.scrollY);
            if(scrollTop>=stickyTop){
                console.log(stickyTop, scrollTop)
                _.$section.style.borderRadius = '0';
            }
            else{
                _.$section.style.borderRadius = '0';
            }
        };
        window.addEventListener("scroll", stickyReveals);

    }
}
export default spyScroll;