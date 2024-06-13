<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class SwiperLogo extends Component
{
    public $title;
    public $images;
    public $alt;
    /**
     * Create a new component instance.
     */
    public function __construct($images = [], $alt = [])
    {
        $this->title = $this->generateRandomString();
        $this->images = $images;
        $this->alt = $alt;
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.swiper-logo');
    }
}
