const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const fadeElements = document.querySelectorAll('.has-fade');
const topImage = document.querySelector('#top-image');

// slider configuration
const leftTrigger = document.querySelector('.leftTrigger');
const rightTrigger = document.querySelector('.rightTrigger');
const sliderPoints = document.querySelectorAll('.sliderPoint');
const allSlides = document.querySelector('.cards');
let currentSlide = 1;
let currentWidth = ['0%', '100%', '200%', '300%']
let slideClasses = ['slide1', 'slide2', 'slide3', 'slide4']
const animationTiming = {
    duration: 200,
    iteration: 1
};

// form
const submit = document.querySelector('#submit');

btnHamburger.addEventListener('click', () => {
    if (header.classList.contains('open')) {
        // Close Mobile Menu
        header.classList.remove('open');
        body.classList.remove('noScrollY');
        topImage.classList.remove('setBehind');
        fadeElements.forEach((element) => {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        })
    } else {
        // Open Mobile Menu
        header.classList.add('open');
        body.classList.add('noScrollY');
        topImage.classList.add('setBehind');
        fadeElements.forEach((element) => {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        })
    }
});

// slider functionality
leftTrigger.addEventListener('click', () => {
    if (currentSlide != 0) {
        currentSlide -= 1;
        sliderPoints.forEach((point) => {
            point.classList.remove('selected');
        });
        sliderPoints[currentSlide].classList.add('selected');
        allSlides.animate([
            { right: currentWidth[currentSlide + 1] },
            { right: currentWidth[currentSlide] }
        ], animationTiming);
        slideClasses.forEach((slide) => {
            allSlides.classList.remove(slide);
        });
        allSlides.classList.add(slideClasses[currentSlide]);
    }
});

rightTrigger.addEventListener('click', () => {
    if (currentSlide != 3) {
        currentSlide += 1;
        sliderPoints.forEach((point) => {
            point.classList.remove('selected');
        });
        sliderPoints[currentSlide].classList.add('selected');
        allSlides.animate([
            { right: currentWidth[currentSlide - 1] },
            { right: currentWidth[currentSlide] }
        ], animationTiming);
        slideClasses.forEach((slide) => {
            allSlides.classList.remove(slide);
        });
        allSlides.classList.add(slideClasses[currentSlide]);
    }
});

sliderPoints.forEach((slidePoint, index) => {
    slidePoint.addEventListener('click', () => {
        if ((index) !== currentSlide) {
            sliderPoints.forEach((point) => {
                point.classList.remove('selected');
            });
            sliderPoints[index].classList.add('selected');
            allSlides.animate([
                { right: currentWidth[currentSlide] },
                { right: currentWidth[index] }
            ], animationTiming);
            currentSlide = index;
            slideClasses.forEach((slide) => {
                allSlides.classList.remove(slide);
            });
            allSlides.classList.add(slideClasses[index]);
        }
    });
});

// form validation
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.querySelector('.input_field');
    const errorMessage = document.querySelector('.errorMessage');
    const inputValue = input.value;
    const mail_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (inputValue.match(mail_regex)) {
        input.classList.remove('error');
        errorMessage.classList.remove('show');
        input.value = "";
    } else {
        input.classList.add('error');
        errorMessage.classList.add('show');
        input.focus();
    }
});