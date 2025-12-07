// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss'],
	app: {
		baseURL: '/portfolio/',
		head: {
			title: 'Jay Portfolio',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: 'Jay - My Portfolio' },
				{ name: 'author', content: 'William Jay Inclino' },
			],
			link: [
				{ rel: 'author', href: 'https://www.facebook.com/jewell.inclino' },
				{ rel: 'icon', type: 'image/png', href: '/portfolio/favicon.ico' },
				
			],
		}
	},
	vite: {
        server: {
            allowedHosts: ['jaytechsolutions.cloud']
        }
    }
})
