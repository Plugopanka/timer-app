import React, { useState, useEffect } from "react";
import styles from "./TimerList.module.scss";
import TimerItem from "../common/timerItem/TimerItem";
import classNames from "classnames";

export default function TimerList({
  timerItems,
  setTimerItems,
  setIsNewPopupOpen,
  setTargetItem,
  targetItem,
  isItemPopupOpen,
  setIsItemPopupOpen,
}) {
  const [editMode, setEditMode] = useState({ isEdit: false, text: "Править" });

  function handleEditClick() {
    editMode.isEdit
      ? setEditMode({ isEdit: false, text: "Править" })
      : setEditMode({ isEdit: true, text: "Готово" });
  }

  useEffect(() => {
    setEditMode({ isEdit: false, text: "Править" });
  }, [targetItem]);

  let className = classNames(styles.heading__text, styles.heading__text_large);

  return (
    <>
      <div className={styles.heading}>
        <button className={styles.heading__button} onClick={handleEditClick}>
          <p className={styles.heading__text}>{editMode.text}</p>
        </button>
        <button
          className={styles.heading__button}
          onClick={() => setIsNewPopupOpen(true)}
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
              timerItems={timerItems}
              setTimerItems={setTimerItems}
              editMode={editMode.isEdit}
              setTargetItem={setTargetItem}
              targetItem={targetItem}
              setEditMode={setEditMode}
              isItemPopupOpen={isItemPopupOpen}
              setIsItemPopupOpen={setIsItemPopupOpen}
            />
          ))}
      </ul>
    </>
  );
}
