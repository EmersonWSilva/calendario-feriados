// src/App.js
import React, { useState, useEffect } from 'react';
import { getFeriados } from './services/feriadosService';
import Controls from './components/Controls';
import ColumnCard from './components/ColumnCard';
import Title from './components/Title';
import Footer from './components/Footer';
import CalendarioAnual from './components/CalendarioAnual'; // Import do novo componente
import './styles/App.css';

function App() {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarFeriados = async (anoEscolhido) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFeriados(anoEscolhido);
      setFeriados(data);
    } catch (err) {
      setError(err.message);
      setFeriados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFeriados(ano);
  }, [ano]);

  const handleBuscar = () => {
    buscarFeriados(ano);
  };

  // Funções para extrair valores:
  const getDataValue = (feriado) => {
    // "2025-09-23" -> ["2025", "09", "23"]
    const [year, month, day] = feriado.date.split("-");
    // Retorno no formato dia-mês-ano
    return `${day}-${month}-${year}`;
  };
  const getNameValue = (feriado) => feriado.name;
  const getWeekdayValue = (feriado) => {
    const dataObj = new Date(feriado.date);
    const diaSemanaLower = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
    return diaSemanaLower.charAt(0).toUpperCase() + diaSemanaLower.slice(1);
  };

  return (
    <div className="container">
      <Title>Calendário de Feriados</Title>

      <Controls ano={ano} onChangeAno={setAno} onBuscar={handleBuscar} />

      {loading && <p className="status">Carregando feriados...</p>}
      {error && <p className="status error">Ocorreu um erro: {error}</p>}
      {!loading && !error && feriados.length === 0 && (
        <p className="status">Nenhum feriado encontrado.</p>
      )}

      {!loading && !error && feriados.length > 0 && (
        <>
          <div className="calendario-wrapper">
            <CalendarioAnual ano={ano} feriados={feriados} />
          </div>

          {/* Tabela de colunas depois */}
          <div className="table-section">
            <ColumnCard
              title="Datas"
              themeClass="theme-red"
              feriados={feriados}
              getDisplayValue={getDataValue}
            />
            <ColumnCard
              title="Feriados"
              themeClass="theme-orange"
              feriados={feriados}
              getDisplayValue={getNameValue}
            />
            <ColumnCard
              title="Dias da Semana"
              themeClass="theme-yellow"
              feriados={feriados}
              getDisplayValue={getWeekdayValue}
            />
          </div>
        </>
      )}


      {/* Inserindo o rodapé */}
      <Footer />
    </div>
  );
}

export default App;
