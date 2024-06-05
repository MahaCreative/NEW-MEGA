<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $cats = [
        'cart_ids' => 'array', // hilangkan ini juga
        'payment_info' => 'array',
        'succeeded_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'order_id', 'kd_pesanan');
    }
}
