import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css'; // se precisar de estilos ou use um CSS module

function ColumnCard({ title, themeClass, feriados, getDisplayValue }) {
  return (
    <div className={`table-card ${themeClass}`}>
      <div className="table-header">
        <h2>{title}</h2>
      </div>
      <div className="table-body">
        {feriados.map((feriado, index) => (
          <div key={index} className="table-row">
            <div className="row-value">{getDisplayValue(feriado)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

ColumnCard.propTypes = {
  title: PropTypes.string.isRequired,
  themeClass: PropTypes.string.isRequired,
  feriados: PropTypes.array.isRequired,
  getDisplayValue: PropTypes.func.isRequired,
};

export default ColumnCard;
