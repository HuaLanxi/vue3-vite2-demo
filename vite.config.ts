import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
//引入自动引入插件
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true
        }),
        AutoImport({
            imports: ['vue'], dts: 'src/auto-import.d.ts'
        }),
    ],
    base: './',
})
