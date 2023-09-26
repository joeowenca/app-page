"use client";

import { useState } from "react";
import { defaultApps, DefaultAppTypes } from "./default-apps-manifest";
import { AppItem } from "../apppage";

export default function DefaultApps() {
  const [activeApp, setActiveApp] = useState<DefaultAppTypes | null>(null);

  function setActive(name: string) {
    setActiveApp(
      defaultApps.find((app: DefaultAppTypes) => app.name === name) ?? null
    );
  }

  return (
    <div className="p-5 flex flex-col transition-all">
      <h1 className="pb-5 text-xl">Add App</h1>
      <div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
        <div className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto">
          {defaultApps.map((app: DefaultAppTypes) => (
            <AppItem
              name={app.name}
              icon={app.icon}
              url={setActive}
              key={app.name}
              active={app === activeApp}
            />
          ))}
        </div>
      </div>
      <div>
        {activeApp ? (
          <>
            <h1 className="py-5 text-xl">App Details</h1>
            <form>
              <label className="pr-3">Name</label>
              <input
                className="transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 rounded-xl"
                type="text"
                id="name"
                value={activeApp.name}
              ></input>
              <br />
              <label className="pr-3">URL</label>
              <input
                className="transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 w-96 rounded-xl"
                type="text"
                id="name"
                value={activeApp.url}
              ></input>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}
