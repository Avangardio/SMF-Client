import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientAPI from '../../../ClientAPI';
import {authLink, callbackUrl} from "../../../LINKS";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: clientAPI.clientId,
            clientSecret: clientAPI.clientSecret
        }),
        // ...add more providers here
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${callbackUrl}/api/auth/complete`;
        },
        async jwt({token, account}) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    },
    secret: process.env.SECRET
});