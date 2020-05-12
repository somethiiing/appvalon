import React from 'react';

function Button(props) {
  return (
    <button className="Button">
      {props.children}
    </button>
  );
}

export default Button;
