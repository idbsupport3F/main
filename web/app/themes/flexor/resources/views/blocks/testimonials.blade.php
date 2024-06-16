@isset($data->clients)
<x-testimonials :clients="$data->clients" :classNames="$data->classNames" :styles="$data->styles" />
@endisset