import * as React from 'react';

export default function List(props) {
  const listItems = props.results.map((item, index) => (
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
          {props.findWithAttr(props.savedGems, 'name', item.name) > -1
            ? 'Unsave'
            : 'Save'}
        </button>
      </div>
      <p>{item.info}</p>
    </div>
  ));

  const noResults = <p className='noResults'>No search results found.</p>;

  return (
    <div className='searchResults'>
      {props.results.length < 1 && props.whichList === 'searchResults'
        ? noResults
        : listItems}
    </div>
  );
}
