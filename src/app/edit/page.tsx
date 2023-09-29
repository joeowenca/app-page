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

  function deleteApp(id: string) {
    const selectedApp =
      apps.find((app: AppTypes) => app.id === id) ?? undefined;

    if (selectedApp) {
      const index = apps.indexOf(selectedApp);

      const newApps = structuredClone(apps);
      console.log(typeof newApps);
      newApps.splice(index, 1);
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
      <AppPage
        apps={apps}
        edit={true}
        handleDelete={deleteApp}
        setModal={setShowModal}
      />
    </div>
  );
}
