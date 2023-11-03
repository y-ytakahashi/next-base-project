import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/authGuard";
// import Article from "@/components/example/article";
import { AppSessionProvider } from "@/components/provider/sessionProvider";

type Props = {
  children: ReactNode;
};
const ExampleLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <Box>
        <Typography variant="h1">Example Layout</Typography>
        <AppSessionProvider>{children}</AppSessionProvider>
      </Box>
      {/* TODO sessionについては別issueで調査*/}
      {/*<Article />*/}
    </AuthGuard>
  );
};
export default ExampleLayout;
