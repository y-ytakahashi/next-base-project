import { Box } from "@mui/material";
import { GoogleSignInButton } from "@/components/auth/googleSignInButton";

export default async function SignIn() {
  return (
    <Box>
      <GoogleSignInButton />
    </Box>
  );
}
