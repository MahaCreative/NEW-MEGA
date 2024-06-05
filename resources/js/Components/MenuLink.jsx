import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ href, active, title, ...props }) {
    return (
        <Link
            {...props}
            href={href}
            className={`${
                active ? "bg-white/30 backdrop-blur-sm" : ""
            } text-white text-xs text-center md:text-base hover:bg-white/30 hover:backdrop-blur-sm py-2 px-1 md:px-4 rounded-md duration-300 ease-linear transition-all`}
        >
            {title}
        </Link>
    );
}
