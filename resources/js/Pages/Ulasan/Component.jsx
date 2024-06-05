import StyledRating from "@/Components/StyledRating";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Slider from "react-slick";

export default function Component({ profile, ulasan }) {
    var settings = {
        autoplay: true,
        autplaySpeed: 200,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: true,
    };
    console.log(ulasan);
    return (
        <div>
            <ScrollAnimation
                animateIn="fadeInRight"
                className="py-16 px-4 bg-[url('storage/Image/bg.jpg')] bg-no-repeat bg-cover"
            >
                <div className="">
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Ulasan Pengunjung Kami
                    </h3>
                    <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        {profile.nama_wisata}
                    </h1>
                </div>
            </ScrollAnimation>

            <div className="px-4">
                <Slider {...settings}>
                    {ulasan.map((item, key) => (
                        <div className="hover:bg-gray-100 px-4 rounded-md py-6 h-full">
                            <div className="flex gap-3 items-center">
                                <img
                                    src={"/storage/" + item.foto}
                                    alt=""
                                    className="rounded-full h-[75px] w-[75px] object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-blue-950 mt-6 text-xl">
                                        {item.nama}
                                    </h3>
                                    <StyledRating value={item.rating} />
                                </div>
                            </div>
                            <p>{item.ulasan}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
