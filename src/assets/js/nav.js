// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}


// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
    const scroll = document.documentElement.scrollTop;
    if(scroll >= 100){
document.querySelector('body').classList.add('scroll')
    } else {
    document.querySelector('body').classList.remove('scroll')
    }
});

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
    }
                            


    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('#reviews-608 .reviews-carousel');
        // let isDragging = false;
        // let startX;
        // let scrollLeft;
      
        // // Start dragging (for both mouse and touch)
        // const startDrag = (clientX) => {
        //   isDragging = true;
        //   startX = clientX;
        //   scrollLeft = carousel.scrollLeft;
        // };
      
        // // Handle dragging movement
        // const duringDrag = (clientX) => {
        //   if (!isDragging) return;
        //   // Adjust multiplier (1.2 provides a responsive feel)
        //   const walk = (clientX - startX) * 1.2;
        //   carousel.scrollLeft = scrollLeft - walk;
        // };
      
        // // Mouse events
        // carousel.addEventListener('mousedown', (e) => {
        //   startDrag(e.pageX);
        //   carousel.classList.add('active');
        // });
        // carousel.addEventListener('mousemove', (e) => {
        //   duringDrag(e.pageX);
        // });
        // carousel.addEventListener('mouseup', () => {
        //   isDragging = false;
        //   carousel.classList.remove('active');
        // });
        // carousel.addEventListener('mouseleave', () => {
        //   isDragging = false;
        //   carousel.classList.remove('active');
        // });
      
        // // Touch events for mobile devices
        // carousel.addEventListener('touchstart', (e) => {
        //   startDrag(e.touches[0].pageX);
        // });
        // carousel.addEventListener('touchmove', (e) => {
        //   duringDrag(e.touches[0].pageX);
        // });
        // carousel.addEventListener('touchend', () => {
        //   isDragging = false;
        // });
      
        // Arrow navigation: scroll by one card (li) at a time
        const leftArrow = document.querySelector('#reviews-608 .carousel-arrow.left');
        const rightArrow = document.querySelector('#reviews-608 .carousel-arrow.right');
      
        const getCardWidth = () => {
          const card = document.querySelector('#reviews-608 .cs-item');
          if (!card) return 0;
          // Include the right margin in the scroll width calculation
          const style = window.getComputedStyle(card);
          const marginRight = parseFloat(style.marginRight);
          return card.offsetWidth + marginRight;
        };
      
        leftArrow.addEventListener('click', () => {
          carousel.scrollBy({
            left: -getCardWidth(),
            behavior: 'smooth'
          });
        });
      
        rightArrow.addEventListener('click', () => {
          carousel.scrollBy({
            left: getCardWidth(),
            behavior: 'smooth'
          });
        });
      });
      