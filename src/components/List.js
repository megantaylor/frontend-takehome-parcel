import * as React from 'react';

export default function List(props) {
  return (
    <div>
      {props.results.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
}
