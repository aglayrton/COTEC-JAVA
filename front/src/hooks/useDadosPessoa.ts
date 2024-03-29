import IPessoa from "../types/IPessoa";
import useFetch from "./useFetch";

export default function useDadosPessoa() {
  return useFetch<IPessoa[]>({ url: "pessoas" });
}
