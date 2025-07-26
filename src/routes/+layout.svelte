<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();

	let sidebarState = $state(false);
	let flexClass = $state('flex-[.2]');
</script>

<!-- Bouncy Cubic Bezier -->
<div class="background-container flex min-w-screen min-h-screen bg-neutral-100 *:transition-all *:ease-cubic-bezier(0.25, 0.1, 0.25, 1) rounded-lg">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="sidebar-container p-2 select-none group/sidebar spring-transition {sidebarState ? 'flex-[.2]' : 'flex-[.028]'}"
		onclick={() => {
			sidebarState = !sidebarState;
		}}
	>
		<Sidebar/>
	</div>
	<div class="content-container flex-1 p-2 pl-0">
		<div class="h-full w-full p-3 px-5 bg-white border-2 border-neutral-300/60 rounded-md shadow-xl shadow-[#000000005]">
			{@render children()}
		</div>
	</div>
</div>

<style>
.spring-transition {
	transition: flex 1050ms linear(0, 0.047665487349415225, 0.16760867250925093, 0.32828759624209514, 0.5035255537397554, 0.6733354159847009, 0.8239491027982078, 0.9472773869583244, 1.0400120704591855, 1.1025540666473026, 1.1379140236250675, 1.150692569983367, 1.1462093844070602, 1.1298170242445091, 1.1064084744721436, 1.080107327983694, 1.0541162057053923, 1.0306917368237911, 1.0112120791736428, 0.9963043604466211, 0.986003363657431, 0.9799181807397408, 0.9773895110625852, 0.9776260914878324, 0.9798139280546644, 0.9831962682546052, 0.9871254840793293, 0.99109023543049, 0.9947225483602016, 0.9977899266945391, 1.0001774990066643, 1.001864668350672, 1.0028999476902742, 1, 1);
}
</style>