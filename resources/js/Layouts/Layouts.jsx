import { Head, router, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuLink from "@/Components/MenuLink";
import { ShoppingCart, Widgets } from "@mui/icons-material";
import "animate.css/animate.compat.css";
import Login from "@/Pages/Login";
import { Badge, Fab } from "@mui/material";
import { Link } from "react-scroll";
export default function Layouts({ children, title }) {
    const { jumbotron } = usePage().props;
    const { auth } = usePage().props;
    const { cart } = usePage().props;
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (auth.user) {
            setRole(auth.user.role);
        }
    }, [auth]);
    const menuRef = useRef();
    var settings = {
        autoplay: true,
        autplaySpeed: 200,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
    };
    const [isFixed, setIsFixed] = useState(false);
    const showDetailPesanan = () => {
        router.visit(
            route("show-detail-pesanan", { kd_pesanan: cart.kode_pesanan })
        );
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                // Ubah nilai 100 sesuai dengan kebutuhan Anda
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Head title={title} />

            <div className="relative max-w-full overflow-x-hidden">
                {/* navbar desktop*/}
                <div
                    ref={menuRef}
                    className={`${
                        isFixed
                            ? "fixed bg-blue-950/30 backdrop-blur-sm"
                            : "absolute"
                    } hidden md:block  top-0 left-0 w-full text-white z-[50] transition-all duration-300 ease-in-out`}
                >
                    <div className="w-full flex justify-between px-4 md:px-8 lg:px-16 items-center">
                        <div className="py-3">
                            <h1 className="font-light text-xl tracking-tighter leading-none transition-all duration-300 ease-in-out ">
                                Wisata Mangrove
                            </h1>
                            <h1 className="font-light text-xl tracking-tighter leading-none transition-all duration-300 ease-in-out ">
                                Wai Tumbur
                            </h1>
                        </div>
                        <div className="text-white flex gap-3">
                            <MenuLink
                                title={"Home"}
                                active={route().current("home")}
                                href={route("home")}
                            />

                            <MenuLink
                                title={"Paket Wisata"}
                                active={route().current("paket-wisata")}
                                href={route("paket-wisata")}
                            />
                            <MenuLink
                                title={"Fasilitas Wisata"}
                                active={route().current("fasilitas-wisata")}
                                href={route("fasilitas-wisata")}
                            />
                            <MenuLink
                                title={"Galery"}
                                active={route().current("galery")}
                                href={route("galery")}
                            />
                            <MenuLink
                                title={"Ulasan"}
                                active={route().current("ulasan")}
                                href={route("ulasan")}
                            />

                            {auth.user ? (
                                <>
                                    {role == "pengunjung" && (
                                        <>
                                            <MenuLink
                                                title={"Daftar Pesanan Saya"}
                                                active={route().current(
                                                    "pesanan-saya"
                                                )}
                                                href={route("pesanan-saya")}
                                            />
                                        </>
                                    )}
                                    {role == "admin" && (
                                        <>
                                            <MenuLink
                                                title={"Pesanan Pelanggan"}
                                                active={route().current(
                                                    "admin.daftar-pesanan-pengunjung"
                                                )}
                                                href={route(
                                                    "admin.daftar-pesanan-pengunjung"
                                                )}
                                            />
                                        </>
                                    )}
                                    <MenuLink
                                        title={"Logout"}
                                        active={route().current("logout")}
                                        href={route("logout")}
                                    />
                                </>
                            ) : (
                                <>
                                    <MenuLink
                                        title={"Login"}
                                        active={route().current("login")}
                                        href={route("login")}
                                    />
                                    <MenuLink
                                        title={"Register"}
                                        active={route().current("register")}
                                        href={route("register")}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* navbar mobile */}
                <div
                    ref={menuRef}
                    className={`${
                        isFixed
                            ? "fixed bg-blue-950/30 backdrop-blur-sm"
                            : "absolute"
                    } block md:hidden top-0 left-0 w-full text-white z-[50]`}
                >
                    <div className="w-full flex justify-between px-4 md:px-8 lg:px-16 items-center">
                        <div className="py-3">
                            <h1 className="font-light text-xl tracking-tighter leading-none transition-all duration-300 ease-in-out ">
                                Wisata Mangrove
                            </h1>
                            <h1 className="font-light text-xl tracking-tighter leading-none transition-all duration-300 ease-in-out ">
                                Wai Tumbur
                            </h1>
                        </div>
                        <div
                            onClick={() => setOpen(!open)}
                            className="hover:cursor-pointer hover:bg-white/30 hover:backdrop-blur-sm py-2 px-4 rounded-md"
                        >
                            <Widgets />
                        </div>
                    </div>
                    <div
                        className={`${
                            open ? "" : "hidden"
                        } text-white grid grid-cols-5 gap-3 md:hidden`}
                    >
                        <MenuLink
                            title={"Home"}
                            active={route().current("home")}
                            href={route("home")}
                        />

                        <MenuLink
                            title={"Paket Wisata"}
                            active={route().current("paket-wisata")}
                            href={route("paket-wisata")}
                        />
                        <MenuLink
                            title={"Fasilitas Wisata"}
                            active={route().current("fasilitas-wisata")}
                            href={route("fasilitas-wisata")}
                        />
                        <MenuLink
                            title={"Galery"}
                            active={route().current("galery")}
                            href={route("galery")}
                        />
                        <MenuLink
                            title={"Ulasan"}
                            active={route().current("ulasan")}
                            href={route("ulasan")}
                        />
                        {auth.user ? (
                            <MenuLink
                                title={"Logout"}
                                active={route().current("logout")}
                                href={route("logout")}
                            />
                        ) : (
                            <>
                                <MenuLink
                                    title={"Login"}
                                    active={route().current("login")}
                                    href={route("login")}
                                />
                                <MenuLink
                                    title={"Register"}
                                    active={route().current("register")}
                                    href={route("register")}
                                />
                            </>
                        )}
                    </div>
                </div>
                {/* jumbotron */}

                <Slider {...settings}>
                    {jumbotron.map((item, key) => (
                        <div div key={key} className="relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-950/50">
                                <div className="w-full h-full flex justify-center items-center">
                                    <div>
                                        <h1 className="tracking-tighter text-white text-3xl capitalize font-extralight">
                                            {item.title}
                                        </h1>
                                        <h1 className="tracking-tighter text-white text-xl capitalize font-extralight text-center">
                                            {item.tagline}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[680px]">
                                <img
                                    src={"/storage/" + item.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* container */}
                <div>{children}</div>

                {role == "pengunjung" && (
                    <div className="fixed bottom-[5%] right-4">
                        <Fab
                            onClick={showDetailPesanan}
                            size="small"
                            color="primary"
                            aria-label="add"
                        >
                            <Badge
                                color="secondary"
                                badgeContent={cart ? cart.total : 0}
                            >
                                <ShoppingCart />
                            </Badge>
                        </Fab>
                    </div>
                )}
            </div>
        </>
    );
}
