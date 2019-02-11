import * as React from 'react';

export default function Form(props) {
  return (
    <form onSubmit={e => props.handleSubmit(e)}>
      <input
        className='searchInput'
        type='search'
        onChange={props.handleChange}
        value={props.searchTerm}
        placeholder='Search for a Gem'
        required
      />
      <button className='searchSubmit' type='submit'>
        Search
      </button>
    </form>
  );
}
