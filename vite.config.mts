import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        emptyOutDir: false,
        lib: {
            entry: ["./src/index.tsx"],
            name: "@woby/modal",
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', 'woby/jsx-runtime', '@woby/styled',],
            output: {
                globals: {
                    'woby': 'woby',
                    'woby/jsx-runtime': 'woby/jsx-runtime',
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src', outputDir: './dist/types' })
        tailwindcss(), // Re-enabled Tailwind CSS plugin with updated Vite version
    ],
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': 'woby',
            'woby/jsx-runtime': 'woby',
            'woby': 'woby'
        },
    },
})

export default config