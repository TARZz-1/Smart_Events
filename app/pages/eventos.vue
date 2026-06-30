<script setup lang="ts">
import { computed, ref } from 'vue'
import { z } from 'zod'
import type { Evento } from '~/types/eventos'


const { data: eventosResponse, refresh } = await useFetch<{ success: boolean, eventos: Evento[] }>('/api/eventos', {
  default: () => ({ success: false, eventos: [] })
})
const eventos = computed(() => eventosResponse.value?.eventos || [])

const eventoSeleccionado = ref<Evento | null>(null)
const nombre = ref('')
const apellido = ref('')
const email = ref('')

function seleccionarEvento(evento: Evento) {
  eventoSeleccionado.value = evento
}
const inscripcionSchema = z.object({
  nombre: z.string().min(2, 'Nombre obligatorio'),
  apellido: z.string().min(2, 'Apellido obligatorio'),
  email: z.email('Debe ingresar un correo válido')
})


async function inscribir() {
  if (!eventoSeleccionado.value) return
    const result = inscripcionSchema.safeParse({ nombre: nombre.value, apellido: apellido.value, email: email.value })
  if (!result.success) {
    alert(result.error.issues[0]?.message || 'Revisa los datos ingresados')
    return
  }
  try {
    await $fetch('/api/inscritos', {
      method: 'POST',
      body: { 
        nombre: nombre.value, 
        apellido: apellido.value, 
        email: email.value, 
        eventoId: eventoSeleccionado.value.id 
      }
    })
    alert('Inscripción realizada con éxito')
    
    nombre.value = ''; apellido.value = ''; email.value = ''
    await refresh()

    eventoSeleccionado.value = eventos.value?.find(e => e.id === eventoSeleccionado.value?.id) || null
    
  } catch (e) {
    alert('Error al inscribirse')
  }
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="max-w-7xl mx-auto p-6 py-10 space-y-8">
      
      <div class="space-y-2">
        <p class="text-sm font-semibold uppercase tracking-widest text-yellow-400">Eventos</p>
        <h2 class="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl">
          Eventos <span class="text-yellow-400">Disponibles</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="space-y-3">
          <UButton
            v-for="evento in eventos"
            :key="evento.id"
            block
            class="bg-yellow-500 border border-yellow-600 text-black hover:bg-zinc-900 hover:text-yellow-400  transition-colors justify-start font-bold py-4"
            color= "warning"
            icon="i-heroicons-calendar"
            @click="seleccionarEvento(evento)"
          >
            <div class="flex flex-col items-start">
                <span>{{ evento.titulo }}</span>
                <span class="text-xs text-zinc-500 font-normal">{{ new Date(evento.fecha).toLocaleDateString() }}</span>
            </div>
          </UButton>
        </div>

        <div v-if="eventoSeleccionado" class="lg:sticky lg:top-24 h-fit">
          <UCard class="bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
            <img :src="eventoSeleccionado.imagen || '/img/default.png'" class="w-full h-64 object-cover" />
            
            <div class="p-6">
              <h3 class="text-2xl font-black text-white uppercase mb-3">{{ eventoSeleccionado.titulo }}</h3>
              
              <div class="space-y-2 text-sm text-zinc-400 mb-6">
                <p><UIcon name="i-heroicons-calendar-days" class="text-yellow-400 mr-2"/> {{ new Date(eventoSeleccionado.fecha).toLocaleDateString() }}</p>
                <p><UIcon name="i-heroicons-map-pin" class="text-yellow-400 mr-2"/> {{ eventoSeleccionado.lugar }}</p>
                <p><UIcon name="i-heroicons-users" class="text-yellow-400 mr-2"/> {{ (eventoSeleccionado as any).inscritos?.length || 0 }} personas inscritas</p>
                <p><UIcon name="i-heroicons-currency-dollar" class="text-yellow-400 mr-2"/> ${{ eventoSeleccionado.valor }}</p>
              </div>

              <UForm @submit.prevent="inscribir" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <UInput v-model="nombre" variant="none" class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" placeholder="Nombre" />
                  <UInput v-model="apellido" variant="none" class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" placeholder="Apellido" />
                </div>
                <UInput v-model="email" type="email" variant="none" class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" placeholder="usuario@gmail.com" />
                <UButton type="submit" block class="bg-yellow-400 text-zinc-950 font-bold" color= "warning">Confirmar Inscripción</UButton>
              </UForm>
            </div>
          </UCard>
        </div>
        
        <div v-else class="flex flex-col items-center justify-center text-center p-10 border border-dashed border-zinc-700 rounded-xl bg-zinc-900/50">
          <p class="text-zinc-400">Selecciona un evento para inscribirte</p>
        </div>
      </div>
    </div>
  </div>
</template>