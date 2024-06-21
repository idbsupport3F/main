@isset($data->icon)
    {{-- Default Style --}}
    @if (isset($data->defaultIconStyle))
        <div class="{!! $data->defaultIconStyle ? 'icon-component' : null !!}" style="padding: {!! $data->paddingIconStyle['top'] . ' ' . $data->paddingIconStyle['right'] . ' ' . $data->paddingIconStyle['bottom'] . ' ' . $data->paddingIconStyle['left'] !!}">
            <div class="icon" style="{!! isset($data->color) ? 'color:' . $data->color . ' !important;' : null !!}{!! $data->size ? 'width:' . $data->size . ';height:' . $data->size . ";'" : null !!}">
                @isset($data->link)
                    <a href="{!! $data->link !!}" {!! isset($data->target) ? 'target="__blank"' : null !!}>
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
        </div>
    @endif

    {{-- No Default Style --}}
@else
    <div class="icon" style="{!! isset($data->color) ? 'color:' . $data->color . ' !important;' : null !!}{!! $data->size ? 'width:' . $data->size . ';height:' . $data->size . ";'" : null !!}">
        @isset($data->link)
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
