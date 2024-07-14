{{-- {{ dd($data) }} --}}
@php
    $positionMobile = '';
    switch ($data->mobilePosition) {
        case 'center':
            $positionMobile = 'top-50 start-50 translate-middle';
            break;

        case 'top center':
            $positionMobile = 'top-0 start-50 translate-middle-x';
            break;

        case 'top left':
            $positionMobile = 'top-0 start-0';
            break;

        case 'top right':
            $positionMobile = 'top-0 end-0';
            break;

        case 'center left':
            $positionMobile = 'top-50 start-0 translate-middle-y';
            break;

        case 'center center':
            $positionMobile = 'top-50 start-50 translate-middle';
            break;

        case 'center right':
            $positionMobile = 'top-50 end-0 translate-middle-y';
            break;

        case 'bottom left':
            $positionMobile = 'bottom-0 start-0';
            break;

        case 'bottom center':
            $positionMobile = 'bottom-0 start-50 translate-middle-x';
            break;

        case 'bottom right':
            $positionMobile = 'bottom-0 end-0';
            break;
    }
@endphp
<button class="{!! 'btn fixed-mobile-container position-fixed d-block d-lg-none ' . $positionMobile !!}" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
    aria-controls="offcanvasBottom" style="{!! isset($data->border) ? 'border:' . join(' ', $data->border) . ';' : null !!}{!! isset($data->borderRadius)
        ? 'border-top-left-radius:' .
            $data->borderRadius['left'] .
            ';' .
            'border-top-right-radius:' .
            $data->borderRadius['top'] .
            ';' .
            'border-bottom-right-radius:' .
            $data->borderRadius['right'] .
            ';' .
            'border-bottom-left-radius:' .
            $data->borderRadius['bottom'] .
            ';'
        : null !!}{!! isset($data->backgroundIconColor)
        ? 'background-color:' . $data->backgroundIconColor . ';'
        : 'background-color:#ff5921;' !!}padding:{!! $data->paddingIcon['top'] .
        ' ' .
        $data->paddingIcon['right'] .
        ' ' .
        $data->paddingIcon['bottom'] .
        ' ' .
        $data->paddingIcon['left'] !!}">
    <div style="{!! isset($data->iconColor)
        ? 'color:' . $data->iconColor . ';'
        : 'background-color:#ff5921;' !!}{!! isset($data->size) ? 'width:' . $data->size . ';height:' . $data->size . ';' : null !!}">
    @isset($data->icon)
        {!! $data->icon['source'] !!}
    @endisset
    </div>
</button>
<div class="offcanvas offcanvas-bottom h-auto" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">{!! isset($data->title) ? $data->title : '' !!}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div id="fixed-container" class="offcanvas-body small">
        {!! $content ?? 'Please feed me InnerBlocks.' !!}
    </div>
</div>
<div {!! get_block_wrapper_attributes([
    'class' => 'fixed-component-container fixed-bottom d-none d-md-none d-lg-block'
]) !!}>
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</div>