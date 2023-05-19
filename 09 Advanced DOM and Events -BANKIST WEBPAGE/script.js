'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrolling = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

///////////////////////////////////////
//! Modal window ->
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//!Scrolling ->
//! MODERN WAY DOING THIS BUT THIS WORK ONLY ON MODERN BROWSERS..
btnScrolling.addEventListener('click', function (e) {
  //@  This method even dont need any coordinated of the section1..
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
//! Implementing Event Deligation
// @ Without Using Event deligation - smooth scrolling
//@  This method is not best because we are here creating same callback function for each nav links which will make impact on the performance.
//# So its better to use "EVENT DELIGATION".

// navLink.forEach(link => {
//   link.addEventListener('click', function (e) {
//     //@ Preventing default behaviour of href attribute to navigate to the assign section in HTML
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     //@  Here id is the link where the nav link has to be navigate when clicked.
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//@ Using Event DELIGATION - smooth scrolling

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//! BUILDING OPERATION SECTION >>>

//! Using event deligation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //! Removing active classes from all tabs and content areas.
  tabs.forEach(tb => tb.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));

  //! Guard Clause
  if (!clicked) return;
  //@  This will protect the below codes to be executed when the value of clicked will be null by returning the callback function.
  clicked.classList.add('operations__tab--active');
  //! Activating content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//! MENU FADE OUT EFFECT >>>

//@  mouseenter(opposite - mouseleave) event dont bubble up...but mouseover(opposite - mouseout) do.

const handlerFn = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

//# Method 1 - Using Second parameter opacity.
// nav.addEventListener('mouseover', function (e) {
//   handlerFn(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handlerFn(e, 1);
// });

//# Method 2 - Using .bind() method to set "this" keyword to 0.5 and 1 in respective eventhandlers. While using this method we can omit writing opacity parameter in handlerFn.
nav.addEventListener('mouseover', handlerFn.bind(0.5));
nav.addEventListener('mouseout', handlerFn.bind(1));

//! STICKY NAVIGATION >>>

//! Method 1 - This method is not efficient so we must avoid this..
// const initialCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//! Method 2 - Intersection observer API..

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px', //@  here we can only use px unit. 90 is the height of nav bar.
  //@  negative value add margin outside the target.
  //@ Specifying a hard coded value is not good because in later point due to responsiveness of the website this height will get changed.
  //@ OR
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//! Reveal sections

const sections = document.querySelectorAll('.section');

const revealSectionFn = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //! We want to observe the sections only once when the page gets loaded up..So to unobserve this we need to write following codes--- here "observer parameter is the whole sectionObserver"
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSectionFn, {
  root: null,
  threshold: 0.15,
});

sections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

//! Lazy Loading Images>>>
//@  In lazy loading we first load a very low resoultion copy of original high quality image then as the page gets fully loaded the js replace those images with original ones in the background when a certain area arrived while scrolling.

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImgFn = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  //@ If we directly remove the lazy-img class because of which images are blurred then as soon as the intersection happened "scr" got replaced and due to slow loading of original images user will able to see the low res.of images....
  //@  So we have to remove the class(lazy-img) once the original image gets fully loaded behind the scene by the browser.
  //! Event "load"
  //@ As the original img gets loaded completely js emits an event called "load".. So we can listen for this event to perform a task. Eg-
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  //@ Unobserving the imgObserver = parameter "observer"
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImgFn, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//!Slider Component>>>
const sliderComponent = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlides = slides.length;

  //! Functions >>>>>

  //! Creating dots for slides
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}" ></button>`
      );
    });
  };

  //! Activate Dots
  const activateDots = function (currentSlideNumber) {
    //# Removing the active class from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //# Adding the active class to the currently active dot
    document
      .querySelector(`.dots__dot[data-slide="${currentSlideNumber}"]`)
      .classList.add('dots__dot--active');
  };
  //@  Change Slide function
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  //! Initial conditons -TEMPORARY
  // const slider = document.querySelector('.slider');
  // slider.style.transform = `scale(0.3) translateX(-1200px)`;
  // slider.style.overflow = `visible`;

  //! INITILIZATION Function
  const int = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  int();

  //! EVENT LISTENERS >>>>>>>

  //! Slide - Forward
  btnRight.addEventListener('click', nextSlide);
  //! Slide - Backward
  btnLeft.addEventListener('click', previousSlide);

  //! Key Event for prev and next slide functionality
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  //! Next and Previous Slide using Dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
sliderComponent();

