import { router, usePage } from "@inertiajs/react";
import { Add, AddCard, Cancel, Delete, Visibility } from "@mui/icons-material";
import { Box, Input, Modal, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";
import FormPaket from "../FormPaket";
import Layouts from "@/Layouts/Layouts";
// import "animate.css/animate.compat.css";
export default function Index(props) {
    const paketRef = useRef();
    const paket = props.paket;
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
            title: "Hapus Paket?",
            text: "Apakah anda ingin menghapus paket " + row.nama_paket,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.delete-paket", { id: row.id }), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menghapus 1 paket",
                            icon: "success",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    const addCartHandler = (row) => {
        Swal.fire({
            title: "Tambah Pesanan Paket",
            text:
                "Apakah anda ingin menambahkan " +
                row.nama_paket +
                "ke dalam daftar pesanan paket anda?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Tambahkan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("add-cart"),
                    { id: row.id },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Succes!",
                                text: "Berhasil menambahkan 1 paket baru pada pesanan anda",
                                icon: "success",
                            });
                        },
                        onError: (err) => {
                            console.log(err);
                            Swal.fire({
                                title: "Gagal Menambah Pesanan!",
                                text: err.message,
                                icon: "error",
                            });
                        },
                        preserveScroll: true,
                    }
                );
            }
        });
    };
    useEffect(() => {
        paketRef.current.scrollIntoView({ behavior: "smooth" });
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
                                    Tambah Paket
                                </p>
                                <button
                                    onClick={() => setModalTambah(false)}
                                    className="bg-red-500 text-white text-xl tracking-tighter leading-none px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                                >
                                    <Tooltip title={"Batalkan Tambah Paket"}>
                                        <Cancel
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            </div>
                            <div className="my-3 w-full">
                                <FormPaket onClose={setModalTambah} />
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
                                    Show Paket {model?.nama_paket}
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
                                                src={
                                                    "/storage/" +
                                                    model.foto_paket
                                                }
                                                alt=""
                                                className="h-[350px] w-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Paket {model?.nama_paket}
                                            </h1>
                                            <div className="flex gap-3">
                                                <p className="text-white font-normal tracking-tighter">
                                                    <CurrencyInput
                                                        prefix="Rp. "
                                                        value={
                                                            model.harga_paket
                                                        }
                                                        disabled
                                                        className="bg-inherit w-[100px] border-none text-blue-900 text-2xl font-medium tracking-tighter p-0"
                                                    />
                                                </p>
                                                <p className="text-blue-900 text-2xl font-medium tracking-tighter">
                                                    / {model.kategori_sewa}
                                                </p>
                                            </div>
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Deskripsi
                                            </h1>
                                            <p>{model.deskripsi_paket}</p>
                                            <h1 className="text-blue-950 font-bold text-lg">
                                                Catatan
                                            </h1>
                                            <p>{model.deskripsi_paket}</p>
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
                {(role == "pengunjung" || role == null) && (
                    <div className="">
                        <h3 className="text-white text-2xl font-medium uppercase tracking-tighter text-center ">
                            Paket Yang Tersedia
                        </h3>
                        <h1 className="text-white text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                            {profile.nama_wisata}
                        </h1>
                    </div>
                )}
                {role == "admin" && (
                    <div className="">
                        <h3 className="text-white text-2xl font-medium uppercase tracking-tighter text-center ">
                            Paket Yang Tersedia
                        </h3>
                        <h1 className="text-white text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                            Halo Admin, Silahkan mengatur paket yang tersedia
                        </h1>
                    </div>
                )}
                {paket.length > 0 ? (
                    <>
                        <div
                            ref={paketRef}
                            className="flex justify-end my-3 gap-3"
                        >
                            <TextField
                                className="bg-white px-2 py-2"
                                id="standard-basic"
                                label="Cari Paket"
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
                                    <Tooltip title={"Tambah Paket"}>
                                        <Add
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 transition-all duration-300 ease-in-out">
                            {paket.map((item, key) => (
                                <ScrollAnimation
                                    className="relative"
                                    animateIn={`${
                                        key % 2 == 1 ? "fadeInUp" : "fadeInDown"
                                    }`}
                                    delay={key + 1 * 500}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={"/storage/" + item.foto_paket}
                                            alt=""
                                            className="w-full object-cover"
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full hover:bg-gray-950/50 transition-all duration-300 ease-in-out "></div>
                                        <div className="w-full absolute bottom-2 left-4">
                                            <h1 className="text-white text-2xl font-normal tracking-tighter">
                                                {item.nama_paket}
                                            </h1>
                                            <div className="flex gap-3">
                                                <p className="text-white font-normal tracking-tighter">
                                                    <CurrencyInput
                                                        prefix="Rp. "
                                                        value={item.harga_paket}
                                                        disabled
                                                        className="bg-inherit w-[100px] border-none text-orange-500 text-2xl font-medium tracking-tighter p-0"
                                                    />
                                                </p>
                                                <p className="text-orange-500 text-2xl font-medium tracking-tighter">
                                                    / {item.kategori_sewa}
                                                </p>
                                            </div>

                                            <p className="text-white text-2xl font-medium tracking-tighter">
                                                Catatan:
                                            </p>
                                            <p className="text-white text-sm font-light tracking-tighter">
                                                {item.catatan_paket}
                                            </p>
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
                                            {(role == "pengunjung" ||
                                                role == null) && (
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
                                                            addCartHandler(item)
                                                        }
                                                        className="bg-green-500 hover:bg-green-800 transition-all ease-in-out duration-300 text-white py-1 px-2 leading-none tracking-tighter"
                                                    >
                                                        <Tooltip title="Tambahkan Ke Cart Pesanan">
                                                            <AddCard />
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
                        Belum ada paket yang di tambahkan
                    </p>
                )}
                <p className="py-6 text-center text-white text-2xl font-thin">
                    Terimakasih, Telah mengunjungi website kami, silahkan
                    melakukan pesanan paket anda
                </p>
            </ScrollAnimation>
        </>
    );
}

Index.layout = (page) => <Layouts children={page} title={"Paket wisata"} />;
