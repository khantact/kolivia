import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/Firebase";
export const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
					access_type: "offline",
					prompt: "consent",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				token.id = profile?.sub;
				if (account.refresh_token) {
					token.refreshToken = account.refresh_token;
					await setDoc(doc(db, "users", token.id), {
						refreshToken: token.refreshToken,
					});
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
};

export function loginIsRequired() {
	const router = useRouter();
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/");
		},
	});
}
