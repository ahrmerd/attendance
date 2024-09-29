import { defineConfig } from '@adonisjs/inertia';
const inertiaConfig = defineConfig({
    rootView: 'inertia_layout',
    sharedData: {
        errors: (ctx) => ctx.session?.flashMessages.get('errors'),
        auth: (ctx) => ctx.auth.user,
    },
    ssr: {
        enabled: false,
        entrypoint: 'inertia/app/ssr.tsx',
    },
});
export default inertiaConfig;
//# sourceMappingURL=inertia.js.map