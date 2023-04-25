import StorybookIcon from "@/assets/StorybookIcon.png";
type CategoryRowProps = {
  name: string;
};

const CategoryRow = ({ name }: CategoryRowProps) => {
  return (
    <div className="w-full rounded-lg border-2 border-[#EAA916] bg-[#411A08] p-4 text-white">
      <h2>{name}</h2>
      <div className="flex items-center gap-4 overflow-x-scroll">
        <img src={StorybookIcon.src} alt="" className="h-32" />
        <img src={StorybookIcon.src} alt="" className="h-32" />
        <img src={StorybookIcon.src} alt="" className="h-32" />
        <img src={StorybookIcon.src} alt="" className="h-32" />
      </div>
    </div>
  );
};

export default CategoryRow;
