import styles from "./NewTimerPopup.module.scss";
import classNames from "classnames";
import React, { useRef } from "react";

export default function NewTimerPopup({
  isOpen,
  setTimerItems,
  setTargetItem,
  setIsNewPopupOpen,
  timerItems,
  setIsItemPopupOpen,
}) {
  const minField = useRef(null);
  const secField = useRef(null);

  function startTimer() {
    const minutes = minField.current.value;
    const seconds = secField.current.value;
    if (minutes > 0 || seconds > 0) {
      let uuid = self.crypto.randomUUID();
      const newItem = {
        id: uuid,
        minutes,
        seconds,
        currentMinutes: minutes,
        currentSeconds: seconds,
        isRunning: true,
      };
      console.log(newItem);
      setTimerItems([newItem, ...timerItems]);
      setTargetItem(newItem);
      setIsItemPopupOpen(true);
      setIsNewPopupOpen(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    startTimer();
    minField.current.value = "";
    secField.current.value = "";
  }

  let className = classNames(styles.popup, { [styles.popup_opened]: isOpen });

  return (
    <section className={className}>
      <div className={styles.popup__container}>
        <div className={styles.heading}>
          <button
            className={styles.heading__button}
            onClick={() => {
              setIsNewPopupOpen(false);
            }}
          >
            <p className={styles.heading__text}>Отменить</p>
          </button>
        </div>
        <form
          className={styles.popup__form}
          name="new-timer"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className={styles.popup__title}>Таймеры</h2>

          <div className="">
            <input
              className={styles.popup__input}
              placeholder="0"
              ref={minField}
            />
            <label className={styles.popup__label}>мин</label>

            <input
              className={styles.popup__input}
              placeholder="0"
              ref={secField}
            />
            <label className={styles.popup__label}>сек</label>
          </div>
          <button
            type="submit"
            className={styles.popup__button}
            aria-label="Сохранить изменения."
            // disabled={!minutes && !seconds}
          >
            Старт
          </button>
        </form>
      </div>
    </section>
  );
}
