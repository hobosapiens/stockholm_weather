import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            VITE_PLACES_API_KEY: env.VITE_PLACES_API_KEY,
          }
        }
      }),
    ],
  }
}
