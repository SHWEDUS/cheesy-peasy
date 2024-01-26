import React from 'react';

import styles from './styles/index.module.scss'

function NotFoundBlock(): React.JSX.Element {
  return (
    <h1 className={styles.root}>
      <span>😕</span>
      <br />
      Ничего не найдено
      <p>Увы, такой страницы ещё нет в нашей пиццерии :(</p>
    </h1>
  );
}

export default NotFoundBlock;