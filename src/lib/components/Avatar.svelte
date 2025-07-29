<script>
  import { onMount } from 'svelte';

  // Default punchy, bright colors
  let colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  let maskId = `mask_${Math.random().toString(36).substr(2, 9)}`;
  let filterId = `filter_${Math.random().toString(36).substr(2, 9)}`;

  // Transform parameters for randomization
  let transforms = [
    { translate: [0, 0], rotate: 256, scale: 1.2 },
    { translate: [-4, 4], rotate: -204, scale: 1.2 }
  ];

  // Punchy color palette
  const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
    '#F1948A', '#85C1E9', '#F4D03F', '#A9DFBF', '#D7BDE2', '#AED6F1',
    '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6', '#E67E22', '#1ABC9C',
    '#E74C3C', '#3498DB', '#9B59B6', '#F39C12', '#27AE60', '#8E44AD',
    '#FF5722', '#00BCD4', '#CDDC39', '#FF9800', '#4CAF50', '#673AB7'
  ];

  function getRandomColor() {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  }

  function randomizeColors() {
    colors = colors.map(() => getRandomColor());
  }

  function addColor() {
    colors = [...colors, getRandomColor()];
  }

  function removeColor(index) {
    if (colors.length > 2) {
      colors = colors.filter((_, i) => i !== index);
    }
  }

  function randomizeEffect() {
    // Randomize transforms with better constraints to avoid hard edges
    transforms = transforms.map(() => ({
      translate: [
        Math.random() * 16 - 8, // Reduced range: -8 to 8
        Math.random() * 16 - 8
      ],
      rotate: Math.random() * 360, // 0 to 360 (positive only for smoother transitions)
      scale: 1.0 + Math.random() * 0.4 // More controlled scaling: 1.0 to 1.4
    }));

    // Also randomize colors
    randomizeColors();
  }

  onMount(() => {
    randomizeColors();
  });
</script>

<div class="avatar-generator">
  <div class="preview-container">
    <svg
      viewBox="0 0 80 80"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      class="avatar-preview"
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
        <rect width="80" height="80" rx="0" fill="#FFFFFF"></rect>
      </mask>

      <g mask="url(#{maskId})">
        <!-- Background -->
        <rect width="80" height="80" fill={colors[0]} />

        <!-- Dynamic shapes based on number of colors -->
        {#each colors.slice(1) as color, i}
          <path
            filter="url(#{filterId})"
            d={i % 2 === 0
              ? "M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
              : "M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
            }
            fill={color}
            fill-opacity="0.85"
            transform="translate({transforms[i % transforms.length].translate[0]} {transforms[i % transforms.length].translate[1]}) rotate({transforms[i % transforms.length].rotate} 40 40) scale({transforms[i % transforms.length].scale})"
            style={`${i % 3 === 1 ? "mix-blend-mode: overlay;" : i % 3 === 2 ? "mix-blend-mode: multiply;" : "mix-blend-mode: normal;"} filter: blur(${Math.max(2 + i * 1.6, 5)}px);`}
          />
        {/each}
      </g>

      <defs>
        <filter id={filterId} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  </div>

  <div class="controls">
    <div class="color-controls">
      <h3>Colors ({colors.length})</h3>
      <div class="color-grid">
        {#each colors as color, i}
          <div class="color-item">
            <input
              type="color"
              bind:value={color}
              class="color-input"
            />
            <button
              class="remove-color"
              on:click={() => removeColor(i)}
              disabled={colors.length <= 2}
              title="Remove color"
            >
              ×
            </button>
          </div>
        {/each}
      </div>

      <div class="color-actions">
        <button class="btn secondary" on:click={addColor}>
          + Add Color
        </button>
        <button class="btn secondary" on:click={randomizeColors}>
          🎨 Random Colors
        </button>
      </div>
    </div>

    <div class="effect-controls">
      <button class="btn primary" on:click={randomizeEffect}>
        ✨ Randomize Effect
      </button>
    </div>
  </div>
</div>

<style>
  .avatar-generator {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .preview-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .avatar-preview {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border: 2px solid #f0f0f0;
  }

  .controls {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .color-controls h3 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.1rem;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .color-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .color-input {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .color-input:hover {
    transform: scale(1.05);
  }

  .remove-color {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background: #ff4757;
    color: white;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: all 0.2s;
  }

  .remove-color:hover:not(:disabled) {
    background: #ff3742;
    transform: scale(1.1);
  }

  .remove-color:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .color-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .effect-controls {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
  }

  .btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    width: 100%;
  }

  .btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  }

  .btn.secondary {
    background: white;
    color: #333;
    border: 1px solid #ddd;
  }

  .btn.secondary:hover {
    background: #f5f5f5;
    transform: translateY(-1px);
  }
</style>