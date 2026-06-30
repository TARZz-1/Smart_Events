<script setup lang="ts">

// Ruta actual
const route = useRoute()

// Función para marcar link activo
const isActive = (to: string) => route.path === to

const {loggedIn, user, clear} = useUserSession()

// Links de navegación publicos
const navigationLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Mis Inscripciones', to: '/inscripcionesUser' }
]

const staffLinks = [
  {label: 'Eventos', to: '/admin/eventos'},
  {label: 'Staff', to: '/admin/staff'}
]

const linkactual = computed(() => {
  return loggedIn.value ? staffLinks : navigationLinks
})

const cerradoSesion = async () => {
  try{
    await $fetch('/api/autenUser/cerrar', {method: 'POST'})
    await clear()
    await navigateTo('/')
  }catch (error){
    console.error('Session no puso cerrarse correctamente:', error)
  }
}
</script>

<template>
  <nav class="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 shadow-xl backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="font-black text-2xl tracking-tighter text-white uppercase">
        <span class="text-yellow-400">Smart</span> Events
      </NuxtLink>
      <div class="flex items-center gap-8">
        <NuxtLink
          v-for="link in linkactual"
          :key="link.to"
          :to="link.to"
          :class="isActive(link.to)
            ? 'text-white font-bold border-b-2 border-yellow-400 pb-1 tracking-wide'
            : 'text-zinc-400 hover:text-yellow-400 transition-colors font-medium tracking-wide'"
        >
          {{ link.label }}
        </NuxtLink>
        <template v-if="loggedIn">
          <div class="flex items-center gap-4 border-l border-zinc-700 pl-6">
            <span class="text-sm text-zinc-400 font-medium">
              Bienvenido, <span class="text-white font-bold">{{ user?.nombre }} {{ user?.apellido }}</span>
            </span>
            <UButton 
              icon="i-heroicons-arrow-right-on-rectangle" 
              label="Salir" 
              class="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold transition-colors ring-1 ring-red-500/50" 
              color= "warning"
              @click="cerradoSesion" 
            />
          </div>
        </template>
        <template v-else>
          <UButton 
            to="/admin/sesion" 
            icon="i-heroicons-user"
            label="Administrador" 
            class="ml-4 font-bold bg-yellow-400 text-zinc-950 hover:bg-yellow-500 transition-transform hover:scale-105" 
            color= "warning"
            size="md" 
          />
        </template>
      </div>
    </div>
  </nav>
</template>