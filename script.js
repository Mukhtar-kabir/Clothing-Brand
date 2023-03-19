'use strict';

let menuBtn = document.querySelector('#menu-btn');
let navLinks = document.querySelector('.nav__links');

menuBtn.onclick = () => {
  menuBtn.classList.toggle('fa-times');
  navLinks.classList.toggle('active');
};

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const btnHero = document.querySelector('.btn-hero');
const section1 = document.querySelector('#section--1');
btnHero.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

const testimonialContent = document.querySelector('.testimonial-content');
const testimonials = document.querySelectorAll('.testimonial');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let curSlide = 0;
let maxSlide = testimonials.length;

const goToSlide = function (testimonial) {
  testimonials.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - testimonial)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  // console.log(e);

  if (e.key === 'ArrowLeft') prevSlide(); // We can also use short circuiting
  e.key === 'ArrowRight' && nextSlide();
});

const dotsContainer = document.querySelector('.dots');
const createDots = function () {
  testimonials.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

// Activated the dots
const activateDot = function (testimonial) {
  /* First of all we gonna remove the active class form each slide then put it
  where ever we want it to be activated */
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  // The process
  document
    .querySelector(`.dots__dot[data-slide="${testimonial}"]`)
    .classList.add('dots__dot--active');
};

// When we reload the page none of the slide is active that why we call the func here.
activateDot(0);

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // console.log('DOT');
    const { testimonial } = e.target.dataset;
    goToSlide(testimonial);
    activateDot(testimonial);
  }
});

const btnUp = document.querySelector('.btn--up');
const header = document.querySelector('header');

btnUp.addEventListener('click', function (e) {
  e.preventDefault();

  window.scrollTo({
    left: header.left + window.pageXOffset,
    top: header.bottom + window.pageYOffset,
    behavior: 'smooth',
  });
});
