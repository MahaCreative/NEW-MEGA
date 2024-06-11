import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function FormSlider() {
    const { data, setData, post, reset, errors } = useForm({
        image: "",
        title: "",
        tagline: "",
    });
    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah slider baru?",
            text: "Apakah menambah 1 slider baru?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambah",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create-slider"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Succes!",
                            text: "Berhasil menambah 1 slider baru",
                            icon: "success",
                        });
                        reset();
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "Gagal menambahkan slider baru",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <form onSubmit={submit} className="flex flex-col gap-3">
            <h3 className="text-blue-950">Tambah Slider Baru</h3>
            <InputText
                label={"Judul Slider"}
                name="title"
                value={data.title}
                error={errors.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <InputText
                label={"Tagline Slider"}
                name="tagline"
                value={data.tagline}
                error={errors.tagline}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
            />
            <InputText
                text={"Image Slider"}
                name="image"
                type="file"
                error={errors.image}
                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />

            <button className="bg-blue-500 p-1 text-white">Submit</button>
        </form>
    );
}
