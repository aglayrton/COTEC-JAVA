import IStatus from "./IStatus";

export default interface IPessoa {
  id?: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  status: IStatus;
}
