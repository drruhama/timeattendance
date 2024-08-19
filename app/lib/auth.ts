import { Lucia } from "lucia";
import adapter from "./db/adapter";
import { cookies } from "next/headers";
import { cache } from "react";
import { TimeSpan } from "lucia";

//import { Adapter } from "lucia";



export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: true,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	sessionExpiresIn: new TimeSpan(20, "m"),
});

//import { lucia } from "@/utils/auth";
//utk mengecek user id dan password utk menvalidasi sebuah session cookies dgn melakukan cache memory atau ditanam kedalam memory cache supaya tdk dipanggil berulang-ulang req ke server
export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return {
		user: null,
		session: null,
	}
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return { user, session };
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
