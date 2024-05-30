import React from "react";
import classNames from "classnames";
import styles from "./TimerItemPopup.module.scss";

export default function TimerItemPopup({ item, onClose }) {
  console.log(item);
  let isItem = !!Object.keys(item).length;

  let sectionClassName = classNames(styles.popup, {
    [styles.popup_opened]: isItem,
  });
  let btnGrayClassName = classNames(styles.popup__button, styles.popup__button_gray);
  let btnOrangeClassName = classNames(styles.popup__button, styles.popup__button_orange);
  return (
    <section className={sectionClassName}>
      <div className={styles.heading}>
        <button className={styles.heading__button} onClick={onClose}>
          <p className={styles.heading__text}>Таймеры</p>
        </button>
      </div>
      <p className={styles.popup__text}>
        {item.minutes}:{item.seconds}
      </p>
      <div className={styles.popup__container}>
        <button
          className={btnOrangeClassName}
          type="button"
          aria-label="Выйти."
          onClick={onClose}
        >
          Пауза
        </button>
        <button
          className={btnGrayClassName}
          type="button"
          aria-label="Выйти."
          p
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </section>
  );
}
