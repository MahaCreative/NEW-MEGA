import InputText from "@/Components/InputText";
import InputUang from "@/Components/InputUang";
import SelectComponents from "@/Components/Select";

import { useForm, usePage } from "@inertiajs/react";
import { Cancel } from "@mui/icons-material";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

export default function FormGalery({ onClose, role }) {
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        judul_galery: "",
        tanggal_foto: "",
        gambar: "",
        nama_pengunjung: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah galery Baru?",
            text: "Apakah anda ingin menambah galery " + data.judul_galery,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "tambahkan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.create-galery"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menambah 1 galery baru",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menambah 1 galery",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    useEffect(() => {
        setData({
            ...data,
            user_id: role == "admin" ? "" : auth.user.id,
            nama_pengunjung:
                role == "admin"
                    ? ""
                    : auth.user.firstname + " " + auth.user.lastname,
        });
    }, [role]);
    return (
        <form onSubmit={submitHandler}>
            <div className="w-full grid grid-cols-2  gap-3">
                <InputText
                    label={"Judul Galery"}
                    name={"judul_galery"}
                    error={errors.judul_galery}
                    value={data.judul_galery}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    disabled={role == "admin" ? false : true}
                    label={"Nama Pengunjung"}
                    name={"nama_pengunjung"}
                    error={errors.nama_pengunjung}
                    value={data.nama_pengunjung}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    label={"Tanggal Foto"}
                    name={"tanggal_foto"}
                    error={errors.tanggal_foto}
                    value={data.tanggal_foto}
                    type="date"
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
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
