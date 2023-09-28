import { useState, MouseEventHandler } from "react";
import { apps, AppTypes } from "./apps-manifest";
import AppLibrary from "./app-library";

type ModalProps = {
  show: boolean;
  setShow: Function;
};

export default function Modal({ show, setShow }: ModalProps) {
  const [activeApp, setActiveApp] = useState<AppTypes | null>(null);

  const modalFadeDuration = 300;

  function cancelModal() {
    setShow();
    setTimeout(() => setActiveApp(null), modalFadeDuration);
  }

  function setActive(name: string) {
    setActiveApp(apps.find((app: AppTypes) => app.name === name) ?? null);
  }
  return (
    <div
      className={`${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      } z-10 fixed flex justify-center items-center w-full h-full bg-black/50 transition-all duration-${modalFadeDuration}`}
    >
      <div className="flex flex-col items-center p-5 bg-zinc-900 rounded-2xl">
        <div className="p-5 flex flex-col transition-all">
          <AppLibrary url={setActive} active={activeApp} />
          <AppDetails activeApp={activeApp} />
        </div>
        <ActionRow save={setShow} cancel={cancelModal} />
      </div>
    </div>
  );
}

type AppDetailsProps = {
  activeApp: AppTypes | null;
};

function AppDetails({ activeApp }: AppDetailsProps) {
  return (
    <div>
      {activeApp ? (
        <>
          <h1 className="py-5 text-xl">App Details</h1>
          <form className="flex flex-col">
            <label className="pb-1">Name</label>
            <input
              className="transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 max-w-[12rem] rounded-xl"
              type="text"
              id="name"
              value={activeApp.name}
            ></input>
            <label className="pb-1">URL</label>
            <input
              className="transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 max-w-sm rounded-xl"
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
