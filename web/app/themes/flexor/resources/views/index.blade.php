@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  {{-- @if (! have_posts())
    <x-alert type="warning">
      {!! __('Sorry, no results were found.', 'sage') !!}
    </x-alert>

    {!! get_search_form(false) !!}
  @endif --}}

  @include('partials.swiper-logo.blade.php', ['images' => array('url' => 'https://lorempixel.com/50/50/', 'alt' => 'small image')])

  {{-- @while(have_posts()) @php(the_post())
    @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
  @endwhile

  {!! get_the_posts_navigation() !!} --}}
@endsection

@section('sidebar')
  @include('sections.sidebar')
@endsection
