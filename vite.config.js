import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  ],
  resolve: {
    alias: {
      'crypto': 'crypto-browserify',
      'stream': 'stream-browserify',
      'buffer': 'buffer',
    }
  },
  define: {
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify('https://optimus-backend-49b31c7c7d3a.herokuapp.com'),
    'process.env.REACT_APP_API_KEY': JSON.stringify('pFYuSfBn1Iw2XBlN-CAokQ'),
    'process.env.VITE_ENV': JSON.stringify('production'),
    'process.env.REACT_APP_TOKENVIEW_KEY': JSON.stringify('y3QfwtRNg1ruwQBqDzmm')
  }
});