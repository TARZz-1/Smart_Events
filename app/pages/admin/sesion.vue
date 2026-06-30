<script setup lang="ts">
import { z } from 'zod'

const schemaLogin = z.object({
   email: z.email({ message: 'Debe ingresar un correo válido.' }),
   password: z.string().min(6, 'La contraseña debe tener como mínimo 6 caracteres.')
})

const { fetch: refreshSession } = useUserSession()

const cargando = ref(false)
const credenciales = ref({
    email:'',
    password:''
})

const procesarIngreso = async () => {
    cargando.value = true

    try {
        await $fetch('/api/autenUser/ingresar' , {
            method: 'POST',
            body: credenciales.value
        })

        await refreshSession()
        await navigateTo('/admin/eventos')
    }catch (error){
        console.error('ERROR AL INGRESAR AL PERFIL', error)
        alert('Credenciales no existen. Reintenta.')
    }finally{
        cargando.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-60vh">
        <UCard class="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <template #header>
            <h2 class="text-2xl font-black text-center text-yellow-400 uppercase tracking-tighter ">
                Acceso Staff
            </h2>
        </template>

        <UForm :schema="schemaLogin" :state="credenciales" @submit="procesarIngreso" class="space-y-8">

            <UFormField label="Correo" name="email" class="text-zinc-300">
                <UInput v-model="credenciales.email" variant="none" type="email" placeholder="admin@gmail.com" size="lg" class="ring-1 ring-zinc-700 bg-zinc-800 rounded-md">
                </UInput>
            </UFormField>

        <UFormField label="Contraseña" name="password" class="text-zinc-300">
            <UInput v-model="credenciales.password" variant="none" type="password" placeholder="********" seze="lg" class=" ring-1 ring-zinc-700 bg-zinc-800 rounded-md">
            </UInput>
        </UFormField>

        <UButton type="submit" block size="lg" :loading="cargando" class="bg-yellow-400 text-zinc-950 font-balck text-lg py-3 hover:bg-yellow-500 font-bold" color= "warning" >
            Iniciar Sesion
            </UButton>
        </UForm>
        </UCard>
    </div>
</template>