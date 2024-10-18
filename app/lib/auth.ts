import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import client from "./db";
import axios from "axios";
// import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub],
  callbacks: {
    async session({session}: any) {
      const user = await axios.post("http:localhost:3000/api/users", {
        username: session.user.name
      });

      // console.log(user)

      if (user.status === 200) {
        session.user = user.data.exists;
        return session;
      } else if (user.status === 201) {
        session.user = user.data;
        return session;
      } else {
        return session;
      }
    }
  }
});