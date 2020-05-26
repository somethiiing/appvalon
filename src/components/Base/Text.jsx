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

function Highlight(props) {
  return (
      <span className="Text-Highlight">
      {props.children}
    </span>
  );
}

function HighLightSameLine(props) {
  return (
      <span className="Text-Highlight">
      {props.children}
    </span>
  )
}

function Bold(props) {
  return (
      <span className="Text-Bold">
      {props.children}
    </span>
  );
}

function Link(props) {
  return (
    <a href={props.href} target="_blank" className="Text-Link">
      {props.children}
    </a>
  );
}

export {
  P,
  Heading,
  Sub,
  Link,
  Highlight,
  Bold
};
