document.addEventListener('DOMContentLoaded', function () {
    
    // تهيئة صور الثامنيلز (المصغرة)
    var swiperThumb = new Swiper(".mySwiperThumb", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });

    // تهيئة الجاليري الأساسي
    var swiperMain = new Swiper(".mySwiperMain", {
        spaceBetween: 10,
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
    });

    // سكرول ناعم عند الضغط على لينكات الناف بار
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});