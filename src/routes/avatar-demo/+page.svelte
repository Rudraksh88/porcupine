<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';

  let showControls = true;
  let avatarSize = 120;
  let customColors: string[] = [];

  function updateCustomColor(index: number, color: string) {
    // This would need to be implemented with a reactive statement
    // For now, the colors are set statically in the component
  }
</script>

<svelte:head>
  <title>Avatar Component Demo</title>
</svelte:head>

<div class="container">
  <h1>🎨 Avatar Component Demo</h1>

  <div class="demo-section">
    <h2>Basic Avatar (Random Colors)</h2>
    <div class="avatar-grid">
      <Avatar size={64} />
      <Avatar size={80} />
      <Avatar size={120} />
      <Avatar size={160} />
    </div>
  </div>

  <div class="demo-section">
    <h2>Interactive Avatar with Controls</h2>
    <div class="interactive-demo">
      <Avatar size={avatarSize} showControls={showControls} />

      <div class="settings">
        <label>
          <input type="checkbox" bind:checked={showControls} />
          Show Controls
        </label>

        <label>
          Size: {avatarSize}px
          <input
            type="range"
            min="32"
            max="200"
            bind:value={avatarSize}
          />
        </label>
      </div>
    </div>
  </div>

  <div class="demo-section">
    <h2>Custom Colors</h2>
    <div class="custom-colors">
      <Avatar
        size={100}
        colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
        showControls={true}
      />

      <div class="color-inputs">
        <h3>Set Custom Colors:</h3>
        <div class="color-input-group">
          <input type="color" value="#FF6B6B" on:change={(e) => updateCustomColor(0, (e.target as HTMLInputElement).value)} />
          <input type="color" value="#4ECDC4" on:change={(e) => updateCustomColor(1, (e.target as HTMLInputElement).value)} />
          <input type="color" value="#45B7D1" on:change={(e) => updateCustomColor(2, (e.target as HTMLInputElement).value)} />
          <input type="color" value="#96CEB4" on:change={(e) => updateCustomColor(3, (e.target as HTMLInputElement).value)} />
        </div>
      </div>
    </div>
  </div>

  <div class="demo-section">
    <h2>Multiple Avatars</h2>
    <div class="avatar-grid">
      {#each Array(8) as _, i}
        <Avatar size={80} />
      {/each}
    </div>
  </div>

  <div class="demo-section">
    <h2>Large Avatar with Many Colors</h2>
    <Avatar
      size={200}
      colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']}
      showControls={true}
    />
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .demo-section h2 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .avatar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    align-items: center;
    justify-items: center;
  }

  .interactive-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .settings label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }

  .settings input[type="range"] {
    width: 200px;
  }

  .custom-colors {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .color-inputs {
    text-align: center;
  }

  .color-inputs h3 {
    margin-bottom: 1rem;
    color: #555;
  }

  .color-input-group {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .color-input-group input[type="color"] {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .color-input-group input[type="color"]:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .demo-section {
      padding: 1rem;
    }

    .avatar-grid {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
  }
</style>