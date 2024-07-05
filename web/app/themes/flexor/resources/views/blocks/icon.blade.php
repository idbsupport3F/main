@isset($data->icon)
    {{-- Default Style --}}
    @if (isset($data->defaultIconStyle) && $data->defaultIconStyle)
        @php
            $className = '';
            if (isset($data->hover) && $data->hover === 'hover') {
                $className = 'icon-component';
            } else {
                $className = 'icon-component-no-hover';
            }
        @endphp
        <div {!! get_block_wrapper_attributes([
        'class' => $className
    ]) !!} style="padding: {!! $data->paddingIconStyle['top'] .
            ' ' .
            $data->paddingIconStyle['right'] .
            ' ' .
            $data->paddingIconStyle['bottom'] .
            ' ' .
            $data->paddingIconStyle['left'] !!}">
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

        {{-- No Default Style --}}
    @else
        <div {!! get_block_wrapper_attributes([
        'class' => 'icon'
    ]) !!} style="{!! isset($data->color) ? 'color:' . $data->color . ' !important;' : null !!}{!! $data->size ? 'width:' . $data->size . ';height:' . $data->size . ";'" : null !!}">
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
    @endif
@endisset
