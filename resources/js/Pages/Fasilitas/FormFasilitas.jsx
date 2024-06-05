import InputText from "@/Components/InputText";
import InputUang from "@/Components/InputUang";
import SelectComponents from "@/Components/Select";

import { useForm } from "@inertiajs/react";
import { Cancel } from "@mui/icons-material";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export default function FormFasilitas({ onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_fasilitas: "",
        keterangan: "",
        gambar: "",
        status: "",
        nama_pemilik: "",
        contact_pemilik: "",
        harga_sewa: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah fasilitas Baru?",
            text: "Apakah anda ingin menambah fasilitas " + data.nama_fasilitas,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "tambahkan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.create-fasilitas"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menambah 1 fasilitas",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menambah 1 fasilitas",
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
                    label={"Nama fasilitas"}
                    name={"nama_fasilitas"}
                    error={errors.nama_fasilitas}
                    value={data.nama_fasilitas}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    label={"Nama Pemilik"}
                    name={"nama_pemilik"}
                    error={errors.nama_pemilik}
                    value={data.nama_pemilik}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    label={"Kontak Pemilik (WA)"}
                    name={"contact_pemilik"}
                    error={errors.contact_pemilik}
                    value={data.contact_pemilik}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <SelectComponents
                    label={"Status Sewa"}
                    name={"status"}
                    error={errors.status}
                    value={data.status}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full block text-black"
                >
                    <MenuItem value="">Pilih Status Sewa</MenuItem>
                    <MenuItem value="gratis">gratis</MenuItem>
                    <MenuItem value="sewa">sewa</MenuItem>
                </SelectComponents>
                {data.status == "sewa" && (
                    <InputUang
                        label={"Harga Sewa"}
                        name={"harga_sewa"}
                        error={errors.harga_sewa}
                        value={data.harga_sewa}
                        onValueChange={(value) =>
                            setData({ ...data, harga_sewa: value })
                        }
                        className="w-full block text-black col-span-2"
                    />
                )}
                <TextField
                    id="outlined-multiline-static"
                    label="Keterangna Fasilitas"
                    className="col-span-2"
                    value={data.keterangan}
                    error={errors.keterangan ? true : false}
                    helperText={errors.keterangan}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="keterangan"
                    multiline
                    rows={4}
                    placeholder="Masukkan Keterangan fasilitas Minimal 25 Karakter dan Maximal 100 Karakter"
                />
                <InputText
                    text={"Foto fasilitas"}
                    name={"gambar"}
                    error={errors.gambar}
                    type="file"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.files[0] })
                    }
                />
            </div>
            <div className="my-4 flex gap-4">
                <button className="bg-blue-500 text-white text-2xl tracking-tighter leading-none py-2 px-4 font-normal hover:bg-blue-900 transition-all duration-300 ease-linear">
                    Tambah fasilitas
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onClose(false);
                        reset();
                    }}
                    className="bg-red-500 text-white text-2xl tracking-tighter leading-none py-2 px-4 font-bold hover:bg-red-800 transition-all duration-300 ease-linear"
                >
                    <Tooltip title={"Batalkan Tambah fasilitas"}>
                        <Cancel color="inherit" fontSize="inherit" />
                    </Tooltip>
                </button>
            </div>
        </form>
    );
}
