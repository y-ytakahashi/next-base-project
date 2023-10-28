import { Box } from "@mui/material";
import { getServerSession } from "next-auth/next";
import type { ReactNode } from "react";
import { options } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  children: ReactNode;
};
export default async function AuthGuard({ children }: Props) {
  const session = await getServerSession(options);
  return <Box>{session ? <Box>{children}</Box> : <Box>is not login</Box>}</Box>;
}
