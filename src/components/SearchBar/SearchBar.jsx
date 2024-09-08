import IconSearch from '../../assets/search.svg';
import css from './SearchBar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className={css.SearchBar} onSubmit={handleSubmit}>
      <div className={css.SearchBar__inputWrapper}>
        <input 
          className={css.SearchBar__input}
          type='text' 
          placeholder='Search for images' 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className={css.SearchBar__button}>
          <img src={IconSearch} alt="Search" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;