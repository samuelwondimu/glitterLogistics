import React from "react";

import { Box } from "@mui/material";

export default function CenterBox({
    children,
    height,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: height,
                py: 2
            }}
        >
            {children}
        </Box>
    );
}