export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const {email,password} = body


    const emailNormalizado = typeof email === 'string' ? email.trim() : ''
    const passwordNormalizado = typeof password === 'string' ? password.trim() : ''

    //encontrar en la base
    const usuario = await prisma.usuario.findUnique({
        where: {
            email: emailNormalizado
        }
    })

    //verificar usuario y contrasena
    if (!usuario || usuario.password !== passwordNormalizado){
        throw createError ({
            statusCode: 401,
            statusMessage: 'Credenciales ingresadas incorrectas' 
        })
    }

    //generar sesion
    await setUserSession(event,{
        user: {
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol
        }
    })

    return {
        ok: true,
        message: 'Inicio de sesion completado'
    }
})