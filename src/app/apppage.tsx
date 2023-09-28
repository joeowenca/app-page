import Image, { StaticImageData } from "next/image";

type AppPageProps = {
  edit: boolean;
  setModal?: Function;
};

export default function AppPage({ edit, setModal }: AppPageProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="p-5">
        {edit ? (
          <div onClick={() => (setModal ? setModal(true) : null)}>
            <AppItem name="Edit" edit={true} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

type AppItemProps = {
  name: string;
  icon?: StaticImageData;
  url?: string | Function;
  edit?: boolean;
  active?: boolean;
};

function AppItem({ name, icon, url, edit, active }: AppItemProps) {
  return (
    <a
      href={typeof url === "string" ? url : "#"}
      onClick={() => (typeof url === "function" ? url(name) : null)}
    >
      <div
        className={`${edit ? "icon-plus w-auto" : null} ${
          active ? "outline bg-white/[15%]" : null
        } text-5xl w-[120px] cursor-pointer transition-all duration-75 hover:outline outline-4 outline-blue-500 hover:bg-white/[15%] rounded-2xl`}
      >
        {edit ? null : icon ? <Image src={icon} alt={name} /> : null}
      </div>
    </a>
  );
}

export { AppItem };
