import { ComponentType, ReactElement, ReactNode } from "react";
import { NotepadText, ChartSpline, Home, Dot, Image } from "lucide-react";
// import IconNote from "@/components/svgs/note";
// import IconAnalytic from "@/components/svgs/analytic";
// import IconHome from "@/components/svgs/home";
// import IconDotSquare from "@/components/svgs/dot-square";
// import IconImage from "@/components/svgs/image";

export type MenuItem = {
  // icon?: ({ className }: { className?: string }) => JSX.Element;
  icon?: ReactElement;
  // icon?: ComponentType<{ className?: string}>;
  text?: string;
  href?: string;
  children?: MenuItem[];
};

export type Menu = {
  header?: string;
  items: MenuItem[];
};

export const MENUS: Menu[] = [
  {
    header: "MENU",
    items: [
      {
        icon: <ChartSpline />,
        text: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: <Home />,
        text: "Homepage",
        href: "/dashboard/homepage",
      },
      {
        // eslint-disable-next-line jsx-a11y/alt-text
        icon: <Image />,
        text: "Media Library",
        href: "/dashboard/image",
      },
      {
        icon: <NotepadText />,
        text: "Article",
        href: "#",
        children: [
          {
            icon: <Dot />,
            text: "List",
            href: "/dashboard/articles/list",
          },
          {
            icon: <Dot />,
            text: "Detail",
            href: "/dashboard/articles/detail",
          },
          {
            icon: <Dot />,
            text: "Editor",
            href: "/dashboard/articles/editor",
          },
        ],
      },
      // {
      //   icon: <IconAnalytic />,
      //   text: "eCommerce",
      //   href: "/dashboard/test",
      // },
      // {
      //   icon: <IconAnalytic />,
      //   text: "Marketing",
      //   href: "/dashboard/test1",
      //   children: [
      //     {
      //       icon: <IconAnalytic />,
      //       text: "Google Ads",
      //       href: "/dashboard/test11",
      //     },
      //     {
      //       icon: <IconAnalytic />,
      //       text: "Facebook Ads",
      //       href: "/dashboard/test12",
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   header: "APPS",
  //   items: [
  //     {
  //       icon: <IconAnalytic />,
  //       text: "Contact",
  //       href: "/dashboard/contact",
  //     },
  //     {
  //       icon: <IconAnalytic />,
  //       text: "Blog",
  //       href: "#",
  //       children: [
  //         {
  //           icon: <IconAnalytic />,
  //           text: "Posts",
  //           href: "/dashboard/test21",
  //         },
  //         {
  //           icon: <IconAnalytic />,
  //           text: "Detail",
  //           href: "/dashboard/test22",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
