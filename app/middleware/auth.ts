export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    if (!auth.auth.isAuthenticated && to.path === '/account'){
        return navigateTo('/login')
    }
})