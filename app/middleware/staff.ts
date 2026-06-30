export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserSession()
    const rol = user.value?.rol?.toUpperCase()

    if (rol !== 'STAFF' && rol !== 'ADMIN') {
        throw createError({ statusCode: 403, message: 'Acceso Denegado'})
    }
})