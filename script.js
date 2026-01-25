document.addEventListener('DOMContentLoaded', function () {

  let swiperThumb = null;
  let swiperMain = null;

  function initGallerySwipers() {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    // Destroy old instances safely (لو حصل resize)
    if (swiperMain) {
      swiperMain.destroy(true, true);
      swiperMain = null;
    }
    if (swiperThumb) {
      swiperThumb.destroy(true, true);
      swiperThumb = null;
    }

    // ✅ MOBILE: No thumbs + autoplay + swipe + pagination + pause on touch
    if (isMobile) {
      swiperMain = new Swiper(".mySwiperMain", {
        spaceBetween: 10,
        loop: true,
        grabCursor: true,
        allowTouchMove: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        },
        pagination: {
          el: ".mySwiperMain .swiper-pagination",
          clickable: true
        }
      });

      // Pause on touch, resume after interaction ends
      swiperMain.el.addEventListener('touchstart', () => {
        if (swiperMain && swiperMain.autoplay) swiperMain.autoplay.stop();
      }, { passive: true });

      swiperMain.el.addEventListener('touchend', () => {
        if (swiperMain && swiperMain.autoplay) swiperMain.autoplay.start();
      }, { passive: true });

      return;
    }

    // ✅ DESKTOP/TABLET: Thumbs + arrows + autoplay (زي ما انت عامل)
    swiperThumb = new Swiper(".mySwiperThumb", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: true
    });

    swiperMain = new Swiper(".mySwiperMain", {
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperThumb,
      },
      grabCursor: true,
      allowTouchMove: true
    });
  }

  // init first time
  initGallerySwipers();

  // re-init on resize (debounced) عشان لو حد لف الموبايل/غير حجم الشاشة
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initGallerySwipers, 200);
  });

  // سكرول ناعم عند الضغط على لينكات الناف بار (نفس كودك بدون تغيير)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return; // حماية لو الهاش مش موجود
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

});
