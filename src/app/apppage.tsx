import Image, { StaticImageData } from "next/image";
import { AppTypes } from "./apps-manifest";

type AppPageProps = {
  apps: AppTypes[];
  edit: boolean;
  setModal?: Function;
};

export default function AppPage({ apps, edit, setModal }: AppPageProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-6 grid-flow-row gap-8 p-8 items-center">
        {apps.length > 0
          ? apps.map((app: AppTypes) => (
              <AppItem
                name={app.name}
                icon={app.icon}
                url={app.url}
                key={app.name}
              ></AppItem>
            ))
          : null}

        {edit ? (
          <div onClick={() => (setModal ? setModal(true) : null)}>
            <div className="relative aspect-square w-[120px] cursor-pointer transition-all duration-75 hover:outline outline-4 outline-blue-500 hover:bg-white/[15%] rounded-2xl">
              <div className="icon-plus text-5xl"></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type AppItemProps = {
  name: string;
  icon: StaticImageData;
  url: string | Function;
  active?: boolean;
};

function AppItem({ name, icon, url, active }: AppItemProps) {
  return (
    <a
      href={typeof url === "string" ? url : "#"}
      onClick={() => (typeof url === "function" ? url(name) : null)}
    >
      <div
        className={`${
          active ? "outline bg-white/[15%]" : null
        } w-[120px] cursor-pointer transition-all duration-75 hover:outline outline-4 outline-blue-500 hover:bg-white/[15%] rounded-2xl`}
      >
        {icon ? <Image src={icon} alt={name} /> : null}
      </div>
    </a>
  );
}

export { AppItem };
