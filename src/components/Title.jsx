// src/components/Title.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Title.css'; // se quiser importar um CSS separado, opcional

function Title({ children }) {
  return <h1 className="title">{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
