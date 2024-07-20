{{--
  Template Name: Peperiksaan Template
--}}

@extends('layouts.app')

@section('content')
  @include('partials.page-header')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    @includeFirst(['partials.content-page', 'partials.content'])
  @endwhile
@endsection

@section('footer')
  @include('sections.peperiksaan-footer')
@endsection
