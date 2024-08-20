import clsx from "clsx";
import { Menu } from "lucide-react";
// import IconBurger from "@/components/svgs/burger";

type Props = {
  className?: string;
};

const Header = ({ className = "" }: Props) => {
  return (
    <header
      className={clsx(
        "flex flex-row items-center justify-start",
        className,
        "bg-brand-200 h-16 w-full px-4",
      )}
    >
      <button type="button" className="border border-transparent p-1">
        <Menu />
      </button>
      Header
    </header>
  );
};

export default Header;
