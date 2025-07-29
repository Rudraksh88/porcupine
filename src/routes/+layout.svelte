<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();

	let sidebarState = $state(false);
</script>

<!-- Bouncy Cubic Bezier -->
<div class="background-container flex overflow-visible min-w-screen min-h-screen bg-neutral-100 transition-all ease-cubic-bezier(0.25, 0.1, 0.25, 1) rounded-lg">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="sidebar-container p-2 overflow-visible select-none group/sidebar spring-transition transform-gpu will-change-transform {sidebarState ? 'w-80' : 'w-12'}"
		onclick={() => {
			sidebarState = !sidebarState;
		}}
	>
		<Sidebar {sidebarState}/>
	</div>
	<div class="content-container flex-1 p-2 pl-0">
		<div class="h-full w-full p-3 px-5 bg-white border-2 border-neutral-300/60 rounded-md shadow-xl shadow-[#000000005]">
			{@render children()}
		</div>
	</div>
</div>

<style>
.spring-transition {
	transition: width 850ms linear(0, 0.04598659284844886, 0.1550978525021358, 0.293435416964683, 0.4378422541508299, 0.5736798672774968, 0.692748833850205, 0.7914734576133282, 0.8694017506567162, 0.9280251869268804, 0.9698937637734765, 0.9979863588386336, 1.0152902865362166, 1.024544165390638, 1.028102233067043, 1.027884258234232, 1.0253819114839424, 1.0216990275613216, 1.0176091156745415, 1.0136185020587367, 1.0100275420648654, 1.0069854535323504, 1.0045366006169996, 1.0026576306325918, 1.0012858767919226, 1.0003400208170226, 0.999734279313089, 1)
}
</style>