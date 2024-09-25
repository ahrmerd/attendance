/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import './bootstrap'

import { ThemeProvider } from '@/contexts/theme_context'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
// import { stardust, initRoutes } from '@ahrmerd/adonis-stardust/client'

// stardust
const appName = import.meta.env.VITE_APP_NAME || 'Smart Attend'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
    <ThemeProvider>
      <App {...props} />
    </ThemeProvider>
    )
  },
})
