// src/components/MobileFeriadosList.jsx

import React from 'react';
import '../styles/MobileFeriadosList.css';

function MobileFeriadosList({ feriados, getWeekdayValue, getDisplayValue }) {
  return (
    <div className="mobile-list">
      <div className="mobile-list-header theme-orange">
        Feriados
      </div>

      {feriados.map((f, index) => {
        // Chamamos getWeekdayValue p/ dia da semana
        const weekday = getWeekdayValue(f);
        // Chamamos getDisplayValue p/ data no formato DD-MM-YYYY
        const dateFormatted = getDisplayValue(f);

        return (
          <div key={index} className="mobile-item">
            <div className="mobile-data">{dateFormatted}</div>
            <div className="mobile-name">{f.name}</div>
            <div className="mobile-weekday">{weekday}</div>
          </div>
        );
      })}
    </div>
  );
}

export default MobileFeriadosList;
