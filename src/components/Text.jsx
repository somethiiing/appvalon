import React from 'react';

function P(props) {
  return (
    <p className="Text-P">
      {props.children}
    </p>
  );
}

function Heading(props) {
  return (
    <h1 className="Text-Heading">
      {props.children}
    </h1>
  );
}

function Sub(props) {
  return (
    <span className="Text-Sub">
      {props.children}
    </span>
  );
}

export {
  P,
  Heading,
  Sub,
};
