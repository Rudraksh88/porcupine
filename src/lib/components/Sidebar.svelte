<script>
    let { sidebarState } = $props();
    import {
	blur,
	crossfade,
	draw,
	fade,
	fly,
	scale,
	slide
} from 'svelte/transition';
    // $inspect(sidebarState, "sidebarState");
</script>

<div class="h-full w-full rounded-md overflow-visible">
    <div class="flex flex-col items-center opacity-100 h-full transition-all ease-in-out pt-1 gap-1 text-neutral-800">
        <div class=" flex items-center justify-center py-1 {sidebarState ? 'w-full': 'size-8'} hover:bg-neutral-200/60 hover:cursor-pointer rounded-md transition-all duration-200 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house transition-all duration-200 ease-out size-5 will-change-transform transform-gpu {sidebarState? '-ml-52': ''}"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            {#if sidebarState}
                <div class="ml-2 font-medium transition-all duration-500 ease-out tracking-tight">Home</div>
            {/if}
        </div>
        <div class=" flex items-center justify-center py-1 {sidebarState ? 'w-full': 'size-8'} hover:bg-neutral-200/60 hover:cursor-pointer rounded-md transition-all duration-200 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2-icon lucide-table-2 transition-all duration-200 ease-out size-5 will-change-transform transform-gpu {sidebarState? '-ml-52': ''}"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
            {#if sidebarState}
                <div class="ml-2 font-medium transition-all duration-500 ease-out tracking-tight">Table</div>
            {/if}
        </div>
    </div>
</div>