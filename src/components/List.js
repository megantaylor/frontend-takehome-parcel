import * as React from 'react';

export default function List(props) {
  return (
    <div className='searchResults'>
      {props.results.map((item, index) => (
        <div key={index}>
          <div className='gemTitle'>
            <h2>
              {item.name}
              <span>{item.version}</span>
            </h2>
            <button
              className='gemButton'
              onClick={() => props.handleGemButton(item)}
              type='button'
            >
              {item.saved ? 'Unsave' : 'Save'}
            </button>
          </div>
          <p>{item.info}</p>
        </div>
      ))}
    </div>
  );
}
