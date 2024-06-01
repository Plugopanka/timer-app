import classNames from "classnames";
import styles from "./TimerItemPopup.module.scss";
import React, { useState, useEffect } from "react";

export default function TimerItemPopup({
  item,
  // onClose,
  setTargetItem,
  targetItem,
  isRunning,
  setIsRunning,
  currentSeconds,
  setCurrentSeconds,
  currentMinutes,
  setCurrentMinutes,
  is2PopupOpen,
  set2IsPopupOpen,
}) {
  let isItem = !!Object.keys(item).length;

  const isTarget = targetItem?.id === item.id;

  // const [currentMinutes, setCurrentMinutes] = useState(item.currentMinutes);
  // const [currentSeconds, setCurrentSeconds] = useState(item.currentSeconds);
  // const [isRunning, setIsRunning] = useState(item.isRunning);

  console.log(item);
  console.log(currentSeconds);

  function pauseTimer() {
    setIsRunning(!isRunning);
    item.isRunning = isRunning;
  }

  function resetTimer() {
    setIsRunning(false);
    setCurrentSeconds(item.seconds);
    setCurrentMinutes(item.minutes);
    item.currentMinutes = currentMinutes;
    item.currentSeconds = currentSeconds;
  }
  console.log(targetItem);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (currentSeconds > 0) {
          setCurrentSeconds((currentSeconds) => currentSeconds - 1);
        } else if (currentMinutes > 0) {
          setCurrentMinutes((currentMinutes) => currentMinutes - 1);
          setCurrentSeconds(59);
        } else if (currentSeconds < 1) {
          setCurrentSeconds(0);
        }

        item.currentMinutes = currentMinutes;
        item.currentSeconds = currentSeconds;
      }, 1000);
    }

    if (currentMinutes == 0 && currentSeconds == 0) {
      setCurrentSeconds(0);
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [currentSeconds, currentMinutes, isRunning]);

  let sectionClassName = classNames(styles.popup, {
    [styles.popup_opened]: isTarget,
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
      <div className={styles.popup__container}>
        <div className={styles.heading}>
          <button
            className={styles.heading__button}
            onClick={() => setTargetItem(null)}
          >
            <p className={styles.heading__text}>Таймеры</p>
          </button>
        </div>
        {Object.keys(item).length > 1 && (
          <p className={styles.popup__text}>
            {currentMinutes != undefined
              ? currentMinutes.toString().length > 1
                ? currentMinutes
                : "0" + currentMinutes
              : "00"}
            :
            {currentSeconds != undefined
              ? currentSeconds.toString().length > 1
                ? currentSeconds
                : "0" + currentSeconds
              : "00"}
          </p>
        )}
        <div className={styles.popup__btncontainer}>
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
            onClick={resetTimer}
          >
            Отмена
          </button>
        </div>
      </div>
    </section>
  );
}
