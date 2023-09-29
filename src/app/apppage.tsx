import Image, { StaticImageData } from "next/image";
import { AppTypes } from "./apps-manifest";

type AppPageProps = {
  apps: AppTypes[];
  edit: boolean;
  handleDelete?: Function;
  setModal?: Function;
};

export default function AppPage({
  apps,
  edit,
  handleDelete,
  setModal,
}: AppPageProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-6 grid-flow-row gap-8 p-8 items-center">
        {apps.length > 0
          ? apps.map((app: AppTypes) => (
              <AppItem
                name={app.name}
                icon={app.icon}
                url={app.url}
                edit={edit}
                handleDelete={handleDelete}
                key={app.name}
              ></AppItem>
            ))
          : null}

        {edit ? (
          <div onClick={() => (setModal ? setModal(true) : null)}>
            <div className="relative aspect-square w-[120px]">
              <div className="icon-plus cursor-pointer text-5xl hover:text-blue-500 transition-all duration-75"></div>
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
  edit?: boolean;
  handleDelete?: Function;
  active?: boolean;
};

function AppItem({
  name,
  icon,
  url,
  edit,
  handleDelete,
  active,
}: AppItemProps) {
  return (
    <a
      href={typeof url === "string" ? url : "#"}
      onClick={() => (typeof url === "function" ? url(name) : null)}
    >
      <div
        className={`${
          active ? "outline bg-white/[15%]" : null
        } group relative w-[120px] transition-all duration-75 hover:outline outline-4 outline-blue-500 hover:bg-white/[15%] rounded-2xl`}
      >
        {edit ? (
          <div
            onClick={() => {
              handleDelete ? handleDelete(name) : null;
            }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-75 absolute -top-3 -right-3 aspect-square w-8 bg-red-500 rounded-full"
          >
            <div className="icon-cross"></div>
          </div>
        ) : null}
        {icon ? <Image src={icon} alt={name} /> : null}
      </div>
    </a>
  );
}

export { AppItem };
