"use client";

import { useState } from "react";
import AppPage from "../apppage";
import Modal from "./modal";

export default function Edit() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Modal show={showModal} setShow={setShowModal} />
      <AppPage edit={true} setModal={setShowModal} />
    </div>
  );
}
