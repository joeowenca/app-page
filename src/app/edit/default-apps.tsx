import { defaultApps, DefaultAppTypes } from "./default-apps-manifest";
import { AppItem } from "../apppage";

export default function DefaultApps() {
  return (
    <div className="p-5 flex flex-col max-h-96">
      <h1 className="pb-5">Default Apps</h1>
      <div className="outline outline-4 outline-zinc-800 rounded-2xl grid grid-cols-4 grid-flow-row gap-4 p-5 overflow-auto">
        {defaultApps.map((app: DefaultAppTypes) => (
          <AppItem name={app.name} icon={app.icon} key={app.name} />
        ))}
      </div>
    </div>
  );
}
