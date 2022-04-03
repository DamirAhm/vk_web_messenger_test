import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    envDir: './',
    base: '/vk_web_messenger_test/',
});
