<section {!! get_block_wrapper_attributes([
    'class' => 'clients section'
]) !!}>
@isset ($data->images)
<x-swiper-logo :images="$data->images" :alt="$data->imagesAlt"/>
<div>
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</div>
@endisset
</section>