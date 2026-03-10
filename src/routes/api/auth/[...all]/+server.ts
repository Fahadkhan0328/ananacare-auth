import { auth } from "$lib/server/auth";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ request }: RequestEvent) {
    return auth.handler(request);
}

export async function POST({ request }: RequestEvent) {
    return auth.handler(request);
}