import styles from "./NewTimerPopup.module.scss";
import classNames from "classnames";

export default function NewTimerPopup({
  onClose,
  isOpen,
  setMinutes,
  setSeconds,
  minutes,
  seconds,
  startTimer,
  setCurrentMinutes,
  setCurrentSeconds
}) {
  function changeSeconds(e) {
    setSeconds(e.target.value);
    setCurrentSeconds(e.target.value);
  }
  function changeMinutes(e) {
    setMinutes(e.target.value);
    setCurrentMinutes(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    startTimer();
  }

  let className = classNames(styles.popup, { [styles.popup_opened]: isOpen });

  return (
    <section className={className}>
      <div className={styles.heading}>
        <button className={styles.heading__button} onClick={onClose}>
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
            value={minutes}
            onChange={changeMinutes}
          />
          <label className={styles.popup__label}>мин</label>

          <input
            className={styles.popup__input}
            placeholder="0"
            value={seconds}
            onChange={changeSeconds}
          />
          <label className={styles.popup__label}>сек</label>
        </div>
        <button
          type="submit"
          className={styles.popup__button}
          aria-label="Сохранить изменения."
          disabled={!minutes && !seconds}
        >
          Старт
        </button>
      </form>
    </section>
  );
}
