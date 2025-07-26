import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://auth.supedio.com',
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/auth/, '')
			}
		}
	}
});
