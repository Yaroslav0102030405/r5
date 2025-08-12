import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
