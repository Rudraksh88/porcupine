import { createAuthClient } from "better-auth/svelte"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "https://auth.supedio.com"
    baseURL: process.env.NODE_ENV === 'production'
    ? 'https://auth.supedio.com'
    : 'http://localhost:5173/api/auth/', // Use the proxy in dev

    fetchOptions: {
        credentials: 'include'
    }
})