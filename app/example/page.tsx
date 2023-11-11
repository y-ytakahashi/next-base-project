import { Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { Option } from "@/app/api/auth/[...nextauth]/route";
import { GoogleSignOutButton } from "@/components/auth/googleSignOutButton";

const ExamplePage = async () => {
  const session = await getServerSession(Option);
  console.log(session);
  return (
    <Box>
      ExamplePage
      <Typography variant="h3">{session?.user?.name}</Typography>
      <Typography variant="h3">{session?.user?.email}</Typography>
      <Typography variant="h3">{session?.appAccessToken}</Typography>
      <Typography variant="h3">{session?.idToken}</Typography>
      <Box>
        <GoogleSignOutButton />
      </Box>
    </Box>
  );
};
export default ExamplePage;
