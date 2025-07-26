<script lang="ts">
    import { authClient } from "$lib/auth-client";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
	import { getSession } from "better-auth/api";

    let inFlight = $state(false);
    let loginSuccess = $state(false);
    let isLoggedIn = $state(false);

    onMount(async () => {
        // const session = await authClient.getSession();

        // if (session?.data) {
        //     // User is already logged in, redirect to user settings or home page
        //     goto("/user-settings");
        //     isLoggedIn = true;
        // }

        // If not logged in, you can handle it here or let the user log in
    });
</script>

<div class="login">
    <h1>Login</h1>
    {#await authClient.getSession() }
        <p>Loading...</p>
    {:then session }
        {#if session?.data}
            <h1>Welcome back, {session.data.user.name || session.data.user.email}!</h1>
        {:else}
            <p>Please log in to continue.</p>
            <form onsubmit={async () => {
                const email = (document.getElementById("email") as HTMLInputElement).value;
                const password = (document.getElementById("password") as HTMLInputElement).value;

                const { data, error } = await authClient.signIn.email(
                    {
                        email,
                        password
                    },
                    {
                        onRequest: (ctx) => {
                            inFlight = true;
                        },
                        onSuccess: (data) => {
                            inFlight = false;
                            console.log("Login successful:", data);
                            // Redirect or perform any post-login actions here

                            // Redirect to home page/user-settings
                            // window.location.href = window.location.origin + "/user-settings";

                        },
                        onError: (error) => {
                            inFlight = false;
                            console.error("Login failed:", error);
                        },
                    }
                )
            }}>
            <label for="email">Email:</label>
            <input type="email" id="email" required value="rudraksh@deeplogicai.tech" />

            <label for="password">Password:</label>
            <input type="password" id="password" value="securepassword123" required />

            <button type="submit">Login</button>

    </form>
            {#if inFlight}
                <p>Logging in...</p>
            {/if}
            {#if loginSuccess}
                <p>Login successful! Redirecting...</p>
            {/if}
        {/if}
    {:catch error }
        <p>Error loading session: {error.message}</p>
    {/await}
</div>