//~ LECTURES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*
//!Selecting Elements
//@  The whole html file can be selected like this..
console.log(document.documentElement);
//@  Selecting head
console.log(document.head);
//@  Selecting body
console.log(document.body);
//@  Other ways of selecting elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); //# Using this we will get a node list which is not dynamic.
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); //# Using this method we will get a HTML Collection which is  dyanamic in nature so with change in elements HTML Collection will aslo get changed.
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

//! Creating and inserting Elements

//# Syntax -- document.querySelector('.section__header').insertAdjacentHTML(position,text);
//@  "beforebegin" Before the element. Only valid if the element is in the DOM tree and has a parent element.
//@  "afterbegin" Just inside the element, before its first child.
//@  "beforeend" Just inside the element, after its last child.
//@ "afterend" After the element. Only valid if the element is in the DOM tree and has a parent element.
//@  text The string to be parsed as HTML or XML and inserted into the tree.

//@This created element is not In the DOM rightnow.
const message = document.createElement('div');
1;
message.classList.add('cookie-message');
//Using .textContent we can add some text but we cant add html element like .innerHTML.
// message.textContent=`We use cookies for improved functionality and analytics.`
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
//@ Adding this div to the HTML DOM
// header.insertAdjacentHTML('beforebegin', message);
//@These two can move the element in the parent but cant add it into more than one place..
// header.prepend(message); //@  first child
// header.append(message); //@  last child
//@  adding the element in more than one place.
// header.append(message.cloneNode(true));

//# adding element before and after any element...
//@ It aslo move the element
//@ here message is sibling of header.
header.before(message);
header.after(message);

//! DELETING AN ELEMENT..
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //@  New way of deleting
    message.remove();
    //@  Old method of deleting - back in days we could remove child elements only.
    // message.parentElement.removeChild(message);
  });

//!STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//@  We cant read property of any element which are set using external css like this ..Using this we can only read properties which are set inline.
console.log(message.style.color); //@  This is not gonna work
//@  Below two are inline properties so we can read them like this.
console.log(message.style.width);
console.log(message.style.backgroundColor);

//@  To read properties of external or internal css we need to use getComputedStyle() function.
//@ This will return a string...
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).fontSize);

//@  Setting property using getComputedStyle()
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

//! ATTRIBUTES
const logo = document.querySelector('.nav__logo');
//@  We can only ready some pre defined standard properties with this method.
console.log(logo.alt);
console.log(logo.className);
console.log(logo.designer); //@  This is not a predefined class so its value we cant get like this. Below is the correct way of getting the of class which are not standard classes.
console.log(logo.getAttribute('designer'));
logo.alt = ' Beautiful and minimalist logo';
console.log(logo.alt);

//# setting attribute
logo.setAttribute('company', 'Neostack');
console.log(logo.getAttribute('company'));

//@ This will return absolute link - Complete URL
console.log(logo.src);
//@ This will return relative string
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));

//! Data attribute
//@Starts with Data and then whatever we want.
console.log(logo.dataset.versionNumber);

//!Clases
// localStorage.classList.add('sample class name');
// localStorage.classList.remove('sample class name');
// localStorage.classList.toggle('sample class name');
// localStorage.classList.contains('sample class name');

