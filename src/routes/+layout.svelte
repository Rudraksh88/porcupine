<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();

	let sidebarState = $state(true);
	let flexClass = $state('flex-[.2]');
</script>

<!-- Bouncy Cubic Bezier -->
<div class="background-container flex min-w-screen min-h-screen bg-neutral-100 *:transition-all  *:ease-cubic-bezier(0.25, 0.1, 0.25, 1) rounded-lg">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="sidebar-container p-2 select-none cursor-pointer group/sidebar {sidebarState ? 'flex-[.2] ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-500' : 'flex-[.028] ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-500'}"
		onclick={() => {
				// Expand
				sidebarState = !sidebarState;
			}}>
		<Sidebar
		/>
	</div>
	<div class="content-container flex-1 p-2 pl-0">
		<div class="h-full w-full p-3 px-5 bg-white border-2 border-neutral-300/60 rounded-md shadow-xl shadow-[#000000005]">
			{@render children()}
		</div>
	</div>
</div>div

<style>

</style>