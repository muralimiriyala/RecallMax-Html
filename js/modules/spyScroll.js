const spyScroll = {
    $links: document.querySelectorAll('.scrolly-link'),
    $rows: document.querySelectorAll('.scrolly-row'),
    init(){
        const _ = this;
        let linksReveal = () => {
            const fromTop = Math.ceil(window.scrollY);   
            _.$links.forEach(($link)=>{
                const section = $link;
                console.log(section.offsetTop, "offsetTop")
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                  ) {
                    $link.classList.add("scrolly-spy");
                  } else {
                    $link.classList.remove("scrolly-spy");
                  }
            })
        }
        window.addEventListener('scroll', linksReveal);






        const  secReveals = () =>{
            var reveals = _.$rows;
          
            for (var i = 0; i < reveals.length; i++) {
              var windowHeight = window.innerHeight;
              var elementTop = reveals[i].getBoundingClientRect().top;
              var elementVisible = 150;
          
              if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("scroll-sticky");
              } else {
                reveals[i].classList.remove("scroll-sticky");
              }
            }
          }
          
          window.addEventListener("scroll", secReveals);
    }
}
export default spyScroll;