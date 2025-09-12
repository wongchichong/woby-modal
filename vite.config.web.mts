import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD:vite.config.web.mts
import path from 'path'
// import dts from 'vite-plugin-dts'
=======
>>>>>>> 352ce5548337cceca1e4390940a0de2ef67f2c0c:vite.config.web.ts

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.html"],
            name: "woby-modal",
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        outDir: './build',
        sourcemap: false,
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
<<<<<<< HEAD:vite.config.web.mts
        // dts({ entryRoot: './src', outputDir: './dist/types' })
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby', //'woby',
            'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby', //'woby',
            'woby': process.argv.includes('dev') ? path.resolve('../woby/src') : 'woby'
=======
        tailwindcss()
    ],
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': 'woby',
            'woby/jsx-runtime':'woby',
            'woby':'woby'
>>>>>>> 352ce5548337cceca1e4390940a0de2ef67f2c0c:vite.config.web.ts
        },
    },
})



export default config
