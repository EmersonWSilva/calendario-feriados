import axios from 'axios';

export async function getFeriados(ano) {
  const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
  return response.data;
}
