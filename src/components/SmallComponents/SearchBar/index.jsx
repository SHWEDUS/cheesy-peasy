import React, {useContext, useRef} from 'react';

import styles from './styles/index.module.scss'
import {SearchContext} from "../../../App";

function SearchBar() {
  const { searchValue, setSearchValue} = useContext(SearchContext)
  const inputRef = useRef();

  function handleClose() {
    setSearchValue('');
    inputRef.current.focus()
  }
  return (
    <div className={styles.container}>
      <svg className={styles.icon} width="800px" height="800px" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_15_152)">
          <rect width="24" height="24" fill="white"/>
          <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" strokeLinejoin="round"/>
          <path
            d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
            fill="#000000"/>
        </g>
        <defs>
          <clipPath id="clip0_15_152">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <input className={styles.input} placeholder={'Поиск...'} value={searchValue} ref={inputRef}
             onChange={(e) => setSearchValue(e.target.value)}></input>
      {searchValue && (
        <button className={styles.buttonClose} onClick={handleClose}>
          <svg className={styles.close} width="800px" height="800px" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;