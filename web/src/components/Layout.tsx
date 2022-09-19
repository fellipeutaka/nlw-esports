import { ReactNode } from "react";

import Head from "next/head";

interface LayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Layout({ title, description, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </>
  );
}
