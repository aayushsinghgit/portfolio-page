import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1.2,
    smoothTouch: true,
    touchMultiplier: 1.5,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  
  // Connect GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  
  return lenis;
};

export const initScrollAnimations = () => {
  gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};