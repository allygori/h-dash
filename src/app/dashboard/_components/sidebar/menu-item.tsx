"use client";

import clsx from "clsx";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "./menus.constant";
import { ChevronDown } from "lucide-react";
// import IconChevronDown from "@/components/svgs/chevron-down-1";

type Props = {
  item: MenuItem;
};

const MenuItem = ({ item = {} }: Props) => {
  const pathname = usePathname();
  const childRef = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);
  const ParentIcon: React.ReactElement | undefined = Children.only(item.icon);
  const childrenLength = (item.children || []).length;

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  // console.log("pathname", pathname);

  const isActive = (item: any) => {
    // console.log("item", item);
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  useEffect(() => {
    if (open && childRef.current) {
      childRef.current.style.maxHeight = childRef.current.scrollHeight + "px";
    } else if (childRef.current) {
      childRef.current.style.maxHeight = "0px";
    }
  }, [open]);

  return (
    <li className="text-brand-400 w-full text-sm">
      {item.href && childrenLength === 0 ? (
        <Link
          href={item.href}
          className={clsx(
            "mb-2 flex w-full flex-row items-center justify-between py-3 pl-2 pr-4",
            isActive(item)
              ? "bg-brand-200 text-brand-50 overflow-hidden rounded-md font-medium"
              : "hover:overflow-hidden hover:rounded-lg hover:bg-slate-100",
          )}
        >
          <div className="flex flex-row">
            {ParentIcon &&
              cloneElement(ParentIcon, {
                className: clsx(
                  "mr-2",
                  isActive(item) ? "text-brand-50" : "text-brand-300",
                ),
              })}
            <span>{item.text}</span>
          </div>
        </Link>
      ) : (
        <div
          onClick={toggleOpen}
          className={clsx(
            "flex w-full cursor-pointer flex-row items-center justify-between py-3 pl-2 pr-4",
            isActive(item)
              ? "bg-brand-200 text-brand-50 overflow-hidden rounded-md font-medium"
              : "hover:overflow-hidden hover:rounded-lg hover:bg-slate-100",
          )}
        >
          <div className="flex flex-row">
            {ParentIcon &&
              cloneElement(ParentIcon, {
                className: clsx(
                  "mr-2",
                  isActive(item) ? "text-brand-50" : "text-brand-300",
                ),
              })}
            <span>{item.text}</span>
          </div>
          <ChevronDown
            className={clsx(
              "transition-transform delay-150 ease-in-out",
              open ? "-rotate-180" : "rotate-0",
            )}
          />
        </div>
      )}

      <ul
        key={`${item.text}-child`}
        ref={childRef}
        role="menuitem"
        aria-expanded={open}
        className={clsx(
          "m-0 overflow-hidden p-0 transition-[max-height] delay-150 ease-in-out",
          open ? "" : "max-h-0",
        )}
      >
        {(item?.children || []).map((child, idx) => {
          const ChildIcon: React.ReactElement | undefined = Children.only(
            child.icon,
          );

          return (
            <li
              key={`${child.text}-${idx}`}
              className="text-brand-400 flex w-full flex-row items-center text-sm"
            >
              {child.href ? (
                <Link
                  href={child.href}
                  className={clsx(
                    "hover:text-brand-400 flex w-full flex-row py-3 pl-6 pr-4 hover:text-opacity-80",
                    isActive(child) ? "text-brand-400 font-medium" : "",
                  )}
                >
                  {ChildIcon &&
                    cloneElement(ChildIcon, {
                      className: clsx(
                        "mr-2 text-brand-500",
                        isActive(child) ? "fill-brand-500" : "fill-transparent",
                      ),
                    })}
                  <span>{child.text}</span>
                </Link>
              ) : (
                <div
                  className={clsx(
                    "hover:text-brand-400 flex w-full flex-row p-2 hover:text-opacity-80",
                    isActive(child) ? "text-brand-400 font-medium" : "",
                  )}
                >
                  {ChildIcon &&
                    cloneElement(ChildIcon, {
                      className: clsx(
                        "mr-2 text-brand-500",
                        isActive(child) ? "fill-brand-500" : "fill-transparent",
                      ),
                    })}
                  <span>{child.text}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default MenuItem;
