const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export async function getClientes(){
  const res = await fetch(`${API_URL}/clientes`)
  if (!res.ok) {
    throw new Error(`Falha ao buscar clientes: HTTP ${res.status}`)
  }
  return res.json()
}
