export default defineEventHandler(async (event) =>{
    await clearUserSession(event)

    return {
        ok: true,
        message: 'Sesion cerrada con exito'
    }
})