import IconSearch from '../../assets/search.svg';
import css from './SearchBar.module.css';
import debounce from '../../helpers/debounce';

const SearchBar = ({ onSearch }) => {
  return (
    <div className={css.SearchBar}>
      <div className={css.SearchBar__inputWrapper}>
        <input 
          className={css.SearchBar__input}
          type='text' 
          placeholder='Search for images' 
          onChange={debounce((e) => onSearch(e.target.value), 500)}
        />
        <img src={IconSearch} />
      </div>
    </div>
  )
}

export default SearchBar;