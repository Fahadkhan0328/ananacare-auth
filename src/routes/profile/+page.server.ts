import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ request }) => {
    // 1. Verify the user is logged in
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
        throw redirect(302, '/'); 
    }

    // 2. Mint a fresh, 100% standard JWT specifically for FastAPI!
    // We lock it using your exact BETTER_AUTH_SECRET
    const token = jwt.sign(
        { 
            sub: session.user.id, 
            email: session.user.email, 
            role: session.user.role // This will pass the "admin" role over!
        }, 
        env.BETTER_AUTH_SECRET, 
        { expiresIn: '1h' }
    );

    // 3. Send both the user data AND the new JWT to the frontend page
    return {
        user: session.user,
        token: token
    };
};