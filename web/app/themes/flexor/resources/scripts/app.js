// Import Bootstrap
import {Tooltip} from 'bootstrap';
import domReady from '@roots/sage/client/dom-ready';
import GLightbox from 'glightbox';
import Swiper from 'swiper';
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css/bundle';

function ismatch(str) {
  var ret = null;
  if (String(str).match(new RegExp(/^data\-.*(_)/, 'g'))) {
    ret = str.split('_');
    return false;
  }
  return ret;
}

/**
 * Application entrypoint
 */
domReady(async () => {

  /**
   * Animation on scroll function and init
   */
    document.querySelectorAll('.animate-aos').forEach((val, i) => {
      var $this = val;
      var tab = $this.getAttribute('class').split(' ')
      var keep;
      Object.values(tab).forEach(function (item) {
        var ello = ismatch(item)
        if (ello !== null)
          $this.setAttribute(ello[0], ello[1]);
      });
    })

  /**
   * Bootstrap Tooltip
   * 
   * @param {string} [tooltip='[data-bs-toggle="tooltip"]'] 
   * @see https://getbootstrap.com/docs/5.0/components/tooltips/#example-enable-tooltips-everywhere
   */
  function bootstrapTooltip(tooltip = '[data-bs-toggle="tooltip"]'){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll(tooltip))

    return tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl)
    })
  }
  var tooltipList = bootstrapTooltip();

  /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  toggleScrolled();

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    preloader.remove();
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if(scrollTop){
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  toggleScrollTop()
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Swiper default init that has config in it
   * @param {Element} swiper 
   */
  function swiperDefaultInit(swiper){
    let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
    config['modules'] = [Navigation, Pagination, Autoplay]
    new Swiper(swiper, config);
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function (swiper) {
      if(swiper.querySelector('.swiper-config')) {
        swiperDefaultInit(swiper);
      }

      if(swiper.querySelector('.swiper-wrapper > .post')) {
        swiper.querySelectorAll('.post').forEach((swiperItem) => {
          swiperItem.classList.add('swiper-slide');
        })
        swiperDefaultInit(swiper);
      }
    });
  }

  /**
   * Toggle Display Inline Style
   * 
   * @param {Element} faqItem 
   */
  function toggleInnerContentDisplay(faqItem){
    if (faqItem.classList.contains('faq-active')) {
      Array.from(faqItem.querySelectorAll('.faq-content > *')).filter((item) => !!item.querySelector('p')).forEach((content) => {
        content.style.removeProperty('display');
      });
    } else {
      Array.from(faqItem.querySelectorAll('.faq-content > *')).filter((item) => !!item.querySelector('p')).forEach((content) => {
        content.style.setProperty("display", "none")
      });
    }
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item, .faq-toggle').forEach((faqItem) => {
    toggleInnerContentDisplay(faqItem);
    faqItem.addEventListener('click', () => {
      faqItem.classList.toggle('faq-active');
      toggleInnerContentDisplay(faqItem);
      // console.log(faqItem.querySelector('.faq-content').children)
      // faqItem.childNodes.classList.toggle('d-none');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  if (window.location.hash) {
    if (document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  navmenuScrollspy()
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Initialize Swiper
   */
  initSwiper();

  /**
   * DO NOT REMOVE BELOW CODE. IT MUST HAPPEN AT LAST LINE OF DOM READY EXECUTION!
   * Must Execute AOS at the final stage for this to happen due to onload, we are trying to adjust css into data-attribute such as `data-aos="fade-out"`.
   */
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
