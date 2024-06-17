<div class="container {!! $classNames !!}">
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
                  }
                }
              </script>
        <div class="swiper-wrapper">
            @foreach ($clients as $key => $val)
                @isset($val)
                    <div class="swiper-slide">
                        <div class="testimonial-item">
                            @isset($val['image'])
                            <img src="{{ wp_get_attachment_image_src( $val['image'], 'testimonial' )[0] }}" class="testimonial-img" alt="{{ $val['alt'] }}">
                            @endisset
                            @isset($val['name'])
                                <h3 {!! isset($styles['nameColor']) ? 'style="color:' . $styles['nameColor'] . ' !important;"'  : null!!}>{{ $val['name'] }}</h3>
                            @endisset
                            @isset($val['role'])
                                <h4 {!! isset($styles['roleColor']) ? 'style="color:' . $styles['roleColor'] . ' !important;"' : null !!}>{{ $val['role'] }}</h4>
                            @endisset
                            @isset($val['star'])
                                <div class="stars">
                                    @foreach (range(0, $val['star']) as $stars)
                                        <i {!! isset($styles['starColor']) ? 'style="color:' . $styles['starColor'] . ' !important;"'  : null!!} class="bi bi-star-fill"></i>
                                    @endforeach
                                </div>
                            @endisset
                            @isset($val['description'])
                                <p>
                                    <i {!! isset($styles['quoteColor']) ? 'style="color:' . $styles['quoteColor'] . ' !important;"' : null!!} class="bi bi-quote quote-icon-left"></i>
                                    <span {!! isset($styles['descriptionColor']) ? 'style="color:' . $styles['descriptionColor'] . ' !important;"' : null!!}>{{ $val['description'] }}</span>
                                    <i {!! isset($styles['quoteColor']) ? 'style="color:' . $styles['quoteColor'] . ' !important;"' : null!!} class="bi bi-quote quote-icon-right"></i>
                                </p>
                            @endisset
                        </div>
                    </div>
                @endisset
            @endforeach
        </div>
        <div class="swiper-pagination swiper-{!! $title !!}"></div>
    </div>
</div>
