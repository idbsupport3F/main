{{-- <footer class="content-info">
  @php(dynamic_sidebar('sidebar-footer'))
</footer> --}}
<footer id="footer" class="footer">

    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="{{ home_url('/') }}" class="logo d-flex align-items-center">
            {{-- Uncomment the line below if you also wish to use an image logo --}}
            @if (get_theme_mod('site_logo'))
            <img src="{!! $footer_image !!}" alt="{{ get_bloginfo('name') }}">
            @else
            <span class="sitename">{!! $title !!}</span>
            @endif
          </a>
          <div class="footer-contact pt-3">
            {{ $address }}
            @isset($phone)<p class="mt-3"><strong>Phone:</strong> <span>{!! $phone !!}</span></p>@endisset
            @isset($contact)<p><strong>Email:</strong> <span>{!! $contact !!}</span></p>@endisset
          </div>
          <div class="social-links d-flex mt-4">
            @isset($social_medias)
            @foreach ($social_medias as $type => $link)
                <a href="{{ $link }}" class="{{ $type }}"><i class="bi bi-{{$type}}"></i></a>
            @endforeach
            @endisset
          </div>
        </div>

        <div class="col-lg-4 col-md-3 footer-links">
          <h4>{!! wp_get_nav_menu_name('footer_navigation') !!}</h4>
          {!! wp_nav_menu( array(
              'theme_location'  => 'footer_navigation',
              'depth'           => get_theme_mod('menu_depth') ? esc_attr(get_theme_mod('menu_depth')) : 1, // 1 = no dropdowns, 2 = with dropdowns.
              'container'       => false
          ) ) !!}
        </div>

        {{-- <div class="col-lg-2 col-md-3 footer-links">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">Web Design</a></li>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Product Management</a></li>
            <li><a href="#">Marketing</a></li>
            <li><a href="#">Graphic Design</a></li>
          </ul>
        </div> --}}

        <div class="col-lg-2 col-md-12 footer-newsletter">
          <h4>Visitor Counter</h4>
           <a href='https://www.free-counters.org/'>free-counters.org</a> <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=4c2a4bcfc73db3af5095fd61fd04a09c7f01bb34'></script>
<script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1196310/t/1"></script>
        </div>

      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">{!! get_bloginfo( 'name' ) !!}</strong> <span>All Rights Reserved</span></p>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you've purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
        Designed by <a href="https://github.com/ammein">Amin Shazrin</a>
      </div>
    </div>

  </footer>