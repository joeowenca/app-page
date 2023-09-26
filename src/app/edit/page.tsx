"use client";

import { useState, MouseEventHandler } from "react";
import AppPage from "../page";

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
      <div className="flex flex-col p-12 bg-blue-950 max-w-2xl rounded-2xl">
        <div className="">Edit modal</div>
        <div className="flex">
          <Button onClick={() => setShow(false)}>Save</Button>
          <Button onClick={() => setShow(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  children: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <div onClick={onClick} className="p-2 hover:cursor-pointer">
      {children}
    </div>
  );
}
