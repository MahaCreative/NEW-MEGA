import InputText from "@/Components/InputText";
import StyledRating from "@/Components/StyledRating";
import Layouts from "@/Layouts/Layouts";
import { router, usePage } from "@inertiajs/react";
import { Cancel, Check, Style } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import DataTable from "react-data-table-component";
import Slider from "react-slick";
import Swal from "sweetalert2";
import FormUlasan from "../FormUlasan";

export default function Index({ profile, ulasan }) {
    const [role, setRole] = useState(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);
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
    const [params, setParams] = useState({ cari: "" });
    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Nama Pengunjung",
            selector: (row) => row.nama,
            width: "250px",
        },
        {
            name: "Rating",
            selector: (row) => <StyledRating disabled value={row.rating} />,
            width: "250px",
        },
        {
            name: "Ulasan",
            selector: (row) => row.ulasan,
            width: "550px",
            wrap: true,
        },
        {
            name: "Status Konfirmasi",
            selector: (row) => row.status_konfirmasi,

            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) =>
                row.status_konfirmasi == "menunggu konfirmasi" && (
                    <>
                        <button
                            onClick={() => konfirmasiHandler(row, "diterima")}
                            className="bg-blue-500 text-white py-1 px-2"
                        >
                            <Tooltip title="Terima Ulasan">
                                <Check />
                            </Tooltip>
                        </button>
                        <button
                            onClick={() => konfirmasiHandler(row, "ditolak")}
                            className="bg-red-500 text-white py-1 px-2"
                        >
                            <Tooltip title="Tolak Ulasan">
                                <Cancel />
                            </Tooltip>
                        </button>
                    </>
                ),
            wrap: true,
        },
    ];
    const konfirmasiHandler = (row, status) => {
        Swal.fire({
            title: status == "diterima" ? "Terima Ulasan?" : "Tolak Ulasan",
            text:
                status == "diterima"
                    ? "Apakah anda yakin ingin menerima ulasan"
                    : "Apakah anda yakin ingin menolak ulasan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText:
                status == "diterima" ? "Terima Ulasan" : "Tolak Ulasan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("admin.confirm-ulasan", {
                        id: row.id,
                        status: status,
                    }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Succes!",
                                text: "Berhasil melakukan konfirmasi ulasan",
                                icon: "success",
                            });
                        },
                        preserveScroll: true,
                    }
                );
            }
        });
    };
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
            {role == "admin" && (
                <div className="w-full  px-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-blue-950 text-xl font-bold uppercase tracking-tighter text-left mb-6 ">
                            Data Ulasan Pengunjung
                        </h1>
                        <InputText label={"Cari Ulasan Berdasarkan Nama"} />
                    </div>
                    <DataTable data={ulasan} columns={columns} />
                </div>
            )}
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
            {(role == "pengunjung" || role == null) && (
                <div className="px-4 w-full">
                    <FormUlasan />
                </div>
            )}
        </div>
    );
}
Index.layout = (page) => <Layouts children={page} title="Ulasan Pengunjung" />;
