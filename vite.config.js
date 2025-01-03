import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify('https://optimus-backend-49b31c7c7d3a.herokuapp.com'),
    'process.env.REACT_APP_API_KEY': JSON.stringify('your-api-key'),
    'process.env.VITE_ENV': JSON.stringify('production'),
    'process.env.REACT_APP_TOKENVIEW_KEY': JSON.stringify('lsZGSdo9TopH5nikdSyz')
  }
})