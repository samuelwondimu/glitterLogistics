import React from "react";
import { CircularProgress } from "@mui/material";
import CenterBox from "./CenterBox";

export default function Loading() {
  return (
    <CenterBox height={"90vh"}>
      <CircularProgress color="success" size={70} />
    </CenterBox>
  );
}
