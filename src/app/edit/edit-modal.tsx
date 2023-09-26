import { useState, MouseEventHandler } from "react";
import { defaultApps, DefaultAppTypes } from "./default-apps-manifest";
import { AppItem } from "../apppage";

type EditModalProps = {
  show: boolean;
  setShow: Function;
};

export default function EditModal({ show, setShow }: EditModalProps) {
  const [activeApp, setActiveApp] = useState<DefaultAppTypes | null>(null);

  function setActive(name: string) {
    setActiveApp(
      defaultApps.find((app: DefaultAppTypes) => app.name === name) ?? null
    );
  }
  return (
    <div
      className={`${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      } z-10 fixed flex justify-center items-center w-full h-full bg-black/50 transition-all duration-300`}
    >
      <div className="flex flex-col items-center p-5 bg-zinc-900 rounded-2xl">
        <div className="p-5 flex flex-col transition-all">
          <DefaultApps url={setActive} active={activeApp} />
          <AppDetails activeApp={activeApp} />
        </div>
        <ActionRow save={setShow} cancel={setShow} />
      </div>
    </div>
  );
}

type DefaultAppsProps = {
  url: Function;
  active: DefaultAppTypes | null;
};

function DefaultApps({ url, active }: DefaultAppsProps) {
  return (
    <>
      <h1 className="pb-5 text-xl">Add App</h1>
      <div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
        <div className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto">
          {defaultApps.map((app: DefaultAppTypes) => (
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

type AppDetailsProps = {
  activeApp: DefaultAppTypes | null;
};

function AppDetails({ activeApp }: AppDetailsProps) {
  return (
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
  );
}

type ActionRowProps = {
  save: Function;
  cancel: Function;
};

function ActionRow({ save, cancel }: ActionRowProps) {
  return (
    <div className="flex w-full">
      <div className="flex">
        <Button className="hover:bg-blue-800" onClick={() => save(false)}>
          Save
        </Button>
        <Button
          className="text-zinc-400 hover:text-white hover:bg-blue-800"
          onClick={() => cancel(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

type ButtonProps = {
  className: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: string;
};

function Button({ className, onClick, children }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`p-2 mx-1 hover:cursor-pointer transition-colors rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
