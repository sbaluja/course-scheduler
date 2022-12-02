import { ReactNode } from "react";

export type LayoutProps = {
  themeType: string;
  toggleTheme: () => void;
  children: ReactNode;
};
