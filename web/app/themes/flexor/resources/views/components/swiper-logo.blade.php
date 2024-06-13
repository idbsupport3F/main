<div class="container" data-aos="fade-up" data-aos-delay="100">
    <div class="swiper">
        <script type="application/json" class="swiper-config">
        {
            "loop": true,
            "speed": 600,
            "autoplay": {
                "delay": 5000
            },
            "slidesPerView": "auto",
            "pagination": {
                "el": ".swiper-{!! $title !!}",
                "type": "bullets",
                "clickable": true
            },
            "breakpoints": {
                "320": {
                    "slidesPerView": 2,
                    "spaceBetween": 40
                },
                "480": {
                    "slidesPerView": 3,
                    "spaceBetween": 60
                },
                "640": {
                    "slidesPerView": 4,
                    "spaceBetween": 80
                },
                "992": {
                    "slidesPerView": 6,
                    "spaceBetween": 120
                }
            }
        }
        </script>
        <div class="swiper-wrapper align-items-center">
        @foreach ($images as $key => $val)
            @isset($val)
            <div class="swiper-slide"><img src="{{ wp_get_attachment_image_src( $val, 'logo-client' )[0] }}" class="img-fluid" alt="{{ $alt[$key] }}"></div>
            @endisset
        @endforeach
        </div>
        <div class="swiper-{!! $title !!} swiper-pagination"></div>
    </div>
</div>