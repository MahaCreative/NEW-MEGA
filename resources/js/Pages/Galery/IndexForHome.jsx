import { router } from "@inertiajs/react";
import { Add, AddCard, Cancel, Delete, Visibility } from "@mui/icons-material";
import { Box, Input, Modal, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

import Layouts from "@/Layouts/Layouts";
// import Formgalery from "./Formgalery";
// import "animate.css/animate.compat.css";
export default function IndexForHome(props) {
    const galeryRef = useRef();
    const galery = props.galery;
    const profile = props.profile;
    const [params, setParams] = useState({ cari: "" });
    const [modalShow, setModalShow] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);

    const lihatHandler = (row) => {
        setModalShow(true);
        setModel(row);
    };

    return (
        <>
            {/* modal */}
            <div>
                {/* Show */}
                <Modal
                    open={modalShow}
                    onClose={() => {
                        setModalShow(false);
                        setModel(null);
                    }}
                    style={{ zIndex: 10 }}
                >
                    <div
                        onClick={() => {
                            setModel(null);
                            setModalShow(false);
                        }}
                        className="bg-blue-950/30 backdrop-blur-md w-full h-full flex justify-center items-center"
                    >
                        <div className=" py-2 px-3 min-w-[50%] max-w-[95%] max-h-[95%] overflow-auto rounded-md">
                            <div className="my-3 w-full">
                                {model && (
                                    <div className=" items-start">
                                        <div className="w-full">
                                            <img
                                                src={"/storage/" + model.gambar}
                                                alt=""
                                                className="h-[350px] w-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h1 className="text-white font-bold text-lg capitalize">
                                                galery {model?.judul_galery}
                                            </h1>

                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h1 className="text-white font-bold text-lg capitalize">
                                                        Nama Pengunjung
                                                    </h1>
                                                    <p className="text-white font-bold text-lg capitalize">
                                                        {model.nama_pengunjung}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h1 className="text-white font-bold text-lg capitalize">
                                                        Tanggal Foto
                                                    </h1>
                                                    <p className="text-white font-bold text-lg capitalize">
                                                        {model.tanggal_foto}
                                                    </p>
                                                </div>
                                            </div>
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
                className="py-16 px-4 bg-blue-950"
            >
                <div className="">
                    <h3 className="text-white text-2xl font-medium uppercase tracking-tighter text-center ">
                        Galery Kami
                    </h3>
                    <h1 className="text-white text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        {profile.nama_wisata}
                    </h1>
                </div>

                {galery.length > 0 ? (
                    <>
                        <div
                            ref={galeryRef}
                            className="flex justify-end my-3 gap-3"
                        >
                            <TextField
                                className="bg-white px-2 py-2"
                                id="standard-basic"
                                label="Cari galery"
                                variant="standard"
                                value={params.cari}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                            />
                            <button
                                onClick={() => setModalTambah(true)}
                                className="bg-blue-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-blue-800 transition-all duration-300 ease-linear"
                            >
                                <Tooltip title={"Tambah galery"}>
                                    <Add color="inherit" fontSize="inherit" />
                                </Tooltip>
                            </button>
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 transition-all duration-300 ease-in-out">
                            {galery.map((item, key) => (
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
                                                {item.judul_galery}
                                            </h1>
                                            <p className="text-white text-2xl font-medium tracking-tighter">
                                                Nama Pengunjung:
                                            </p>
                                            <p className="text-white text-sm font-light tracking-tighter">
                                                {item.nama_pengunjung}
                                            </p>
                                        </div>
                                        <div className="absolute top-2 right-2 w-full flex gap-3 justify-end">
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
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-white text-center text-xl font-bold">
                        {" "}
                        Belum ada galery yang di tambahkan
                    </p>
                )}
            </ScrollAnimation>
        </>
    );
}
