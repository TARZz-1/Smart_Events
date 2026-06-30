import type { Evento } from './eventos'

export interface Inscrito {
  id: number
  email: string
  nombre: string
  apellido: string
  eventoId: number
  evento?: Evento   // opcional porque depende del include
}
