<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\View\Components\SwiperLogo;

class Testimonials extends Component
{
    public $clients;
    public $title;
    public $classNames;
    public $styles;
    /**
     * Create a new component instance.
     */
    public function __construct($clients = [], $classNames = '', $styles)
    {
        $this->clients = $clients;
        $this->classNames = $classNames;
        $this->title = SwiperLogo::generateRandomString(10);
        $this->styles = $styles;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.testimonials');
    }
}
