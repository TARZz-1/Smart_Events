<script setup lang="ts">

import { ref } from 'vue';
import type { Inscrito } from '~/types/inscrito';

const email = ref('')
const resultados = ref<Inscrito[]>([])
const buscando = ref(false)
const buscado = ref(false)
const errorBusqueda = ref('')

async function buscarInscripciones() {
  if (!email.value) {
    errorBusqueda.value = 'Debe ingresar un correo'
    return
  }
        buscando.value = true
        errorBusqueda.value = ''

  try {
    resultados.value = await $fetch<Inscrito[]>('/api/inscritos/buscarIns', {
      query: { email: email.value }
    })
    buscado.value = true
  } catch (e) {
    errorBusqueda.value = 'Error al buscar tus inscripciones'
  } finally {
    buscando.value = false
  }
}

</script>

<template>
  <div class="max-w-2xl mx-auto p-6 py-10 space-y-6">
    <div class="space-y-2">
      <p class="text-sm font-semibold uppercase tracking-widest text-yellow-400">Mis Inscripciones</p>
      <h2 class="text-3xl font-black tracking-tight text-white uppercase">
        Consultar <span class="text-yellow-400">Inscripciones</span>
      </h2>
    </div>

    <UForm :state="{ email }" @submit.prevent="buscarInscripciones" class="flex gap-3">
      <UInput v-model="email" type="email" placeholder="tu@email.com" variant="none" class="flex-1 bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" />
      <UButton type="submit" :loading="buscando" class="bg-yellow-400 text-zinc-950 font-bold" color= "warning">
        Buscar
      </UButton>
    </UForm>

    <UAlert v-if="errorBusqueda" color="warning" variant="soft" :title="errorBusqueda" />

    <div v-if="buscado && resultados.length === 0" class="text-center text-zinc-500 py-10">
      No se encontraron inscripciones para ese correo.
    </div>

    <div v-else class="space-y-3">
      <UCard v-for="inscrito in resultados" :key="inscrito.id" class="bg-zinc-900 border border-zinc-800">
        <h3 class="text-white font-bold">{{ inscrito.evento?.titulo }}</h3>
        <p class="text-zinc-400 text-sm">{{ inscrito.evento?.lugar }}</p>
        <p class="text-zinc-400 text-sm">
          {{ inscrito.evento?.fecha ? new Date(inscrito.evento.fecha).toLocaleDateString() : '' }}
        </p>
      </UCard>
    </div>
  </div>
</template>