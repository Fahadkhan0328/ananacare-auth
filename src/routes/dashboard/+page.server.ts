import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth'; 
import type { PageServerLoad } from './$types'; 

export const load: PageServerLoad = async ({ request, cookies }) => {
    let authResult = null;
    
    try {
        authResult = await auth.api.getSession({
            headers: request.headers
        });
    } catch (err) {
        console.error("Session verification failed:", err);
        // Clean up corrupted tokens just in case
        cookies.delete('better-auth.session_token', { path: '/' });
    }

    // 1. Kick out unauthenticated users
    if (!authResult || !authResult.session) {
        throw redirect(302, '/login');
    }

    // 2. Pass the user data (including role) to the dashboard UI
    return {
        user: authResult.user
    };
};