// 1. Add the SvelteKit environment import
import { dev } from '$app/environment'; 
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt } from "better-auth/plugins"; 
// ADD THIS: Import the infrastructure plugin
import { dash } from "@better-auth/infra"; 
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { env } from "$env/dynamic/private";

const connectionString = env.DATABASE_URL;

// Strip query parameters so the pg driver doesn't crash from sslmode=require
const safeConnectionString = connectionString.split('?')[0];

const pool = new pg.Pool({ 
    connectionString: safeConnectionString,
    ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }
    },
    
    baseURL: dev ? "http://localhost:5173" : "https://ananacare-auth.vercel.app",
    
    advanced: {
        // crossSiteReflection removed to fix the Type Error
    },
   trustedOrigins: [
        "https://ananacare-auth.vercel.app",
        "http://localhost:5173",
        "https://dash.better-auth.com" // ADD THIS LINE so the dashboard is allowed to connect
    ],

    secret: env.BETTER_AUTH_SECRET,
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: false 
            }
        }
    },
    plugins: [
        jwt(),
        // ADD THIS: The bridge to your Pro Dashboard
        dash({
            apiKey: env.BETTER_AUTH_API_KEY
        })
    ]
});