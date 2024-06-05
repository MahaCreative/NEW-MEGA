import InputText from "@/Components/InputText";
import StyledRating from "@/Components/StyledRating";
import { useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

export default function FormUlasan() {
    const { data, setData, post, errors, reset } = useForm({
        nama_lengkap: "",
        ulasan: "",
        rating: 1,
        foto: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Kirim Ulasan?",
            text: "Terima kasih telah ingin memberikan ulasan kepada kami.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Kirim Ulasan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create-ulasan"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil mengirim ulasan",
                            icon: "success",
                        });
                        reset();
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal mengirim ulasan",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <div className="w-full py-16">
            <h1 className="text-blue-950 text-xl font-bold uppercase tracking-tighter text-left  ">
                Tinggalkan Ulasan Anda
            </h1>
            <h1 className="text-blue-950 text-xl font-extralight uppercase tracking-tighter text-left mb-6 ">
                Ulasan yang anda berikan akan sangat bermanfaat bagi para
                pengunjung lai, terutama bagi kami untuk meningkatkan pelayanan
                kami
            </h1>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-3 my-3 w-full">
                    <InputText
                        label={"Nama Lengkap Anda"}
                        name={"nama_lengkap"}
                        error={errors.nama_lengkap}
                        value={data.nama_lengkap}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        className="w-full block"
                    />
                    <InputText
                        label={"Foto Anda"}
                        name={"foto"}
                        error={errors.foto}
                        type="file"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.files[0],
                            })
                        }
                        className="w-full block"
                    />
                </div>
                <TextField
                    className="w-full"
                    id="outlined-multiline-static"
                    label="Ulasan"
                    value={data.ulasan}
                    error={errors.ulasan ? true : false}
                    helperText={errors.ulasan}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    name="ulasan"
                    multiline
                    rows={4}
                    placeholder="Masukkan Deskripsi Paket"
                />
                <StyledRating
                    errors={errors.rating}
                    value={data.rating}
                    name="simple-controlled"
                    onChange={(event, newValue) => {
                        setData({ ...data, rating: newValue });
                    }}
                />
                <button className="text-white font-normal bg-blue-500 hover:bg-blue-950 py-2 px-4">
                    Kirim Ulasan
                </button>
            </form>
        </div>
    );
}
