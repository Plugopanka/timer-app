import DeleteIcon from "../../../assets/images/DeleteIcon.svg";
import ArrorIcon from "../../../assets/images/ArrorIcon.svg";
import PlayIcon from "../../../assets/images/PlayIcon.svg";
import PauseIcon from "../../../assets/images/PauseIcon.svg";
import styles from "./TimerItem.module.scss";
import classNames from "classnames";

export default function TimerItem({
  data,
  onClick,
  pauseTimer,
  editMode,
  onDelete,
  isRunning,
}) {
  let className = classNames(styles.timer__button, styles.timer__button_right);
  console.log(data);
  return (
    <li className={styles.timer}>
      {editMode && (
        <button
          className={styles.timer__button}
          onClick={() => {
            onDelete(data);
          }}
        >
          <img src={DeleteIcon} alt="" />
        </button>
      )}
      <div className="">
        <h2 className={styles.timer__title}>
          {data.currentMinutes != 0
            ? data.currentMinutes.toString().length > 1
              ? data.currentMinutes
              : "0" + data.currentMinutes
            : "00"}
          :
          {data.currentSeconds != 0
            ? data.currentSeconds.toString().length > 1
              ? data.currentSeconds
              : "0" + data.currentSeconds
            : "00"}
        </h2>
        <p className={styles.timer__text}>
          {data.minutes && `${data.minutes} мин`}{" "}
          {data.seconds && `${data.seconds} сек`}
        </p>
      </div>

      {!editMode && (
        <button className={className} onClick={pauseTimer}>
          <img src={isRunning ? PauseIcon : PlayIcon} alt="" />
        </button>
      )}
      {editMode && (
        <button className={className} onClick={onClick}>
          <img src={ArrorIcon} alt="" />
        </button>
      )}
    </li>
  );
}
