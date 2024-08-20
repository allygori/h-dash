import clsx from "clsx";
import Menu from "./menu";
import { MENUS } from "./menus.constant";

type Props = {
  className?: string;
};

const Sidebar = ({ className = "" }: Props) => {
  return (
    <aside
      className={clsx("h-full min-h-full w-[265px] bg-white", className)}
      style={{
        // boxShadow: "rgba(113, 122, 131, 0.11) 0px 7px 30px 0px",
        // boxShadow: "5px 3px 38px 11px #000000",
        borderRight: "1px solid rgb(234, 234, 239)",
      }}
    >
      <header className="flex h-16 w-full items-center justify-start px-4 text-2xl font-medium text-brand-400">
        HALAMAN
      </header>
      <main className="h-full min-h-screen p-4">
        <Menu items={MENUS} />
      </main>
    </aside>
  );
};

export default Sidebar;
