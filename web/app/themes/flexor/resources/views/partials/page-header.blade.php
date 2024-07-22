@if ($pagination)
  <nav class="page-nav" aria-label="Page">
    <ol class="breadcrumb">
      {!! $pagination !!}
    </ol>
  </nav>
@endif
<div class="container-fluid mb-4">
    <div class="container">
        <h1 class="page-title">{!! $title !!}</h1>
    </div>
</div>