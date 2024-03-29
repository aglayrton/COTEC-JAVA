import { useEffect, useState, useCallback } from "react";

export default function useFetch<T>({ url }: { url: string }) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/${url}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const dados = await response.json();
      setData(dados.content);
    } catch (erro) {
      setError("erro.message");
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retornar a função refetch para permitir que ela seja usada externamente
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch };
}
