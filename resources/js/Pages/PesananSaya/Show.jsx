import InputText from "@/Components/InputText";
import Layouts from "@/Layouts/Layouts";
import { router, useForm, usePage } from "@inertiajs/react";
import { Delete } from "@mui/icons-material";
import { Modal } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";
import { Link } from "react-scroll";
import Swal from "sweetalert2";

export default function Show(props) {
    const pesanan = props.pesanan;
    const [token, setToken] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        waktu_kunjungan: "",
        kd_pesanan: pesanan.kd_pesanan,
    });

    const [modalPayment, setModalPayment] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Nama Paket",
            selector: (row) => row.nama_paket,
            wrap: true,
        },
        {
            name: "Harga Paket",
            selector: (row) => (
                <CurrencyInput
                    value={row.harga_paket}
                    prefix="Rp. "
                    className="p-0 border-none bg-inherit"
                    disabled
                />
            ),
            wrap: true,
        },
        {
            name: "Harga Paket",
            selector: (row) => (
                <CurrencyInput
                    value={row.harga_paket}
                    prefix="Rp. "
                    className="p-0 border-none bg-inherit"
                    disabled
                />
            ),
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) =>
                row.status_pembayaran == "pending" && (
                    <button
                        onClick={() => deleteHandler(row)}
                        className="bg-red-500 text-lg py-2 px-2 hover:bg-re transition-all duration-300 ease-in-out text-white"
                    >
                        <Delete color="inherit" fontSize="inherit" />
                    </button>
                ),
            wrap: true,
        },
    ];
    const [role, setRole] = useState(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);

    useEffect(() => {
        if (pesanan.token) {
            setToken(pesanan.token);
        }
        setData({ ...data, kd_pesanan: pesanan.kd_pesanan });
    }, [pesanan]);

    const bayarPesanan = (e) => {
        window.snap.pay(token, {
            onSuccess: function () {
                // console.log("success");
                Swal.fire({
                    icon: "success",
                    title: "Pesanan berhasil dibayar",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    router.visit(
                        route("invoice-pesanan", {
                            kd_pesanan: pesanan.kd_pesanan,
                        })
                    );
                }, 1500);
            },
            onPending: function () {
                // console.log("pending");
                Swal.fire({
                    icon: "info",
                    title: "Pesanan sedang di proses",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
        });
    };
    const updatewaktu = () => {
        Swal.fire({
            title: "Update waktu kunjungan",
            text: "Apakah anda mengupdate waktu kunjungan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya update kunjungan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create-token"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Sukses",
                            text: "berhasil memperbaharui waktu kunjungan",
                            icon: "success",
                        });
                    },
                    onError: (err) => {
                        Swal.fire({
                            title: "Gagal",
                            text: err.waktu_kunjungan
                                ? err.waktu_kunjungan
                                : err.message,
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
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
                router.post(route("delete-cart"), row, {
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

    return (
        <div className="py-6 px-4">
            <div>
                <Modal open={modalPayment} onClose={setModalPayment}>
                    <div className="bg-blue-950/30 backdrop-blur-md w-full h-full flex justify-center items-center">
                        <div className="bg-white py-2 px-3 min-w-[50%] max-w-[95%] max-h-[95%] overflow-auto rounded-md"></div>
                    </div>
                </Modal>
            </div>
            {role == "pengunjung" && (
                <>
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Daftar Pesanan Saya
                    </h3>

                    <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        Silahkan Mengelola Pesanan Anda Disini
                    </h1>
                </>
            )}
            {role == "admin" && (
                <>
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Daftar Pesanan Pelanggan
                    </h3>

                    <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        Berikut daftar paket yang di pesan pelanggan
                    </h1>
                </>
            )}
            <div id="snap-container" className="z-[9999]"></div>
            <div className="bg-gray-200 py-4 px-4 rounded-md">
                <div className="flex flex-col md:flex-row gap-3 justify-between items-start">
                    <div>
                        <h3 className="text-blue-950 tracking-tighter font-medium ">
                            Kode Pesanan: {pesanan.kd_pesanan}
                        </h3>
                        <h3 className="text-blue-950 tracking-tighter font-medium capitalize">
                            Tanggal Pesanan:{" "}
                            {moment(pesanan.tanggal_pesanan).format(
                                "DD-MM-YYYY H:I"
                            )}
                        </h3>
                        <h3 className="text-blue-950 tracking-tighter font-medium ">
                            Total Pesanan:{" "}
                            <CurrencyInput
                                prefix="Rp. "
                                value={pesanan.total_harga}
                                disabled
                                className="p-0 border-none bg-inherit"
                            />
                        </h3>
                    </div>
                    <div>
                        <h3 className="text-blue-950 tracking-tighter font-medium ">
                            Status Pembayaran: {pesanan.status_pembayaran}
                        </h3>
                        <h3 className="text-blue-950 tracking-tighter font-medium capitalize">
                            Tanggal Pesanan:{" "}
                            {moment(pesanan.tanggal_pembayaran).format(
                                "DD-MM-YYYY "
                            )}
                        </h3>
                    </div>
                </div>
                <DataTable data={pesanan.detail} columns={columns} />
                {role == "pengunjung" && (
                    <>
                        {pesanan.waktu_kunjungan ? (
                            ""
                        ) : (
                            <>
                                <p className="py-3 font-medium text-blue-800 text-xl">
                                    Sebelum melakukan pembayaran, silahkan
                                    memasukkan informasi waktu anda akan
                                    berkunjung ke wisata kami.
                                </p>
                                <InputText
                                    type="date"
                                    text={"waktu Kunjungan"}
                                    error={errors.waktu_kunjungan}
                                    value={data.waktu_kunjungan}
                                    name="waktu_kunjungan"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </>
                        )}
                        {pesanan.waktu_perencanaan ? (
                            <>
                                {pesanan.status_pembayaran == "pending" ? (
                                    <button
                                        onClick={bayarPesanan}
                                        className="bg-blue-500 py-2 px-4 text-white font-normal my-3"
                                    >
                                        Bayar Pesanan
                                    </button>
                                ) : (
                                    <Link
                                        as="button"
                                        href={route("invoice-pesanan", {
                                            kd_pesanan: pesanan.kd_pesanan,
                                        })}
                                        className="bg-green-500 py-2 px-4 text-white font-normal my-6"
                                    >
                                        Lihat Invoice
                                    </Link>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={updatewaktu}
                                className="bg-blue-500 py-2 px-4 text-white font-normal my-3"
                            >
                                Tambahkan waktu kunjungan
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <Layouts children={page} title={"Detail Pesanan Saya"} />
);
