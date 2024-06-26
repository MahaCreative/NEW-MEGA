import InputText from "@/Components/InputText";
import Layouts from "@/Layouts/Layouts";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Select from "@/Components/Select";
import { MenuItem } from "@mui/material";
export default function Register() {
    const register = useRef(null);

    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        foto: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            label: "Register Akun",
            text: "Apakah data yang anda masukkan sudah benar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Register",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("register"), {
                    onError: (error) => {
                        Swal.fire({
                            position: "center",
                            label: "Gagal Membuat Akun",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    useEffect(() => {
        register.current.scrollIntoView({ behavior: "smooth" });
    });
    return (
        <div ref={register} className="px-8 md:px-16 lg:px-24 ">
            <div className="w-full bg-white py-6 px-4 rounded-md">
                <h3 className="text-blue-950 text-center text-4xl font-bold tracking-tighter">
                    Register Account
                </h3>

                <form
                    onSubmit={submitHandler}
                    action=""
                    className="flex flex-col gap-3 w-full"
                >
                    <InputText
                        required
                        className="w-full"
                        label={"Nama Depan"}
                        name={"firstname"}
                        error={errors.firstname}
                        value={data.firstname}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        label={"Nama belakang"}
                        name={"lastname"}
                        error={errors.lastname}
                        value={data.lastname}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <InputText
                            className="w-full block"
                            label={"Tempat Lahir"}
                            name={"tempat_lahir"}
                            required
                            error={errors.tempat_lahir}
                            value={data.tempat_lahir}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full block"
                            label={"Tanggal Lahir"}
                            name={"tanggal_lahir"}
                            required
                            error={errors.tanggal_lahir}
                            value={data.tanggal_lahir}
                            type="date"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <Select
                            className="w-full block"
                            label={"Jenis Kelamin"}
                            name={"jenis_kelamin"}
                            required
                            error={errors.jenis_kelamin}
                            value={data.jenis_kelamin}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Pilih Jenis Kelamin</MenuItem>
                            <MenuItem value="laki-laki">laki-laki</MenuItem>
                            <MenuItem value="perempuan">perempuan</MenuItem>
                        </Select>
                        <InputText
                            className="w-full block"
                            label={"Alamat"}
                            name={"alamat"}
                            required
                            error={errors.alamat}
                            value={data.alamat}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full block"
                            label={"Telph (wa)"}
                            required
                            name={"no_hp"}
                            error={errors.no_hp}
                            value={data.no_hp}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full block"
                            label={"Foto"}
                            type="file"
                            name={"foto"}
                            error={errors.foto}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
                                })
                            }
                        />
                    </div>
                    <InputText
                        className="w-full block"
                        required
                        label={"Email"}
                        name={"email"}
                        type="email"
                        error={errors.email}
                        value={data.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full block"
                        required
                        label={"Password"}
                        name={"password"}
                        type="password"
                        error={errors.password}
                        value={data.password}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full block"
                        required
                        label={"Konfirmasi Password"}
                        name={"password_confirmation"}
                        type="password_confirmation"
                        error={errors.password_confirmation}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-950 px-4 text-white py-2 font-bold rounded-md">
                            Register
                        </button>
                        <Link
                            href={route("login")}
                            className="text-blue-950 hover:text-blue-700 italic"
                        >
                            Login jika sudah punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
Register.layout = (page) => <Layouts children={page} title={"Register"} />;
