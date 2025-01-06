// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'vite-plugin-node-polyfills';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // This plugin polyfills Node.js globals and modules for the browser
    inject({
      Buffer: ['buffer', 'Buffer'],
      process: ['process/browser', 'process'], // Updated to use 'process'
    }),
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