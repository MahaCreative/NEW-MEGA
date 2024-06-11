<?php

namespace App\Http\Controllers;

use App\Models\Jumbotron;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function delete(Request $request)
    {
        $slider = Jumbotron::findOrFail($request->id);
        $slider->delete();
        return redirect()->back();
    }
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:10|max:100',
            'tagline' => 'required|string|min:25|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $foto = $request->file('image')->store('slider');
        Jumbotron::create([
            'title' => $request->title,
            'tagline' => $request->tagline,
            'image' => $foto,
        ]);
        return redirect()->back();
    }
}
