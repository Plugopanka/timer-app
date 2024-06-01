import DeleteIcon from "../../../assets/images/DeleteIcon.svg";
import ArrorIcon from "../../../assets/images/ArrorIcon.svg";
import PlayIcon from "../../../assets/images/PlayIcon.svg";
import PauseIcon from "../../../assets/images/PauseIcon.svg";
import styles from "./TimerItem.module.scss";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import TimerItemPopup from "../timerItemPopup/TimerItemPopup";

export default function TimerItem({
  data,
  editMode,
  timerItems,
  setTimerItems,
  setTargetItem,
  setEditMode,
  targetItem,
  isItemPopupOpen,
  setIsItemPopupOpen,
}) {
  const [currentMinutes, setCurrentMinutes] = useState(data.minutes);
  const [currentSeconds, setCurrentSeconds] = useState(data.seconds);
  const [isRunning, setIsRunning] = useState(data.isRunning);

  function pauseTimer() {
    setIsRunning(!isRunning);
  }

  function handleItemDelete() {
    const newItems = timerItems.filter((element) => {
      return element.id !== data.id;
    });
    setTimerItems(newItems);
  }

  function handleItemClick() {
    setTargetItem(data);
    setEditMode({ isEdit: false, text: "Править" });
  }

  useEffect(() => {
    data.currentMinutes = currentMinutes;
    data.currentSeconds = currentSeconds;
  }, [currentSeconds, currentMinutes, isRunning]);

  let className = classNames(styles.timer__button, styles.timer__button_right);
  return (
    <>
      <li className={styles.timer}>
        {editMode && (
          <button className={styles.timer__button} onClick={handleItemDelete}>
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
          <button
            className={className}
            // onClick={() => setIsItemPopupOpen(true)}
            onClick={handleItemClick}
          >
            <img src={ArrorIcon} alt="" />
          </button>
        )}
      </li>
      <TimerItemPopup
        item={data}
        setTargetItem={setTargetItem}
        targetItem={targetItem}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        currentSeconds={currentSeconds}
        setCurrentSeconds={setCurrentSeconds}
        currentMinutes={currentMinutes}
        setCurrentMinutes={setCurrentMinutes}
        isOpen={isItemPopupOpen}
        setIsItemPopupOpen={setIsItemPopupOpen}
      />
    </>
  );
}