//@  Like this aslo we can add className but we must not use this because this we can only set one class and other classes will get replaced by this.
// logo.className = 'DemoClass';
*/
/*
//! SMOOTH SCROLLING...

//! getBoundingClientRect() is use to get the coordinate of an element ..Here the coordinate are relative to the current viewport.

//! window.pageXOffset and window.pageYOffset both are the values which are relative to the whole document..NOT TO THE CURRENT VIEWPORT.

btnScrolling.addEventListener('click', function (e) {
  // console.log(btnScrolling.getBoundingClientRect());
  //@ BOTH ARE SAME
  // console.log('COORDINATE OF BTNSCROLL', e.target.getBoundingClientRect());

  // const section1Cord = section1.getBoundingClientRect();
  // console.log('COORDINATE OF THE SECTION', section1Cord);

  // console.log('X AND Y OFFSET', window.pageXOffset, window.pageYOffset);
  //! Getting coordinates of the viewport.
  // console.log(
  //   'Height/Width of Viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //!Scrolling
  //@  Using only left and top position of the section will not work because both are relative to the viewport so we need to add the current scroll position to them.
  // window.scrollTo(
  //   section1Cord.left + window.pageXOffset,
  //   section1Cord.top + window.pageYOffset
  // );
  //! For smooth scrolling we need to pass an object into .scrollTo() function like this...
  // window.scrollTo({
  //   left: section1Cord.left + window.pageXOffset,
  //   top: section1Cord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //! MODERN WAY DOING THIS BUT THIS WORK ONLY ON MODERN BROWSERS..
  //@  This method even dont need any coordinated of the section1..
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//! TYPES OF EVENT AND EVENT HANDLERS

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! Your are reading the heading :D');
  //@ Removing eventListener..
  // h1.removeEventListener('mouseenter', alertH1); //@  We can aslo put this outside even into a setTimeout function.
};

//@ 1st way of attaching event listener..
// h1.addEventListener('mouseenter', alertH1);

//@ 2nd way --OLD WAYS
//@ every event has their own on version which we can attach like this--
// h1.onmouseenter = function (e) {
//   alert(`onmouseenter: Great! You are reading the heaading :D`);
// };

//@ above these two method the best one is the first.. because with that can attach multiple event handlers into a single event.we can aslo remove eventlistener in the first method..

//@ Removing eventListener..
// h1.removeEventListener('mouseenter', alertH1);
//OR
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

//@ 3rd way --inline js
//@  This method we must not use anyway..

//@  <h1 onlick="alert('addEventListener: Great! Your are reading the heading :D')" >
*/
/*
//! EVENT PROPAGATION - CAPTURING AND BUBBLING PRACTICE
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target, e.currentTarget);
  //! e.target and e.currentTarget ...
  //@ e.target shows the element in which event has happened or from where it is originated.
  //@ e.currentTarget shows on which the event handler is attached.
  //! Stopping Propagation
  //@ Stopping propagation is not a good practice but sometimes we need this when we have multiple event listener in our project.
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
    //! For capturing an element in the capturing phase we need to specify the third parameter of addEventListener as "true".
    //@ Since NAV is being captured during capturing phase so it will not get bubble up duing bubbling phase. Also the callback function of NAV will be executed first.
  },
  true
);
*/
/*
//! DOM Traversing...
const h1 = document.querySelector('h1');

//@ Going downwards - Child elements..
//@  querySelectorAll provides a nodeList which contains elements.. But on the other hand childNodes provides all the elements including text ,comments etc. Nodes- can be anything text , comments , elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); //@  It doesnot included comments and texts and this only work for direct Child.

h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'orangered';
//@ Going Upwards- Parent elements..
//@  directParent
console.log(h1.parentNode);
console.log(h1.parentElement);
//@  Not a direct parent
//# with closest we can select any parent in the DOM tree.
// console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--color-secondary)';
//@  Selecting itself
h1.closest('h1').style.background = 'var(--color-primary)';
//@ Going sideways - siblings
//@  This way we can select previous and next sibling element only
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//Some other not so useful methods..
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
//@  Selecting all siblings
console.log(h1.parentElement.children);

//! Looping over HTMLCollection
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) h1.style.color = 'pink';
});
*/
/*
//! INTERSECTION OBSERVER API >>>>

const obsCallback = function (entries, observer) {
  // console.log(entries); //@  This is an array containig the details of intersection of target element and the ancestor element or with a top-level document's viewport.

  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting === true) {
    console.log(entry.isIntersecting);
  }

  // entries.forEach(entry => console.log(entry));
};
//@ root: This is the element on which intersection will be observed ... if we set it null then the intersection of target element will be observed on the viewport.

//@ threshold : this is the value at which the observation is to be made ...

//@ OR whenever the threshold value is reached  this API will call the callback function..
//@ .observe() is use to specify the target element.

//@ we specify multiple threshold values using an array ..and for each threshold value an array element will be created. thats why we need forEach method in the obsCallback function..but for one threshold we can omit looping.

const obsoptions = {
  root: null,
  // threshold: 0.1,
  threshold: [0, 0.1],
  // $ rootMargin: this property add margin within the target element...but we can set margin outside by simply specifying negative value here.
};
const observer = new IntersectionObserver(obsCallback, obsoptions);
observer.observe(section1);
*/

//!  Lifecycle of DOM Events..

//@ DOMContentLoaded Event - When the browser finishes sucessfully downloading HTML and Javascript file it start to parsed the HTML codes and then it create DOM Tree. and then it produces a event called DOMContentLoaded.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(`HTML parsed and DOM tree built!`, e);
});

//@ load - When the whole page and its all resources like images,videos ,icons gets fully loaded up browser fires an event called 'load' .
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//@ beforeunload - This event gets fired up when a user is about to leave the page by clicking on refresh or close button.
//@ We generally use this method to display some warning if a user have some unsaved data on the  page.

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); //@  In some browser we need to block default behaviour otherwise this event cant work.

//   console.log(e);
//   e.returnValue = ''; //@ This need to be mention to display warning ..the warning cant be changed.
//   //@  It will start to work once the user start to use the functionality of the web page ..
// });
