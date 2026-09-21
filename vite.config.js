import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 상대 경로로 빌드해 GitHub Pages 하위 경로(/resume/)에서도 동작
export default defineConfig({ base: './', plugins: [react()] })
