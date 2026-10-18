import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { registerServices } from './providers/services.ts'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from '@/app/providers/router'
import '@/app/styles/assets/main.scss'

registerServices()
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark', 
        }
    }
})
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
