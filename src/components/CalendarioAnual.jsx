// src/components/CalendarioAnual.jsx
import React from 'react';
import ReactTooltip from 'react-tooltip'; // Import da lib
import '../styles/CalendarioAnual.css';

function CalendarioAnual({ ano, feriados }) {
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Cabeçalho dos dias da semana (0=Dom,1=Seg,...)
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Retorna quantos dias tem um mês
  function getDiasNoMes(mesIndex, anoEscolhido) {
    // mesIndex + 1 pois JS conta mês 0..11
    return new Date(anoEscolhido, mesIndex + 1, 0).getDate();
  }

  // Retorna o nome do feriado (ou null) para um dia específico
  function getHolidayName(dia, mesIndex, anoEscolhido) {
    // Note que mesIndex é 0..11, mas feriados usam 1..12
    const mes = mesIndex + 1;
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes).padStart(2, '0');
    const anoStr = String(anoEscolhido);

    const dataCompleta = `${anoStr}-${mesStr}-${diaStr}`;
    const feriadoEncontrado = feriados.find((f) => f.date === dataCompleta);
    return feriadoEncontrado ? feriadoEncontrado.name : null;
  }

  // Gera as “semanas” (arrays de 7 posições), levando em conta em que dia da semana começa
  function gerarSemanasDoMes(mesIndex) {
    const totalDias = getDiasNoMes(mesIndex, ano);
    // Dia da semana do dia 1 (0=Dom,1=Seg,...)
    const primeiroDiaSemana = new Date(ano, mesIndex, 1).getDay();

    const semanas = [];
    let semanaAtual = new Array(7).fill(null);

    let dia = 1;

    // Preenche vazios antes do 1º dia (se o mês não começa no domingo)
    for (let i = 0; i < primeiroDiaSemana; i++) {
      semanaAtual[i] = null;
    }

    // Preenche dias
    while (dia <= totalDias) {
      const col = new Date(ano, mesIndex, dia).getDay(); // 0..6

      semanaAtual[col] = dia;

      // Se for sábado (col=6), fecha a semana
      if (col === 6) {
        semanas.push(semanaAtual);
        semanaAtual = new Array(7).fill(null);
      }

      dia++;
    }

    // Se a última semana não está totalmente vazia, adiciona
    if (semanaAtual.some((d) => d !== null)) {
      semanas.push(semanaAtual);
    }

    return semanas;
  }

  return (
    <div className="calendario-anual">
      {nomesMeses.map((nomeMes, mesIndex) => {
        const semanas = gerarSemanasDoMes(mesIndex);

        return (
          <div className="mes-card" key={mesIndex}>
            <div className="mes-titulo">
              {nomeMes} - {ano}
            </div>

            {/* Cabeçalho (D, S, T, Q, Q, S, S) */}
            <div className="dias-header">
              {diasSemana.map((diaSem, i) => (
                <div key={i} className="dia-header">
                  {diaSem}
                </div>
              ))}
            </div>

            {/* Grade de semanas (linhas) */}
            <div className="dias-grid">
              {semanas.map((semana, idxSemana) => (
                <div className="semana-row" key={idxSemana}>
                  {semana.map((diaNum, idxDia) => {
                    if (!diaNum) {
                      // célula vazia no grid
                      return (
                        <div key={idxDia} className="dia-cell empty"></div>
                      );
                    }

                    // Se houver feriado, obter nome
                    const holidayName = getHolidayName(diaNum, mesIndex, ano);
                    const ehFeriado = Boolean(holidayName);

                    return (
                      <div
                        key={idxDia}
                        className={`dia-cell ${ehFeriado ? 'feriado' : ''}`}
                        data-tip={ehFeriado ? holidayName : undefined}
                      >
                        {diaNum}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* O componente ReactTooltip deve ser renderizado
          para habilitar as tooltips de todos os elementos com data-tip. */}
      <ReactTooltip
        place="top"
        type="dark"
        effect="solid"
      />
    </div>
  );
}

export default CalendarioAnual;
