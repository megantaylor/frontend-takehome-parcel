import * as React from 'react';

export default function Form(props) {
  return (
    <form onSubmit={e => props.handleSubmit(e)}>
      <input
        className='searchInput'
        type='text'
        onChange={props.handleChange}
        value={props.searchTerm}
        placeholder='Search for a Ruby Gem'
        required
      />
      <button className='searchSubmit' type='submit'>
        Search
      </button>
    </form>
  );
}
