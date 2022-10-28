import React from "react";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import { PageContainer } from "./Layout.styled";
import { LayoutProps } from "./Layout.types";

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <PageContainer>
    <Navbar />
    {children}
    <Footer />
  </PageContainer>
);

export default Layout;
