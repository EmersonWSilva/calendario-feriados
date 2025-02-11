import { useState, useEffect } from 'react';
import { getFeriados } from '../services/feriadosService';

export function useFeriados(ano) {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeriados() {
      setLoading(true);
      setError(null);

      try {
        const data = await getFeriados(ano);
        setFeriados(data);
      } catch (err) {
        setError(err.message);
        setFeriados([]);
      } finally {
        setLoading(false);
      }
    }

    if (ano) {
      fetchFeriados();
    }
  }, [ano]);

  return { feriados, loading, error };
}
