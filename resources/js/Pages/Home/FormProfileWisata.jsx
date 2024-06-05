import InputText from "@/Components/InputText";
import InputUang from "@/Components/InputUang";
import { useForm } from "@inertiajs/react";
import { Cancel } from "@mui/icons-material";
import { TextField, Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

export default function FormProfileWisata({ profile, onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        image: profile.image,
        nama_wisata: profile.nama_wisata,
        alamat_wisata: profile.alamat_wisata,
        deskripsi_wisata: profile.deskripsi_wisata,
        harga_tiket: profile.harga_tiket,
        jam_buka: profile.jam_buka,
        jam_tutup: profile.jam_tutup,
        kontak: profile.kontak,
        hari_buka: profile.hari_buka,
        hari_libur: profile.hari_libur,
        url_lokasi_wisata: profile.url_lokasi_wisata,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Ubah Profile wisata?",
            text: "Apakah anda ingin mengubah profile wisata",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ubah Profile",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin-profile-wisata"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil mengubah profile wisata",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal mengubah profile wisata",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <div className="py-6">
            <h3 className="text-blue-900 text-2xl font-medium uppercase tracking-tighter text-center ">
                Form Profile Wisata
            </h3>
            <h1 className="text-blue-900 text-xl font-extralight uppercase tracking-tighter text-center mb-6 ">
                Halo Admin, Silahkan mengatur profile wisata
            </h1>
            <form action="" onSubmit={submitHandler}>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 my-2">
                    <InputText
                        text={"Nama wisata"}
                        name={"nama_wisata"}
                        error={errors.nama_wisata}
                        value={data.nama_wisata}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        text={"Alamat wisata"}
                        name={"alamat_wisata"}
                        error={errors.alamat_wisata}
                        value={data.alamat_wisata}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Deskripsi wisata"
                        value={data.deskripsi_wisata}
                        error={errors.deskripsi_wisata ? true : false}
                        helperText={errors.deskripsi_wisata}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        className="col-span-2"
                        name="deskripsi_wisata"
                        multiline
                        rows={4}
                        placeholder="Jelaskan sekilas tentang wisata mangrove wai tumbur minimal 50 karakter"
                    />
                </div>
                <div>
                    <InputUang
                        label={"Harga Tiket"}
                        name={"harga_tiket"}
                        error={errors.harga_tiket}
                        value={data.harga_tiket}
                        onValueChange={(value) =>
                            setData({ ...data, harga_tiket: value })
                        }
                        className="w-full block text-black col-span-2"
                    />
                </div>
                <p className="text-red-500 italic mt-3">
                    Kosongkan Jadwal Tutup Jika wisata Memiliki Jadwal Tutup
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 my-2">
                    <InputText
                        text={"Jadwal Buka"}
                        name={"hari_buka"}
                        error={errors.hari_buka}
                        value={data.hari_buka}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        text={"Jadwal Tutup"}
                        name={"hari_libur"}
                        error={errors.hari_libur}
                        value={data.hari_libur}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
                <p className="text-red-500 italic mt-3">
                    Kosongkan Jam Tutup Jika wisata Memiliki Jam Tutup
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 my-2">
                    <InputText
                        text={"Jam Buka"}
                        name={"jam_buka"}
                        error={errors.jam_buka}
                        value={data.jam_buka}
                        type="time"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        text={"Jam Tutup"}
                        name={"jam_tutup"}
                        error={errors.jam_tutup}
                        value={data.jam_tutup}
                        type="time"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>
                <p className="text-red-500 italic mt-3">
                    Untuk mendapatkan URL Lokasi wisata, silahkan buka Google
                    Maps Lalu Pilih Share, dan Pilih Bagikan LINK. Setelah LINK
                    muncul silahkan di Copy dan Pastekan Di Form URL Lokasi
                    Wisata
                </p>
                <InputText
                    text={"Url Lokasi Wisata"}
                    name={"url_lokasi_wisata"}
                    error={errors.url_lokasi_wisata}
                    value={data.url_lokasi_wisata}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    text={"Nomor Kontak wisata (wa)"}
                    name={"kontak"}
                    error={errors.kontak}
                    value={data.kontak}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    text={"Foto wisata"}
                    name={"image"}
                    error={errors.image}
                    type="file"
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.files[0],
                        })
                    }
                />
                <div className="my-4 flex gap-4">
                    <button className="bg-blue-500 text-white text-2xl tracking-tighter leading-none py-2 px-4 font-normal hover:bg-blue-900 transition-all duration-300 ease-linear">
                        Update Profile Wisata
                    </button>
                </div>
            </form>
        </div>
    );
}
