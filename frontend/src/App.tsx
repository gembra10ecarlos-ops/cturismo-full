import { useEffect, useState } from "react"
import { getClientes } from "./api"

export default function App(){
  const [clientes, setClientes] = useState([])

  useEffect(()=>{
    getClientes().then(setClientes)
  },[])

  return (
    <div style={{fontFamily:"Arial",padding:"40px"}}>
      <h1>Sistema de Turismo</h1>
      <h2>Clientes</h2>
      <ul>
        {clientes.map((c:any)=>(
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>
    </div>
  )
}