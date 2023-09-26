type AppPageProps = {
  edit: boolean;
};

export default function AppPage({ edit }: AppPageProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="p-5">{edit ? <AppItem /> : ""}</div>
    </div>
  );
}

function AppItem() {
  return (
    <div className="icon-plus text-5xl p-8 cursor-pointer transition-all duration-75 hover:outline outline-4 outline-blue-500 hover:bg-white/[15%] rounded-2xl"></div>
  );
}
