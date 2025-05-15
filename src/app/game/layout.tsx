import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="main-layout h-full pt-[72px] flexCol gap-4">{children}</div>;
};

export default Layout;
