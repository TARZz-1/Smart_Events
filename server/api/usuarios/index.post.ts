export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const {email, password, nombre, apellido, rol} = body

    const emailNormalizado = typeof email === 'string' ? email.trim() : ''
    const passwordNormalizado = typeof password === 'string' ? password.trim() : ''
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : ''
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : ''

    const rolNormalizado = typeof rol === 'string' ? rol.trim() : ''

    //insertar en base

    const usuario = await prisma.usuario.create({
        data: {
            email: emailNormalizado,
            password: passwordNormalizado,
            nombre: nombreNormalizado,
            apellido: apellidoNormalizado,
            rol: rolNormalizado
        }
    })

    return {
        ok: true,
        usuario
    }
})