@isset ($data->images)
<x-swiper-logo :images="$data->images"/>
<div>
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</div>
@endisset