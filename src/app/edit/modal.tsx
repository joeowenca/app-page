import { useState, MouseEventHandler } from "react";
import { apps, AppTypes } from "../apps-manifest";
import AppLibrary from "./app-library";
import AppDetails from "./app-details";

type ModalProps = {
  title: string;
  show: boolean;
  setShow: Function;
};

export default function Modal({ title, show, setShow }: ModalProps) {
  const [activeApp, setActiveApp] = useState<AppTypes | null>(null);

  const modalFadeDuration = 300;

  function closeModal() {
    setShow(false);

    function closeModalDelayed() {
      setActiveApp(null);
      document.getElementById("app-library")?.scrollTo(0, 0);
    }

    setTimeout(() => closeModalDelayed(), modalFadeDuration);
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
          <h1 className="pb-5 text-xl">{title}</h1>
          <AppLibrary url={setActive} active={activeApp} />
          <AppDetails activeApp={activeApp} />
        </div>
        <ActionRow save={setShow} cancel={closeModal} />
      </div>
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
