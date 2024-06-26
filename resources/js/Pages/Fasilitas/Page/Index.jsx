import { router, usePage } from "@inertiajs/react";
import { Add, AddCard, Cancel, Delete, Visibility } from "@mui/icons-material";
import { Box, Input, Modal, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

import Layouts from "@/Layouts/Layouts";
import FormFasilitas from "../FormFasilitas";
// import "animate.css/animate.compat.css";
export default function Index(props) {
    const fasilitasRef = useRef();
    const fasilitas = props.fasilitas;
    const profile = props.profile;
    const [params, setParams] = useState({ cari: "" });
    const [modalShow, setModalShow] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);
    const [role, setRole] = useState(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);
    const lihatHandler = (row) => {
        setModalShow(true);
        setModel(row);
    };
    const deleteHandler = (row) => {
        Swal.fire({
            title: "Hapus Fasilitas?",
            text: "Apakah anda ingin menghapus fasilitas " + row.fasilitas,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("admin.delete-fasilitas-wisata", { id: row.id }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Succes!",
                                text: "Berhasil menghapus 1 fasilitas",
                                icon: "success",
                            });
                        },
                        preserveScroll: true,
                    }
                );
            }
        });
    };
    useEffect(() => {
        fasilitasRef.current.scrollIntoView({ behavior: "smooth" });
    });
    return (
        <>
            {/* modal */}
            <div>
                <Modal
                    open={modalTambah}
                    onClose={() => setModalTambah(false)}
                    style={{ zIndex: 10 }}
                >
                    <div className="bg-blue-950/30 backdrop-blur-md w-full h-full flex justify-center items-center">
                        <div className="bg-white py-2 px-3 min-w-[50%] max-w-[95%] max-h-[95%] overflow-auto rounded-md">
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-normal text-blue-500 border-b-4 border-blue-500">
                                    Tambah fasilitas
                                </p>
                                <button
                                    onClick={() => setModalTambah(false)}
                                    className="bg-red-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                                >
                                    <Tooltip
                                        title={"Batalkan Tambah fasilitas"}
                                    >
                                        <Cancel
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            </div>
                            <div className="my-3 w-full">
                                <FormFasilitas onClose={setModalTambah} />
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* Show */}
                <Modal
                    open={modalShow}
                    onClose={() => {
                        setModalShow(false);
                        setModel(null);
                    }}
                    style={{ zIndex: 10 }}
                >
                    <div className="bg-blue-950/30 backdrop-blur-md w-full h-full flex justify-center items-center">
                        <div className="bg-white py-2 px-3 min-w-[50%] max-w-[95%] max-h-[95%] overflow-auto rounded-md">
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-normal text-blue-500 border-b-4 border-blue-500">
                                    Show Fasilitas {model?.nama_fasilitas}
                                </p>
                                <button
                                    onClick={() => {
                                        setModalShow(false);
                                        setModel(null);
                                    }}
                                    className="bg-red-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                                >
                                    <Tooltip title={"Close"}>
                                        <Cancel
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            </div>
                            <div className="my-3 w-full">
                                {model && (
                                    <div className="flex flex-col md:flex-row justify-between gap-5 items-start">
                                        <div className="w-full">
                                            <img
                                                src={"/storage/" + model.gambar}
                                                alt=""
                                                className="h-[350px] w-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Fasilitas{" "}
                                                {model?.nama_fasilitas}
                                            </h1>
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Status Sewa
                                            </h1>
                                            <p>{model.status}</p>
                                            {model?.status == "sewa" && (
                                                <div className="flex gap-3">
                                                    <p className="text-white font-normal tracking-tighter">
                                                        <CurrencyInput
                                                            prefix="Rp. "
                                                            value={
                                                                model.harga_sewa
                                                            }
                                                            disabled
                                                            className="bg-inherit w-[500px] border-none text-blue-900 text-2xl font-medium tracking-tighter p-0"
                                                        />
                                                    </p>
                                                </div>
                                            )}
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Keterangan
                                            </h1>
                                            <p>{model.keterangan}</p>
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Nama Pemiliki
                                            </h1>
                                            <p>{model.nama_pemilik}</p>
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Kontak Pemilik
                                            </h1>
                                            <p>{model.contact_pemilik}</p>

                                            <p className="mt-3 text-red-500 italic font-bold">
                                                Untuk fasilitas yang statusnya
                                                di sewakan silahkan menghubungi
                                                Pemilik, dan lakukan negosiasi
                                                Harga
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <ScrollAnimation
                animateIn="fadeInRight"
                className="py-16 px-4 bg-[url('storage/Image/bg.jpg')] bg-no-repeat bg-cover"
            >
                {role == "pengunjung" ||
                    (role == null && (
                        <div className="">
                            <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                                Fasiltas Yang Tersedia
                            </h3>
                            <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                                {profile.nama_wisata}
                            </h1>
                        </div>
                    ))}
                {role == "admin" && (
                    <div className="">
                        <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                            Fasilitas Yang Tersedia
                        </h3>
                        <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                            Halo Admin, Silahkan mengatur Fasilitas yang
                            tersedia
                        </h1>
                    </div>
                )}
                {fasilitas.length > 0 ? (
                    <>
                        <div
                            ref={fasilitasRef}
                            className="flex justify-end my-3 gap-3"
                        >
                            <TextField
                                className="bg-white px-2 py-2"
                                id="standard-basic"
                                label="Cari Fasilitas"
                                variant="standard"
                                value={params.cari}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                            />
                            {role == "admin" && (
                                <button
                                    onClick={() => setModalTambah(true)}
                                    className="bg-blue-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-blue-800 transition-all duration-300 ease-linear"
                                >
                                    <Tooltip title={"Tambah Fasilitas"}>
                                        <Add
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            )}
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 transition-all duration-300 ease-in-out">
                            {fasilitas.map((item, key) => (
                                <ScrollAnimation
                                    className="relative"
                                    animateIn={`${
                                        key % 2 == 1 ? "fadeInUp" : "fadeInDown"
                                    }`}
                                    delay={key + 1 * 500}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={"/storage/" + item.gambar}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full hover:bg-gray-950/50 transition-all duration-300 ease-in-out "></div>
                                        <div className="w-full absolute bottom-2 left-4">
                                            <h1 className="text-white text-2xl font-normal tracking-tighter">
                                                {item.nama_fasilitas}
                                            </h1>
                                            {item.status == "sewa" && (
                                                <div className="flex gap-3">
                                                    <p className="text-white font-normal tracking-tighter">
                                                        <CurrencyInput
                                                            prefix="Rp. "
                                                            value={
                                                                item.harga_sewa
                                                            }
                                                            disabled
                                                            className="bg-inherit w-[300px] border-none text-orange-500 text-2xl font-medium tracking-tighter p-0"
                                                        />
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute top-2 right-2 w-full flex gap-3 justify-end">
                                            {role == "admin" && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            lihatHandler(item)
                                                        }
                                                        className="bg-blue-500 hover:bg-blue-800 transition-all ease-in-out duration-300 text-white py-1 px-2 leading-none tracking-tighter"
                                                    >
                                                        <Tooltip title="Lihat Detail Paket">
                                                            <Visibility />
                                                        </Tooltip>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(item)
                                                        }
                                                        className="bg-red-500 hover:bg-red-800 transition-all ease-in-out duration-300 text-white py-1 px-2 leading-none tracking-tighter"
                                                    >
                                                        <Tooltip title="Delete Detail Paket">
                                                            <Delete />
                                                        </Tooltip>
                                                    </button>
                                                </div>
                                            )}
                                            {role == "pengunjung" && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            lihatHandler(item)
                                                        }
                                                        className="bg-blue-500 hover:bg-blue-800 transition-all ease-in-out duration-300 text-white py-1 px-2 leading-none tracking-tighter"
                                                    >
                                                        <Tooltip title="Lihat Detail Paket">
                                                            <Visibility />
                                                        </Tooltip>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-white text-center text-xl font-bold">
                        {" "}
                        Belum ada Fasilitas yang di tambahkan
                    </p>
                )}
            </ScrollAnimation>
        </>
    );
}

Index.layout = (page) => <Layouts children={page} title={"Fasilitas"} />;
