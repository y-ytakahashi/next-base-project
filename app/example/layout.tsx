import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/authGuard";
type Props = {
  children: ReactNode;
};
const ExampleLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <Box>
        <Typography variant="h1">Example Layout</Typography>
        {children}
      </Box>
    </AuthGuard>
  );
};
export default ExampleLayout;
