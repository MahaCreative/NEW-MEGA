import InputText from "@/Components/InputText";
import Layouts from "@/Layouts/Layouts";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export default function Login() {
    const Login = useRef(null);

    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Login Akun",
            text: "Apakah data yang anda masukkan sudah benar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("login"), {
                    onError: (error) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Login",
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
        Login.current.scrollIntoView({ behavior: "smooth" });
    });
    return (
        <div ref={Login} className="px-8 md:px-16 lg:px-24 ">
            <div className="w-full bg-white py-6 px-4 rounded-md">
                <h3 className="text-blue-950 text-center text-4xl font-bold tracking-tighter">
                    Login Account
                </h3>

                <form
                    onSubmit={submitHandler}
                    action=""
                    className="flex flex-col gap-3 w-full"
                >
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
                        type="password"
                        error={errors.password_confirmation}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-400 px-4 text-white py-2 font-bold rounded-md">
                            Login
                        </button>
                        <Link
                            href={route("register")}
                            className="text-blue-950 hover:text-blue-700 italic"
                        >
                            Register jika belum punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.layout = (page) => <Layouts children={page} title="login" />;
