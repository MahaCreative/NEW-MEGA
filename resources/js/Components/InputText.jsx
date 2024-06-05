import { TextField } from "@mui/material";
import React from "react";
import Select from "./Select";

export default function InputText({ label, text, error, ...props }) {
    return (
        <div className="flex flex-col">
            {text && <p>{text}</p>}
            <TextField
                helperText={error}
                error={error ? true : false}
                label={text ? "" : label}
                {...props}
            />
        </div>
    );
}
