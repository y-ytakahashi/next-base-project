import type { Session } from "next-auth";

const Article = async (session?: Session) => {
  return <div>{session?.user?.name}</div>;
};
export default Article;
