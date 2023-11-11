import { Box } from "@mui/material";
import { GoogleSignInButton } from "@/components/auth/googleSignInButton";
import { AppSessionProvider } from "@/components/provider/sessionProvider";

export default async function SignIn() {
  return (
    <Box>
      <AppSessionProvider>
        <GoogleSignInButton />
      </AppSessionProvider>
    </Box>
  );
}
