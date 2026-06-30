<script setup lang="ts">

import type { TableColumn } from '@nuxt/ui';

interface Usuario {
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  password?: string;
}

const { data: staff,pending,error,refresh } = await useFetch<Usuario[]>('/api/usuarios')

const columns: TableColumn<Usuario>[] = [
  { accessorKey: 'nombre', header: 'Nombre' },
  { accessorKey: 'apellido', header: 'Apellido' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'rol', header: 'Rol' },
  { id: 'acciones', header: 'Acciones', cell: ({ row }) => {
      const email = row.original.email;
      const rol = row.original.rol;
      
      if (rol === 'ADMIN') {
        return null; 
      }

      return h('button', {
        onClick: () => eliminarStaff(email),
        style: 'background-color: #ef4444; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;'
      }, 'Eliminar');
    }}
]

const mostrarFormulario = ref(false)
const guardandoStaff = ref(false)
const errorFormulario = ref('')

const  formularioStaff = reactive({
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  rol: 'STAFF'
})

function limpiarFormulario (){
  formularioStaff.email=''
  formularioStaff.nombre=''
  formularioStaff.apellido=''
  formularioStaff.password=''
  formularioStaff.rol='STAFF'
  errorFormulario.value = ''
}

function cerrarFormulario (){
  mostrarFormulario.value = false
  limpiarFormulario()
}

async function  guardarStaff() {
  errorFormulario.value=''
  guardandoStaff.value=true


  if(!formularioStaff.email || !formularioStaff.nombre || !formularioStaff.apellido || !formularioStaff.password){
    errorFormulario.value = 'Debe ingresar todos los campos para poder registrar un usuario.'
    guardandoStaff.value=false
    return
  }

  try {
    await $fetch('/api/usuarios', {
      method: 'POST', 
      body: {
        email: formularioStaff.email,
        nombre: formularioStaff.nombre,
        apellido: formularioStaff.apellido,
        password: formularioStaff.password,
        rol: formularioStaff.rol
      }
    })

    cerrarFormulario()
    await refresh()
  } catch (err: any){
    errorFormulario.value= 'Error al ingresar a usuario STAFF, verifica los datos.'
  }finally {
    guardandoStaff.value = false
  }
}

async function eliminarStaff(email: string) {
  if (confirm('Seguro quieres eliminar este usuario STAFF??')) {
    try {
      await $fetch(`/api/usuarios/${email}`, { method: 'DELETE' })
      await refresh()
    } catch (error) {
      alert('Error al eliminar al Usuario')
    }
  } 
}
</script>
<template>
  <div class="mx-auto max-w-7xl py-10 px-6 space-y-6">
    
    <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl backdrop-blur sm:p-6">
      <div class="space-y-2">
        <p class="text-sm font-semibold uppercase tracking-widest text-yellow-400">
          Administración
        </p>
        <h1 class="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
          Gestión de <span class="text-yellow-400">Staff</span>
        </h1>
        <p class="max-w-2xl text-sm leading-6 text-zinc-400">
          Lista, agrega y elimina cuentas de acceso para miembros del equipo.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-1">
        <UCard class="bg-zinc-900 border border-zinc-800 shadow-2xl sticky top-6">
          <template #header>
            <h3 class="text-xl font-black text-yellow-400 uppercase">Nuevo Staff</h3>
          </template>

          <form class="space-y-4" @submit.prevent="guardarStaff">
            
            <UFormField label="Nombre" class="text-zinc-300">
              <UInput v-model="formularioStaff.nombre" autocomplete="off" variant="none" 
                      class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" 
                      placeholder="Ej: Juan" />
            </UFormField>

            <UFormField label="Apellido" class="text-zinc-300">
              <UInput v-model="formularioStaff.apellido" autocomplete="off" variant="none" 
                      class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" 
                      placeholder="Ej: Pérez" />
            </UFormField>

            <UFormField label="Correo" class="text-zinc-300">
              <UInput v-model="formularioStaff.email" type="email" autocomplete="off" variant="none" 
                      class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" 
                      placeholder="usuario@smartevents.cl" />
            </UFormField>

            <UFormField label="Contraseña" class="text-zinc-300">
              <UInput v-model="formularioStaff.password" type="password" autocomplete="new-password" variant="none" 
                      class="bg-zinc-800 text-white rounded-md px-3 py-2 w-full ring-1 ring-zinc-700" />
            </UFormField>

            <UAlert v-if="errorFormulario" color="warning" variant="soft" icon="i-heroicons-exclamation-circle"
              :title="errorFormulario" class="mt-4" />

            <div class="pt-4 flex justify-end gap-3">
              <UButton type="button" color="warning" variant="ghost" @click="limpiarFormulario" class="font-bold">
                Limpiar
              </UButton>
              <UButton type="submit" class="bg-yellow-400 text-zinc-950 font-bold hover:bg-yellow-500" color= "warning" 
                       :loading="guardandoStaff">
                Guardar
              </UButton>
            </div>
            
          </form>
        </UCard>
      </div>

      <div class="lg:col-span-2">
        <UCard class="bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div class="mb-4 flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 class="text-lg font-semibold text-white">Cuentas Registradas</h2>
            
            <UButton color="warning" variant="solid" icon="i-heroicons-arrow-path" :loading="pending"
              @click="() => refresh()" class="rounded-full px-5 shadow-sm text-zinc-800" >
              Actualizar
            </UButton>
          </div>

          <UTable :data="staff" :columns="columns" :loading="pending" class="text-zinc-300">
            <template #rol-cell="{ row }">>
              <UBadge color="info" variant="subtle" class="font-bold">
                {{ row.original.rol }}
              </UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
    </div>
  </div>
</template>