<footer id="footer" class="footer" style="background:color-mix(in srgb,gray,transparent 90%);">

    <div class="container footer-top">
        <div class="row gy-4 align-items-center">
            <div class="{!! (strlen(wp_get_nav_menu_name('footer_navigation')) > 0) ? "col-lg-4 col-md-6"  : "col"!!} footer-about mt-0">
                @if (array_key_exists('logo', $siteLogo) &&
                        (get_theme_mod('hide_footer_site_name') || get_theme_mod('show_footer_logo_image')))
                    <a href="{{ home_url('/') }}" class="logo d-flex align-items-center">
                        <div class="d-flex flex-column">
                            @if (get_theme_mod('hide_footer_site_name'))
                                <span class="sitename mb-2">{!! $siteName !!}</span>
                            @endif
                            @if (get_theme_mod('show_footer_logo_image'))
                                <img src="{{ $siteLogo['logo'] }}" {!! array_key_exists('footer_logo_height', $siteLogo)
                                    ? 'height="' . $siteLogo['footer_logo_height'] . 'px"'
                                    : 'height="40px"' !!}
                                    alt="{{ get_bloginfo('name') }}">
                            @endif
                        </div>
                    </a>
                @endif
                <div class="footer-contact {!! get_theme_mod('show_footer_logo_image') ? 'pt-3' : '' !!}">
                    <p>{!! htmlspecialchars_decode(nl2br($address)) !!}</p>
                    @isset($phone)
                        <p class="mt-3"><strong>Nombor Telefon:</strong> <span>{!! $phone['phone'] !!}</span></p>
                        {{-- <p><strong>Fax:</strong> <span>{!! $phone['fax'] !!}</span></p> --}}
                    @endisset
                    @isset($contact)
                        <p><strong>Emel:</strong> <span>{!! $contact !!}</span></p>
                    @endisset
                </div>
                <div class="footer-utils pt-3">
                    <div class="row">
                        <div class="col-3">
                            <h4 class="footer-etc">Bilangan Pelawat</h4>
                            <div style="margin-top: -20px;"></div>
                            <a href='https://www.acadoo.de/fachrichtungen/ghostwriter-medizin/'>Med. Ghostwriting</a>
                            <script type='text/javascript'
                                src='https://www.freevisitorcounters.com/auth.php?id=b50988fd82099ee9719807c13b62d82c6f030fa4'></script>
                            <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1205921/t/5"></script>
                        </div>
                        <div class="col">
                            <h4 class="footer-etc">Tarikh Kemaskini</h4>
                            <div>
                                <p>{!! get_the_modified_date('') !!}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="social-links d-flex mt-4">
                    @isset($socialMedias)
                        @foreach ($socialMedias as $type => $link)
                            <a href="{{ $link }}" class="{{ $type }}"><i
                                    class="bi bi-{{ $type }}"></i></a>
                        @endforeach
                    @endisset
                </div>
            </div>

            @if (strlen(wp_get_nav_menu_name('footer_navigation')) > 0)
            <div class="col-lg-4 col-md-3 footer-links mt-0">
                    <h4>{!! wp_get_nav_menu_name('footer_navigation') !!}</h4>
                    {!! wp_nav_menu([
                        'theme_location' => 'footer_navigation',
                        'depth' => 1, // 1 = no dropdowns, 2 = with dropdowns.
                        'container' => false,
                        'fallback_cb' => false,
                        'items_wrap' => '<ul id="%1$s" class="%2$s menu-lain d-flex flex-wrap flex-column align-content-start">%3$s</ul>',
                    ]) !!}
            </div>
            @endif

            <div class="col-lg-4 col-md-12 footer-newsletter mt-0 text-center">
                <img class="mt-4" style="height:180px;" src="@asset('images/qr-code-location.png')" alt="{{ $siteName }} Location" />
                <img class="mt-4" style="height:50px;" src="@asset('images/msc.webp')" alt="MSC" />
            </div>
        </div>

        @include('partials.copyright')

        <div class="container copyright text-center mt-4">
            <p><span>Hak Milik Terpelihara</span> © {{ currentYear() }}<strong class="px-1">{!! get_bloginfo('name') !!}</strong></p>
            {{-- <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you've purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div> --}}
        </div>

</footer>
