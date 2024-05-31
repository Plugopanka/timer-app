import React from "react";
import classNames from "classnames";
import styles from "./TimerItemPopup.module.scss";

export default function TimerItemPopup({
  item,
  onClose,
  currentMinutes,
  currentSeconds,
  pauseTimer,
  isRunning,
  resetTimer,
}) {
  console.log(item);
  let isItem = !!Object.keys(item).length;

  let sectionClassName = classNames(styles.popup, {
    [styles.popup_opened]: isItem,
  });
  let btnGrayClassName = classNames(
    styles.popup__button,
    styles.popup__button_gray
  );
  let btnOrangeClassName = classNames(
    styles.popup__button,
    styles.popup__button_orange
  );
  return (
    <section className={sectionClassName}>
      <div className={styles.heading}>
        <button className={styles.heading__button} onClick={onClose}>
          <p className={styles.heading__text}>Таймеры</p>
        </button>
      </div>
      {Object.keys(item).length > 1 && (
        <p className={styles.popup__text}>
          {currentMinutes != 0
            ? currentMinutes.toString().length > 1
              ? currentMinutes
              : "0" + currentMinutes
            : "00"}
          :
          {currentSeconds != 0
            ? currentSeconds.toString().length > 1
              ? currentSeconds
              : "0" + currentSeconds
            : "00"}
        </p>
      )}
      <div className={styles.popup__container}>
        <button
          className={btnOrangeClassName}
          type="button"
          aria-label="Выйти."
          onClick={pauseTimer}
        >
          {isRunning ? "Пауза" : "Возобновить"}
        </button>
        <button
          className={btnGrayClassName}
          type="button"
          aria-label="Выйти."
          p
          onClick={resetTimer}
        >
          Отмена
        </button>
      </div>
    </section>
  );
}
