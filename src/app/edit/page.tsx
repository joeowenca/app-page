"use client";

import { useState } from "react";
import AppPage from "../apppage";
import EditModal from "./edit-modal";

export default function Edit() {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <EditModal show={modal} setShow={setModal} />
      <AppPage edit={true} setModal={setModal} />
    </div>
  );
}
