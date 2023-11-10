import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { AppSessionProvider } from "@/components/provider/sessionProvider";

type Props = {
  children: ReactNode;
};
const TeaserLayout = ({ children }: Props) => {
  return (
    <Container>
      <Typography variant="h1">teaser layout</Typography>
      <Box>{children}</Box>
    </Container>
  );
};
export default TeaserLayout;
