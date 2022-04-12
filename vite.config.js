import { fileURLToPath, URL } from 'url'
import { execSync } from 'child_process';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        'GIT_COMMIT_HASH': JSON.stringify(execSync('git rev-parse HEAD').toString().trim()),
        'BUILT_AT': JSON.stringify(Date.now()),
    }
})
