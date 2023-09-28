"use client";

import { useState } from "react";
import AppPage from "../apppage";
import Modal from "./modal";
import { AppTypes } from "../apps-manifest";

export default function Edit() {
  const [showModal, setShowModal] = useState(false);
  const [apps, setApps] = useState<AppTypes[] | null>(null);

  function addApp(app: AppTypes) {
    if (apps) {
      const newApps = structuredClone(apps);
      newApps.push(app);
      setApps(newApps);
    } else {
      const newApps = [app];
      setApps(newApps);
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
