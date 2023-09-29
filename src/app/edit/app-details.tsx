import { useState, useEffect, FormEvent } from "react";
import { AppTypes } from "../apps-manifest";

type AppDetailsProps = {
  activeApp: AppTypes | undefined;
  setActiveApp: Function;
};

export default function AppDetails({
  activeApp,
  setActiveApp,
}: AppDetailsProps) {
  return (
    <div>
      {activeApp ? (
        <>
          <h1 className="py-5 text-xl">App Details</h1>
          <form className="flex flex-col">
            <AppDetailsField
              label="Name"
              defaultValue={activeApp.name}
              activeApp={activeApp}
              setActiveApp={setActiveApp}
              width="[12rem]"
            />
            <AppDetailsField
              label="URL"
              defaultValue={activeApp.url}
              activeApp={activeApp}
              setActiveApp={setActiveApp}
              width="sm"
            />
          </form>
        </>
      ) : null}
    </div>
  );
}

type AppDetailsFieldProps = {
  label: "Name" | "URL";
  defaultValue: string;
  activeApp: AppTypes | undefined;
  setActiveApp: Function;
  width?: string;
};

function AppDetailsField({
  label,
  defaultValue,
  activeApp,
  setActiveApp,
  width,
}: AppDetailsFieldProps) {
  const [textValue, setTextValue] = useState<string>(defaultValue);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setTextValue(event.currentTarget.value);

    if (label === "Name" && activeApp) {
      const newActiveApp: AppTypes = {
        name: event.currentTarget.value,
        url: activeApp.url,
        icon: activeApp.icon,
      };
      setActiveApp(newActiveApp);
    }

    if (label === "URL" && activeApp) {
      const newActiveApp: AppTypes = {
        name: activeApp.name,
        url: event.currentTarget.value,
        icon: activeApp.icon,
      };
      setActiveApp(newActiveApp);
    }
  }

  useEffect(() => {
    setTextValue(defaultValue);
  }, [activeApp]);

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
