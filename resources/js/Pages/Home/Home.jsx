import Layouts from "@/Layouts/Layouts";
import { Link, Head, usePage, router } from "@inertiajs/react";
import { Room, TravelExplore, WhatsApp } from "@mui/icons-material";
import Index from "../Paket/Index";
import IndexFasilitas from "../Fasilitas/Index";
import ScrollAnimation from "react-animate-on-scroll";
import FormProfileWisata from "./FormProfileWisata";
import CurrencyInput from "react-currency-input-field";
import IndexForHome from "../Galery/IndexForHome";

import Component from "../Ulasan/Component";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import FormSlider from "./FormSlider";

export default function Home(props) {
    const { profile } = usePage().props;
    const paket = props.paket;
    const slider = props.slider;
    const ulasan = props.ulasan;
    const fasilitas = props.fasilitas;
    const galery = props.galery;
    const [role, setRole] = useState(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);
    const columnsSlider = [
        {
            name: "#",
            selector: (row, id) => id + 1,
            width: "60px",
        },
        {
            name: "Gambar",
            selector: (row) => (
                <img
                    src={"/storage/" + row.image}
                    alt=""
                    className="w-[100px]"
                />
            ),
        },
        {
            name: "Judul Slider",
            selector: (row) => row.title,
        },
        {
            name: "Tagline",
            selector: (row) => row.tagline,
        },
        {
            name: "aksi",
            selector: (row) => (
                <button
                    onClick={() => deleteSlider(row.id)}
                    className="bg-red-500 py-1 px-1 text-white"
                >
                    Delete
                </button>
            ),
        },
    ];

    const deleteSlider = (id) => {
        Swal.fire({
            title: "Hapus Slider?",
            text: "Apakah anda ingin Slider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("delete-slider", { id: id }), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menghapus slider",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menghapus slider",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <>
            <div className="bg-[url('storage/Image/bg.jpg')] bg-no-repeat bg-cover  py-16 px-4 ">
                <ScrollAnimation animateIn="fadeIn">
                    <h3 className="text-blue-900 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Profile dan Sejarah
                    </h3>
                    <h1 className="text-blue-900 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        {profile.nama_wisata}
                    </h1>
                </ScrollAnimation>

                <div className="flex flex-col md:flex-row gap-9 justify-center ">
                    <ScrollAnimation animateIn="fadeInLeft" className="w-full">
                        <div className="w-full">
                            <h3 className="capitalize font-medium text-3xl tracking-tighter text-blue-900">
                                Sejarah {profile.nama_wisata}
                            </h3>
                            <p className="text-sm font-light line-clamp-5 mt-6">
                                {profile.deskripsi_wisata}
                            </p>
                            <div className="flex gap-3 items-center my-2">
                                <p className="text-blue-900 text-2xl leading-3">
                                    <Room color="inherit" fontSize="inherit" />
                                </p>
                                <p className="text-lg text-blue-900">
                                    {profile.alamat_wisata}
                                </p>
                            </div>
                            <div className="flex gap-3 items-center my-2">
                                <p className="text-blue-900 text-2xl leading-3">
                                    <WhatsApp
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </p>
                                <p className="text-lg text-blue-900">
                                    {profile.kontak}
                                </p>
                            </div>
                            <h3 className="capitalize font-medium text-3xl tracking-tighter text-blue-900">
                                Informasi wisata
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-2xl transition-all duration-300 ease-in-out">
                                <div className="bg-blue-900 py-2 px-4 text-white rounded-md">
                                    <h3>Hari Buka</h3>
                                    <p>
                                        {profile.hari_libur == null
                                            ? "Buka Setiap Hari"
                                            : `${
                                                  profile.hari_buka +
                                                  " - " +
                                                  profile.hari_libur
                                              }`}
                                    </p>
                                </div>
                                <div className="bg-blue-900 py-2 px-4 text-white rounded-md">
                                    <h3>Jam Buka</h3>
                                    <p>
                                        {profile.jam_tutup == null
                                            ? "Terbuka 24 Jam"
                                            : `${
                                                  profile.jam_buka +
                                                  " - " +
                                                  profile.jam_tutup
                                              }`}
                                    </p>
                                </div>
                                <div className="bg-blue-900 py-2 px-4 text-white rounded-md col-span-2 md:col-span-1 transition-all duration-300 ease-in-out rounded-md">
                                    <h3>Harga Tiket Masuk</h3>
                                    <p>
                                        {profile.harga_tiket == null ? (
                                            "Tiket Masuk Gratis"
                                        ) : (
                                            <CurrencyInput
                                                value={profile.harga_tiket}
                                                prefix="Rp. "
                                                disabled
                                                className="bg-inherit border-none text-xl font-bold p-0"
                                            />
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation
                        animateIn="fadeInLeft"
                        delay={700}
                        className="w-full"
                    >
                        <div className="w-full flex justify-start items-start px-4">
                            <div className="w-full">
                                <h3 className="my-3 capitalize font-medium text-xl tracking-tighter text-blue-900">
                                    Lokasi Wisata
                                </h3>
                                <div className="rounded-md overflow-hidden ">
                                    <iframe
                                        src={profile.url_lokasi_wisata}
                                        width="100%"
                                        height="350"
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
                {role == "admin" && <FormProfileWisata profile={profile} />}
                {role == "admin" && (
                    <div>
                        <h3 className="font-bold text-blue-950">Slider</h3>
                        <DataTable
                            data={slider}
                            columns={columnsSlider}
                            pagination
                            dense
                        />
                        <div className="my-3">
                            <FormSlider />
                        </div>
                    </div>
                )}
            </div>
            <Index paket={paket} profile={profile} />
            <IndexFasilitas fasilitas={fasilitas} profile={profile} />
            <IndexForHome galery={galery} profile={profile} />
            <Component profile={profile} ulasan={ulasan} />
        </>
    );
}

Home.layout = (page) => <Layouts children={page} title={"Home"} />;
