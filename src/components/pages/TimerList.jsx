import React, { useState, useEffect } from "react";
import styles from "./TimerList.module.scss";
import TimerItem from "../common/timerItem/TimerItem";
import classNames from "classnames";

export default function TimerList({
  timerItems,
  onPopupOpen,
  pauseTimer,
  handleItemDelete,
  handleItemClick,
  isRunning,
}) {
  const [editMode, setEditMode] = useState({ isEdit: false, text: "Править" });

  function handleEditClick() {
    editMode.isEdit
      ? setEditMode({ isEdit: false, text: "Править" })
      : setEditMode({ isEdit: true, text: "Готово" });
  }

  let className = classNames(styles.heading__text, styles.heading__text_large);

  return (
    <>
      <div className={styles.heading}>
        <button className={styles.heading__button} onClick={handleEditClick}>
          <p className={styles.heading__text}>{editMode.text}</p>
        </button>
        <button
          className={styles.heading__button}
          onClick={() => onPopupOpen(true)}
        >
          <p className={className}>+</p>
        </button>
      </div>
      <h1 className={styles.title}>Таймеры</h1>
      <ul>
        {timerItems.length !== 0 &&
          timerItems.map((data) => (
            <TimerItem
              key={data.id}
              data={data}
              pauseTimer={pauseTimer}
              editMode={editMode.isEdit}
              onClick={() => {
                handleItemClick(data);
                setEditMode(false);
              }}
              onDelete={handleItemDelete}
              isRunning={isRunning}
            />
          ))}
      </ul>
    </>
  );
}
