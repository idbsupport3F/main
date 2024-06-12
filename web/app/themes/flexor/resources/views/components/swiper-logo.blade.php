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
        "el": ".{!! $title !!}",
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
    @foreach ($images as $val)
        <div class="swiper-slide"><img src="{{ $val['id'] }}" class="img-fluid" alt="{{ $val['alt'] }}"></div>
    </div>
    @endforeach
    <div class="{!! $title !!}"></div>
</div>
</div>