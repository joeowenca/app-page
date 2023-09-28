import { apps, AppTypes } from "./apps-manifest";
import { AppItem } from "../apppage";

type AppLibraryProps = {
  url: Function;
  active: AppTypes | null;
};

export default function AppLibrary({ url, active }: AppLibraryProps) {
  return (
    <>
      <div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
        <div
          id="app-library"
          className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto"
        >
          {apps.map((app: AppTypes) => (
            <AppItem
              name={app.name}
              icon={app.icon}
              url={url}
              key={app.name}
              active={app === active}
            />
          ))}
        </div>
      </div>
    </>
  );
}
