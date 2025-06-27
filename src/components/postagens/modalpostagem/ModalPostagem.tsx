import Popup from "reactjs-popup"
import FormPostagens from "../formpostagem/FormPostagem"
import "./ModalPostagem.css"



function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 cursor-pointer
            hover:bg-white hover:text-indigo-800 transition delay-2">
            Nova Postagem
          </button>
        }
        modal
      >
        <FormPostagens />
      </Popup>
    </>
  )
}

export default ModalPostagem