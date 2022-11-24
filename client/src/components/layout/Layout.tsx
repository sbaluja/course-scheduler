import React from "react";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import { PageContainer } from "./Layout.styled";
import { LayoutProps } from "./Layout.types";

const Layout: React.FC<LayoutProps> = ({
  children,
  themeType,
  toggleTheme,
}) => (
  <PageContainer>
    <Navbar themeType={themeType} toggleTheme={toggleTheme} />
    {children}
    <Footer />
  </PageContainer>
);

export default Layout;
