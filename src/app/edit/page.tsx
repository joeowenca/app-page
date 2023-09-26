"use client";

import { useState } from "react";
import AppPage from "../page";

export default function Edit() {
  const [editModal, setEditModal] = useState(false);

  return (
    <AppPage edit={true} editModal={editModal} setEditModal={setEditModal} />
  );
}
