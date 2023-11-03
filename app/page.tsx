import { Box } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(options);
  console.log("session!");
  console.log(session);
  return (
    <main>
      <Box className={"flex flex-col justify-center items-center"}>
        <Box className={"text-green-500"}>
          <Link href={"/auth/signIn"}>SignIn</Link>
        </Box>
        <Box>
          <Link href={"/example"}>Example</Link>
        </Box>
      </Box>
    </main>
  );
}
