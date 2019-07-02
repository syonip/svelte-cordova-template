<script>
	export let name;
	export let ready = false;

	document.addEventListener("deviceready", () => {
		ready = true;
	})
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
{#if ready}
	<h2>Cordova deviceready fired!</h2>
{:else}
	<h2>Waiting for cordova deviceready</h2>
{/if}