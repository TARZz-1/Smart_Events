import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No se recibió ningún formulario',
      })
    }

    const titulo = formData.find(f => f.name === 'titulo')?.data.toString() || ''
    const lugar = formData.find(f => f.name === 'lugar')?.data.toString() || ''
    const valor = Number(formData.find(f => f.name === 'valor')?.data.toString() || 0)
    const fecha = formData.find(f => f.name === 'fecha')?.data.toString() || ''
    const hora = formData.find(f => f.name === 'hora')?.data.toString() || ''

    let imagenPath: string
    const imagenFile = formData.find(f => f.name === 'imagen')

    if (imagenFile && imagenFile.filename && imagenFile.data.length > 0) {
     
        const uniqueFilename = `${Date.now()}-${imagenFile.filename}`
        const filePath = join(process.cwd(), 'public', 'uploads', uniqueFilename)

        const dir = dirname(filePath)
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true })
      }
      await writeFile(filePath, imagenFile.data)
      imagenPath = `/uploads/${uniqueFilename}`
    } else {
      imagenPath = '/img/default.png'
    }

    const nuevoEvento = await prisma.evento.create({
      data: {
        titulo,
        lugar,
        valor,
        fecha: new Date(`${fecha}T${hora}`),
        imagen: imagenPath
      }
    })

    return { success: true, evento: nuevoEvento }
  } catch (error: any) { 
    console.error('Error al crear evento:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo crear el evento',
    })
  }
}) 