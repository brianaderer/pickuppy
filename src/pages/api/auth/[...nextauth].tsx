import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
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
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
    ],
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    }
})