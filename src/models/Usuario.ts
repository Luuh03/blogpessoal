import type Postagem from "./Postagem"

export default interface Usuario {
    id: number | undefined;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem[] | null;
}