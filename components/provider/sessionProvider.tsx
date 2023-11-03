"use client";

import { SessionProvider } from "next-auth/react";

import type { FC, PropsWithChildren } from "react";

export const AppSessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
