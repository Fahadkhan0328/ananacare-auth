import { createAuthClient } from "better-auth/svelte";
import { dev } from '$app/environment';

export const authClient = createAuthClient({
    // Force the frontend to only ever use the clean production URL
    baseURL: dev ? "http://localhost:5173" : "https://ananacare-auth.vercel.app"
});