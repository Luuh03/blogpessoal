import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"


function DeletarTema() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tema, setTema] = useState<Tema>({} as Tema)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token }
      })

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    }
  }

  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao excluir o tema!", 'erro')
        console.log(error)
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", 'info')
      navigate("/")
    }
  })

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id)
    } else {
      setTema({
        id: undefined,
        descricao: ""
      })
    }
  }, [id])

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar o tema a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>
        <div className="flex">
          <button className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 transition delay-2" onClick={retornar}>
            Não
          </button>
          <button className="w-full text-slate-100 bg-indigo-400
                             hover:bg-indigo-600 flex items-center justify-center transition delay-2" onClick={deletarTema}>
            {isLoading ?
              <RotatingLines
                strokeColor='white'
                strokeWidth='5'
                animationDuration='0.75'
                width='24'
                visible={true}
              /> :
              <span>Sim</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarTema