"use client";

import { useState } from "react";
import AppPage from "../apppage";
import Modal from "./modal";
import { AppTypes } from "../apps-manifest";

export default function Edit() {
  const [showModal, setShowModal] = useState(false);
  const [apps, setApps] = useState<AppTypes[]>([]);

  function addApp(app: AppTypes) {
    if (app) {
      apps.push(app);
      setApps(apps);
    }
  }

  return (
    <div>
      <Modal
        title="Add App"
        show={showModal}
        setShow={setShowModal}
        save={addApp}
      />
      <AppPage apps={apps} edit={true} setModal={setShowModal} />
    </div>
  );
}
