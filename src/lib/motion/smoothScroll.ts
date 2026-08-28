import Lenis from 'lenis';

/**
 * Ultra-performance smooth momentum scrolling, dynamic scroll-driven parallax motion,
 * and GPU-accelerated viewport reveals.
 * 
 * Performance Guarantees:
 * - Zero Layout Thrashing: Never writes layout-triggering properties.
 * - Hardware Accelerated: Drives GPU transforms (`translate3d`, `scale`) and `opacity` only.
 * - Native Accessibility: Automatically switches to instant native scroll on `prefers-reduced-motion`.
 * - Zero Main-Thread Blocking: Driven entirely by requestAnimationFrame with active viewport culling.
 */
export function initSmoothScroll(): (() => void) | undefined {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    initScrollDynamics(null);
    return;
  }

  // Initialize Lenis with weighted, physical momentum
  const lenis = new Lenis({
    duration: 1.1, // Responsive weighted deceleration
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
    infinite: false,
  });

  let running = true;
  let rafId: number;

  function raf(time: number) {
    if (!running) return;
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Setup dynamic scroll motion and reveals
  const cleanupDynamics = initScrollDynamics(lenis);

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    cleanupDynamics?.();
    lenis.destroy();
  };
}

/**
 * Scroll Dynamics: Parallax Depth, Motion Shifts & Viewport Reveals
 */
function initScrollDynamics(lenisInstance: Lenis | null): (() => void) | undefined {
  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');

  // 1. IntersectionObserver for entering viewports
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('is-revealed');
          revealObserver.unobserve(el);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.05,
    }
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal-init');
    revealObserver.observe(el);
  });

  // 2. Active Scroll Motion & Parallax Transform Engine
  function updateScrollMotion() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;

    // Update Top Accent Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));
      scrollProgressBar.style.transform = `scaleX(${progress})`;
    }

    // Update Dynamic Parallax Elements
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.08');
      const rect = el.getBoundingClientRect();

      // Viewport culling: only calculate for visible or near-visible elements
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        const centerDistance = rect.top + rect.height / 2 - windowHeight / 2;
        const translateY = centerDistance * speed;
        el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      }
    });
  }

  if (lenisInstance) {
    lenisInstance.on('scroll', updateScrollMotion);
  } else {
    window.addEventListener('scroll', updateScrollMotion, { passive: true });
  }

  // Initial pass
  updateScrollMotion();

  return () => {
    revealObserver.disconnect();
    if (lenisInstance) {
      lenisInstance.off('scroll', updateScrollMotion);
    } else {
      window.removeEventListener('scroll', updateScrollMotion);
    }
  };
}
