// src/components/CalendarioAnual.jsx
import React from 'react';
import ReactTooltip from 'react-tooltip'; // Import da lib
import '../styles/CalendarioAnual.css';

function CalendarioAnual({ ano, feriados }) {
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  function getDiasNoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
  }

  // Retorna o nome do feriado (ou null) para um dia específico
  function getHolidayName(dia, mes, ano) {
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes).padStart(2, '0');
    const anoStr = String(ano);
    const dataCompleta = `${anoStr}-${mesStr}-${diaStr}`;

    const feriadoEncontrado = feriados.find((f) => f.date === dataCompleta);
    return feriadoEncontrado ? feriadoEncontrado.name : null;
  }

  return (
    <div className="calendario-anual">
      {nomesMeses.map((nomeMes, index) => {
        const mes = index + 1;
        const diasNoMes = getDiasNoMes(mes, ano);

        return (
          <div className="mes-card" key={mes}>
            <div className="mes-titulo">{nomeMes}</div>
            <div className="dias-container">
              {Array.from({ length: diasNoMes }, (_, i) => {
                const dia = i + 1;
                const holidayName = getHolidayName(dia, mes, ano);
                const ehFeriado = Boolean(holidayName);

                return (
                  <div
                    key={dia}
                    className={`dia ${ehFeriado ? 'feriado' : ''}`}
                    // em vez de title, usamos data-tip
                    data-tip={ehFeriado ? holidayName : undefined}
                  >
                    {dia}
                  </div>
                );
              })}
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
