import InputText from "@/Components/InputText";
import InputUang from "@/Components/InputUang";
import SelectComponents from "@/Components/Select";

import { useForm } from "@inertiajs/react";
import { Cancel } from "@mui/icons-material";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export default function FormPaket({ onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_paket: "",
        kategori_sewa: "",
        harga_paket: "",
        deskripsi_paket: "",
        jumlah_max_pesanan: "",
        catatan_paket: "",
        foto_paket: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah Paket Baru?",
            text: "Apakah anda ingin menambah paket " + data.nama_paket,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "tambahkan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.create-paket"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menambah 1 paket",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menambah 1 paket",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <form onSubmit={submitHandler}>
            <div className="w-full grid grid-cols-2  gap-3">
                <InputText
                    label={"Nama Paket"}
                    name={"nama_paket"}
                    error={errors.nama_paket}
                    value={data.nama_paket}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <SelectComponents
                    label={"Kategori Durasi Paket"}
                    name={"kategori_sewa"}
                    error={errors.kategori_sewa}
                    value={data.kategori_sewa}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full block text-black"
                >
                    <MenuItem value="">Pilih Kategori Durasi Paket</MenuItem>
                    <MenuItem value="1 jam">1 Jam</MenuItem>
                    <MenuItem value="1 hari">1 hari</MenuItem>
                    <MenuItem value="1 minggu">1 minggu</MenuItem>
                </SelectComponents>
                <InputUang
                    label={"Kategori Durasi Paket"}
                    name={"harga_paket"}
                    error={errors.harga_paket}
                    value={data.harga_paket}
                    onValueChange={(value) =>
                        setData({ ...data, harga_paket: value })
                    }
                    className="w-full block text-black col-span-2"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Deskripsi Paket"
                    value={data.deskripsi_paket}
                    error={errors.deskripsi_paket ? true : false}
                    helperText={errors.deskripsi_paket}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="deskripsi_paket"
                    multiline
                    rows={4}
                    placeholder="Masukkan Deskripsi Paket"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Catatan Paket"
                    value={data.catatan_paket}
                    error={errors.catatan_paket ? true : false}
                    helperText={errors.catatan_paket}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="catatan_paket"
                    multiline
                    rows={4}
                    placeholder="Masukkan Catatan Paket Minimal 25 Karakter dan Maximal 100 Karakter"
                />
                <InputText
                    text={"Foto Paket"}
                    name={"foto_paket"}
                    error={errors.foto_paket}
                    type="file"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.files[0] })
                    }
                />
                <InputText
                    text={"Jumlah Maximal Paket Di Pesan"}
                    name={"jumlah_max_pesanan"}
                    error={errors.jumlah_max_pesanan}
                    value={data.jumlah_max_pesanan}
                    type="number"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <div className="my-4 flex gap-4">
                <button className="bg-blue-500 text-white text-2xl tracking-tighter leading-none py-2 px-4 font-normal hover:bg-blue-900 transition-all duration-300 ease-linear">
                    Tambah Paket
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onClose(false);
                        reset();
                    }}
                    className="bg-red-500 text-white text-2xl tracking-tighter leading-none py-2 px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                >
                    <Tooltip title={"Batalkan Tambah Paket"}>
                        <Cancel color="inherit" fontSize="inherit" />
                    </Tooltip>
                </button>
            </div>
        </form>
    );
}
