import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating, colors, styled } from "@mui/material";
import React from "react";
const Styled = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "red",
    },
    "& .MuiRating-iconHover": {
        color: "blue",
    },
});
export default function StyledRating({ ...props }) {
    return (
        <div>
            <Styled
                {...props}
                icon={<Favorite fontSize="large" color="inherit" />}
                emptyIcon={
                    <div className="text-blue-500">
                        <FavoriteBorder fontSize="large" color="inherit" />
                    </div>
                }
            />
        </div>
    );
}
