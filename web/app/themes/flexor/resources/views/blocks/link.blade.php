<a {!! isset($data->link) ? "href='" . $data->link . "'" : null !!} {!! get_block_wrapper_attributes([
    'class' => 'link-container-component'
]) !!} {!! isset($data->newTab) ? 'target="_blank"' : null !!} {!! isset($data->text) ? 'data-bs-toggle="tooltip" data-bs-placement="top" title="' . $data->text . '"' : null !!}>
    {!! $content ?? 'Please feed me InnerBlocks.' !!}
</a>