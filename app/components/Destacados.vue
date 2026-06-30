<script setup lang="ts">
import { ref } from 'vue'
import EventoCard from './EventoCard.vue'
import type { Evento } from '~/types/eventos'

const props = defineProps<{
  eventos: Evento[] | null
}>()

const eventoSeleccionado = ref<Evento | null>(null)
</script>

<template>
  <div class="space-y-6">
    <div v-if="!eventos || eventos.length === 0" class="text-center text-zinc-500 py-10">
      No existen eventos destacados.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventoCard 
        v-for="evento in eventos" 
        :key="evento.id" 
        :evento="evento" 
        @seleccionar="eventoSeleccionado = evento"
      />
    </div>

    <div v-if="eventoSeleccionado" class="mt-10 p-6 bg-zinc-900 border border-zinc-700 rounded-xl text-white shadow-2xl">
      <h2 class="text-2xl font-black mb-4 uppercase text-yellow-400">
        {{ eventoSeleccionado.titulo }}
      </h2>
      
      <div class="space-y-3 mb-6">
        <p>
          <span class="font-bold text-zinc-400">Lugar:</span> {{ eventoSeleccionado.lugar }}
        </p>
        <p>
          <span class="font-bold text-zinc-400">Valor:</span> ${{ eventoSeleccionado.valor }}
        </p>
        <p>
          <span class="font-bold text-zinc-400">Fecha:</span> {{ new Date(eventoSeleccionado.fecha).toLocaleDateString() }}
        </p>
      </div>

      <UButton color="warning" variant="solid" @click="eventoSeleccionado = null" >
        Cerrar detalles
      </UButton>
    </div>
  </div>
</template>