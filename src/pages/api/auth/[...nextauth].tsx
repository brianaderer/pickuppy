import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

// @ts-ignore
export default NextAuth({
    //@ts-ignore
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.projectId,
            clientEmail: process.env.client_email,
            privateKey: process.env.private_key,
        }),
    }),
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.googleClientID,
            // @ts-ignore
            clientSecret: process.env.googleClientSecret
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
    ],
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    }
})