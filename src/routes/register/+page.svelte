<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { onMount } from "svelte";

    let inFlight = $state(false);
    let registerationSuccess = $state(false);
</script>

<div class="register">
    <h1>Register</h1>
    <form onsubmit={async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        const { data, error } = await authClient.signUp.email(
            {
                email,
                password,
                name: "Hi from Svelte" // Optional, can be customized
            },
            {
                onRequest: (ctx) => {
                    inFlight = true;
                },
                onSuccess: (data) => {
                    inFlight = false;
                    registerationSuccess = true;
                    console.log("Registration successful:", data);
                },
                onError: (error) => {
                    inFlight = false;
                    console.error("Registration failed:", error);
                },
            }
        )
    }}>
        <label for="email">Email:</label>
        <input type="email" id="email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" required />

        <button type="submit">Register</button>

        {#if inFlight}
            <p>Registering...</p>
        {/if}
        {#if registerationSuccess}
            <p>Registration successful! Please check your email to confirm.</p>
        {/if}
    </form>
</div>