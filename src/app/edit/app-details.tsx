import { useState, FormEvent } from "react";
import { AppTypes } from "../apps-manifest";

type AppDetailsProps = {
  activeApp: AppTypes | undefined;
};

export default function AppDetails({ activeApp }: AppDetailsProps) {
  return (
    <div>
      {activeApp ? (
        <>
          <h1 className="py-5 text-xl">App Details</h1>
          <form className="flex flex-col">
            <AppDetailsField
              label="Name"
              value={activeApp.name}
              width="[12rem]"
            />
            <AppDetailsField label="URL" value={activeApp.url} width="sm" />
          </form>
        </>
      ) : null}
    </div>
  );
}

type AppDetailsFieldProps = {
  label: string;
  value: string;
  width?: string;
};

function AppDetailsField({ label, value, width }: AppDetailsFieldProps) {
  const [textValue, setTextValue] = useState<string>(value);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setTextValue(event.currentTarget.value);
  }

  return (
    <>
      <label className="pb-1">{label}</label>
      <input
        className={`transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 max-w-${width} rounded-xl`}
        type="text"
        id="name"
        onChange={handleChange}
        value={textValue}
      ></input>
    </>
  );
}
