<!-- <script lang="ts">
import { authClient } from "$lib/auth-client";
import { onMount } from "svelte";
import { goto } from "$app/navigation";

const session = authClient.useSession();

onMount(() => {
    if (!$session?.data) {
        goto("/login");
    }
});
</script>

{#if $session?.data}
    <h1>User Settings</h1>
    <p>Welcome, {$session.data.user?.email || 'User'}! (placeholder content)</p>
{/if} -->

<script lang="ts">
  import { authClient } from "$lib/auth-client";
  const session = authClient.useSession();
</script>
    <div>
      {#if $session.data}
        <div>
          <p>
            {$session?.data?.user.name}
          </p>
          <button
            on:click={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      {:else}
        <button
          on:click={async () => {
            window.location.href = window.location.origin + "/login";
          }}
        >
          Click here to go to Sign In page
        </button>
      {/if}
    </div>