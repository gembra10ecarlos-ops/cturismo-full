import { useEffect, useState } from "react"
import { getClientes } from "./api"

export default function App(){
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    getClientes()
      .then(setClientes)
      .catch((e)=> setError(e.message))
      .finally(()=> setLoading(false))
  },[])

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>
      <h1>Sistema de Turismo</h1>
      <h2>Clientes</h2>
      {loading && <p>Carregando clientes...</p>}
      {error && <p style={{color:"red"}}>Erro ao carregar clientes: {error}</p>}
      {!loading && !error && clientes.length === 0 && <p>Nenhum cliente encontrado.</p>}
      <ul>
        {clientes.map((c:any)=>(
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>
    </div>
  )
}
