export default defineNuxtRouteMiddleware((to) => {

    const {loggedIn} = useUserSession()
    const rutasPublicas = ['/admin/sesion']

    if (!loggedIn.value && !rutasPublicas.includes(to.path)) {
        return navigateTo('/admin/sesion')
    }
})

