import { ClassNames } from "@emotion/react";
import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function InputUang({ error, label, text, className, ...props }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <p>{label}</p>}
            <CurrencyInput
                prefix="Rp. "
                {...props}
                className={`"border border-gray-400 rounded-md py-2 px-4 `}
            />
            {error && <p className="text-red-500 italic text-xs">{error}</p>}
        </div>
    );
}
