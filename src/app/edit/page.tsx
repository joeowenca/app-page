"use client";

import { useState, MouseEventHandler } from "react";
import AppPage from "../apppage";

export default function Edit() {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <EditModal show={modal} setShow={setModal} />
      <AppPage edit={true} setModal={setModal} />
    </div>
  );
}

type EditModalProps = {
  show: boolean;
  setShow: Function;
};

function EditModal({ show, setShow }: EditModalProps) {
  return (
    <div
      className={`${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } z-10 fixed flex justify-center items-center w-full h-full transition-opacity`}
    >
      <div className="flex flex-col items-center p-5 bg-blue-950 max-w-2xl rounded-2xl">
        <div className="px-24 py-12">Edit modal</div>
        <div className="flex w-full">
          <div className="flex">
            <Button
              className="hover:bg-blue-800"
              onClick={() => setShow(false)}
            >
              Save
            </Button>
            <Button
              className="text-slate-500 hover:text-white hover:bg-blue-800"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
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
