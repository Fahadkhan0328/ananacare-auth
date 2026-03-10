import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: ['@prisma/client'] // Tells the frontend bundler to ignore it
    },
    ssr: {
        external: ['@prisma/client'] // Tells the backend renderer to ignore it
    }
});