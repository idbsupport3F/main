@isset($data->icon)
<div class="icon" {!! $data->color ? "style='color:" . $data->color . " !important;" . "width:" . $data->size . ";'" : null !!}>
@if(!empty($data->link))
<a href="$data->link" {!! isset($data->target) ? 'target="__blank"' : null !!}>
    @isset($data->icon)
        {!! $data->icon['source'] !!}
    @endisset
</a>
@else
    @isset($data->icon)
        {!! $data->icon['source'] !!}
    @endisset
@endisset
</div>
@endisset