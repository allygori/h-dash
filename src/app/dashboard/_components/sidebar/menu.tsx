import type { Menu } from "./menus.constant";
import MenuItem from "./menu-item";

type Props = {
  items?: Menu[];
};

const Menu = ({ items = [] }: Props) => {
  return (
    <ul key="parent" className="m-0 p-0">
      {items.map((item, idx) => {
        return (
          <>
            {/* header */}
            <li
              key={`${item.header}`}
              className="w-full py-2 text-xs text-brand-200"
            >
              <span>{item.header}</span>
            </li>
            {/* navs */}
            {item.items.map((menu, index) => {
              return <MenuItem key={`${item.header}-${index}`} item={menu} />;
            })}
          </>
        );
      })}
    </ul>
  );
};

export default Menu;
