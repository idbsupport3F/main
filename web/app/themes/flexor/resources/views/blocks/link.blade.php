<a {!! isset($data->link) ? "href='" . $data->link . "'" : null !!} {!! get_block_wrapper_attributes([
    'class' => 'link-container-component'
]) !!} {!! isset($data->newTab) ? 'target="_blank"' : null !!} {!! isset($data->text) ? 'data-bs-toggle="tooltip" data-bs-placement="top" title="' . $data->text . '"' : null !!} style="{!! isset($data->border) ? "border:" . join(' ', $data->border) . ";" : null !!}{!! isset($data->borderRadius) ? "border-top-left-radius:" . $data->borderRadius['left'] . ";" . "border-top-right-radius:" . $data->borderRadius['top'] . ";" . "border-bottom-right-radius:" . $data->borderRadius['right'] . ";" . "border-bottom-left-radius:" . $data->borderRadius['bottom'] . ";" : null !!}">
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</a>