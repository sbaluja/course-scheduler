import { LinkType } from "./Navbar.types";

export const pages: Array<LinkType> = [
  {
    name: "home",
    link: "/"
  },
  {
    name: "courses",
    link: "/courses"
  },
  {
    name: "schedule",
    link: "/schedule"
  },
  {
    name: "page4",
    link: "/page4"
  },
  {
    name: "page5",
    link: "/page5"
  },
  {
    name: "page6",
    link: "/page6"
  }
];

export const activeCheck = (path: string, page: string): boolean => {
  let active = false;
  if (path.toLowerCase() === page.toLowerCase()) {
    active = true;
  }
  return active;
};
