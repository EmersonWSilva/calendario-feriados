// src/components/Controls.jsx
import React from 'react';
import PropTypes from 'prop-types';

function Controls({ ano, onChangeAno, onBuscar }) {
  return (
    <div className="controls">
      <label htmlFor="ano">Escolha o ano:</label>
      <input
        type="number"
        id="ano"
        value={ano}
        onChange={(e) => onChangeAno(e.target.value)}
      />
      <button onClick={onBuscar}>Buscar</button>
    </div>
  );
}

Controls.propTypes = {
  ano: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChangeAno: PropTypes.func.isRequired,
  onBuscar: PropTypes.func.isRequired,
};

export default Controls;
