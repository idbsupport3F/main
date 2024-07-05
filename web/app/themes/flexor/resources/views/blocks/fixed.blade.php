<div {!! get_block_wrapper_attributes([
        'class' => 'fixed-mobile-container position-fixed d-block d-lg-none ' . $data->mobilePosition
    ]) !!} style="{!! isset($data->border) ? "border:" . join(' ', $data->border) . ";" : null !!}{!! isset($data->borderRadius) ? "border-top-left-radius:" . $data->borderRadius['left'] . ";" . "border-top-right-radius:" . $data->borderRadius['top'] . ";" . "border-bottom-right-radius:" . $data->borderRadius['right'] . ";" . "border-bottom-left-radius:" . $data->borderRadius['bottom'] . ";" : null !!}{!! isset($data->backgroundColor) ? 'background-color:' . $data->backgroundColor . ';' : 'background-color:#ff5921;' !!}{!! isset($data->size) ? 'width:' . $data->size . ';height:' . $data->size . ";'" : null !!}padding:{!! $data->paddingIcon['top'] .
            ' ' .
            $data->paddingIcon['right'] .
            ' ' .
            $data->paddingIcon['bottom'] .
            ' ' .
            $data->paddingIcon['left'] !!}">
@isset($data->icon)
    {!! $data->icon['source'] !!}
@endisset
</div>
<div {!! get_block_wrapper_attributes([
        'class' => 'fixed-component-container fixed-bottom d-none d-md-none d-lg-block'
    ]) !!}>
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</div>