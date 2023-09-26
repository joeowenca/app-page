"use client";

import { useState } from "react";
import { defaultApps, DefaultAppTypes } from "./default-apps-manifest";
import { AppItem } from "../apppage";

export default function DefaultApps() {
  const [apps, setApps] = useState<DefaultAppTypes[]>(defaultApps);

  function setActive(name: string) {
    const updatedApps = structuredClone(apps);

    updatedApps.map((app: DefaultAppTypes) => {
      if (app.name === name) {
        app.active = true;
      } else {
        app.active = false;
      }
    });

    setApps(updatedApps);
  }

  return (
    <div className="p-5 flex flex-col">
      <h1 className="pb-5 text-xl">Default Apps</h1>
      <div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
        <div className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto">
          {apps.map((app: DefaultAppTypes) => (
            <AppItem
              name={app.name}
              icon={app.icon}
              url={setActive}
              key={app.name}
              active={app.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
