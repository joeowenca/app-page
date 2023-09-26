import { defaultApps, DefaultAppTypes } from "./default-apps-manifest";
import { AppItem } from "../apppage";

export default function DefaultApps() {
  return (
    <div className="p-5 flex flex-col">
      <h1 className="pb-5 text-xl">Default Apps</h1>
      <div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
        <div className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto">
          {defaultApps.map((app: DefaultAppTypes) => (
            <AppItem name={app.name} icon={app.icon} key={app.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
