import Layouts from "@/Layouts/Layouts";
import { router, usePage } from "@inertiajs/react";

import React, { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";
import { Link } from "react-scroll";
import Swal from "sweetalert2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function Index(props) {
    const pesanan = props.pesanan;
    const totalPesananBulan = props.totalPesananPerBulan;
    const totalPesananTahun = props.totalPesananPerTahun;
    const pesananRef = useRef();
    const [role, setRole] = useState(null);
    const { auth } = usePage().props;
    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);
    useEffect(() => {
        pesananRef.current.scrollIntoView({ behavior: "smooth" });
    });
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Kode Pesanan",
            selector: (row) => row.kd_pesanan,
            wrap: true,
        },
        {
            name: "Jumlah Paket Pesanan",
            selector: (row) => row.total_pesanan + " Paket",
            wrap: true,
        },
        {
            name: "Tanggal Pesanan",
            selector: (row) => row.tanggal_pesanan,
            wrap: true,
        },
        {
            name: "Waktu Kunjungan",
            selector: (row) => row.waktu_perencanaan,
            wrap: true,
        },
        {
            name: "Total Harga",
            selector: (row) => (
                <CurrencyInput
                    value={row.total_harga}
                    prefix="Rp. "
                    className="p-0 border-none bg-inherit"
                    disabled
                />
            ),
            wrap: true,
        },
        {
            name: "Status Pesanan",
            selector: (row) => <p>{row.status_pesanan}</p>,
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => <p>{row.status_pembayaran}</p>,
            wrap: true,
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => <p>{row.payment_at}</p>,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex flex-col gap-1">
                    {role == "pengunjung" && (
                        <>
                            {row.status_pembayaran == "pending" && (
                                <>
                                    {row.status_pesanan !== "dibatalkan" && (
                                        <button
                                            onClick={() => batalkanPesanan(row)}
                                            className="bg-red-500 py-2 px-4 rounded-md text-white"
                                        >
                                            Batalkan Pesanan
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {role == "admin" && (
                        <>
                            {(row.status_pembayaran == "pending" ||
                                row.status_pesanan == "dibatalkan") && (
                                <button
                                    onClick={() => deletePesanan(row)}
                                    className="bg-red-500 py-2 px-4 rounded-md text-white"
                                >
                                    Hapus Pesanan
                                </button>
                            )}
                            {(row.status_pembayaran == "caputre" ||
                                row.status_pembayaran == "settlement") && (
                                <>
                                    {row.status_pesanan != "selesai" && (
                                        <button
                                            onClick={() =>
                                                konfirmasiPesanan(row)
                                            }
                                            className="bg-red-500 py-2 px-4 rounded-md text-white"
                                        >
                                            Selesaikan Pesanan
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <button
                        onClick={() => lihatPesanan(row)}
                        className="bg-blue-500 py-2 px-4 rounded-md text-white"
                    >
                        Lihat Pesanan
                    </button>
                </div>
            ),
            wrap: true,
        },
    ];
    const batalkanPesanan = (row) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Anda tidak dapat mengembalikan pesanan yang telah dibatalkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, batalkan pesanan!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("cancel-order"),
                    {
                        id: row.id,
                    },
                    {
                        onSuccess: () => {
                            Swal.fire(
                                "Berhasil!",
                                "Pesanan berhasil dibatalkan.",
                                "success"
                            );
                        },
                    }
                );
            }
        });
    };
    const deletePesanan = (row) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Anda tidak dapat mengembalikan pesanan yang telah dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus pesanan!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("delete-order", {
                        id: row.id,
                    }),
                    {
                        onSuccess: () => {
                            Swal.fire(
                                "Berhasil!",
                                "Pesanan berhasil dihapus.",
                                "success"
                            );
                        },
                    }
                );
            }
        });
    };
    const lihatPesanan = (row) => {
        router.visit(
            route("show-detail-pesanan", {
                kd_pesanan: row.kd_pesanan,
            })
        );
    };

    const konfirmasiPesanan = (row) => {
        Swal.fire({
            title: "Apakah pesanan telah selesai",
            text: "Update pesanan menjadi selesai",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Selesaikan pesanan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("admin.update-pesanan-diterima", {
                        id: row.id,
                    }),
                    {
                        onSuccess: () => {
                            Swal.fire(
                                "Berhasil!",
                                "Pesanan berhasil menyelesaikan pesanan.",
                                "success"
                            );
                        },
                    }
                );
            }
        });
    };

    return (
        <div ref={pesananRef} className="py-6 px-4">
            {role == "pengunjung" ? (
                <>
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Daftar Pesanan Saya
                    </h3>

                    <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        Silahkan Mengelola Pesanan Anda Disini
                    </h1>
                </>
            ) : (
                <>
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Daftar Pesanan Pelanggan
                    </h3>

                    <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                        Silahkan Mengelola Pesanan Pelanggan Disini
                    </h1>
                </>
            )}
            <DataTable data={pesanan} columns={columns} pagination />
            {role !== "pengunjung" && (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                        Statistik Jumlah Pesanan
                    </h3>
                    <div className="flex w-full justify-between gap-3 py-12 lg:px-8 md:px-4 sm:px-2">
                        <div>
                            <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                                Statistik Jumlah Pesanan 1 Tahun Terakhir
                            </h3>
                            <Bar
                                className="h-[300px]"
                                data={{
                                    labels: totalPesananBulan.map(
                                        (item) => `${item.month}/${item.year}`
                                    ),
                                    datasets: [
                                        {
                                            label: "Total Pesanan",
                                            data: totalPesananBulan.map(
                                                (item) => item.total
                                            ),
                                            backgroundColor:
                                                "rgba(75, 192, 192, 0.6)",
                                            borderColor:
                                                "rgba(75, 192, 192, 1)",
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                        title: {
                                            display: true,
                                            text: "Total Pesanan Per Bulan (12 Bulan Terakhir)",
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="text-blue-950 text-2xl font-medium uppercase tracking-tighter text-center ">
                                Statistik Jumlah Pesanan Pertahun
                            </h3>
                            <Bar
                                className="h-[300px]"
                                data={{
                                    labels: totalPesananTahun.map(
                                        (item) => `Tahun ${item.year}`
                                    ),
                                    datasets: [
                                        {
                                            label: "Total Pesanan",
                                            data: totalPesananTahun.map(
                                                (item) => item.total
                                            ),
                                            backgroundColor:
                                                "rgba(75, 192, 192, 0.6)",
                                            borderColor:
                                                "rgba(75, 192, 192, 1)",
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                        title: {
                                            display: true,
                                            text: "Total Pesanan Per Tahun",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => (
    <Layouts children={page} title={"History Pesanan Saya"} />
);
