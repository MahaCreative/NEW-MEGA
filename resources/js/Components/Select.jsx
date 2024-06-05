import { FormControl, Select } from "@mui/material";
import React from "react";

export default function SelectComponents({
    children,
    label,
    text,
    error,
    ...props
}) {
    return (
        <FormControl className="w-full">
            {text && <p>{text}</p>}
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                helperText={error}
                error={error ? true : false}
                label={text ? "" : label}
                {...props}
            >
                {children}
            </Select>
        </FormControl>
    );
}
