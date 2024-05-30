import { Route, Routes, Navigate } from "react-router-dom";
import TimerList from "./components/pages/TimerList";
import NewTimerPopup from "./components/common/newTimerPopup/NewTimerPopup";
import TimerItemPopup from "./components/common/timerItemPopup/TimerItemPopup";
import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [targetItem, setTargetItem] = useState({});
  const [timerItems, setTimerItems] = useState([]);

  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [currentSeconds, setCurrentSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(null);

  function closeAllPopups() {
    setIsPopupOpen(false);
    setTargetItem({});
  }

  function startTimer() {
    if (minutes !== 0 || seconds !== 0) {
      const newItem = {
        id: "1",
        minutes,
        seconds,
        currentMinutes,
        currentSeconds,
      };
      console.log(newItem);
      setTimerItems([newItem, ...timerItems]);
      setTargetItem(newItem);
      setIsRunning(true);
      setIsPopupOpen(false);
    }
  }

  function pauseTimer() {
    setIsRunning(!isRunning);
  }

  function handleItemDelete(currentTimer) {
    const newItems = timerItems.filter((element) => {
      return element.id !== currentTimer.id;
    });
    setTimerItems(newItems);
    closeAllPopups();
  }

  function handleItemClick(item) {
    setTargetItem(item);
    console.log(targetItem);
  }

  function resetTimer() {
    setIsRunning(false);
    setCurrentSeconds(0);
    setCurrentMinutes(0);
    console.log(currentSeconds);
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (currentSeconds > 0) {
          setCurrentSeconds((currentSeconds) => currentSeconds - 1);
        } else if (currentMinutes > 0) {
          setCurrentMinutes((currentMinutes) => currentMinutes - 1);
          setCurrentSeconds(59);
        }

        setTimerItems([
          { id: "1", minutes, seconds, currentMinutes, currentSeconds },
        ]);
      }, 1000);
    }

    if (currentMinutes == 0 && currentSeconds == 1) {
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, currentSeconds, currentMinutes, isRunning]);

  useEffect(() => {
    setTimerItems(timerItems);
  }, [timerItems]);

  useEffect(() => {
    setTargetItem(targetItem);
  }, [targetItem]);

  return (
    <div className={styles.page}>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <TimerList
              timerItems={timerItems}
              onItemClick={setTargetItem}
              onItemDelete={handleItemDelete}
              onPopupOpen={setIsPopupOpen}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              handleItemDelete={handleItemDelete}
              handleItemClick={handleItemClick}
              isRunning={isRunning}
            />
          }
        />
      </Routes>
      <NewTimerPopup
        onClose={closeAllPopups}
        isOpen={isPopupOpen}
        setSeconds={setSeconds}
        setMinutes={setMinutes}
        setCurrentMinutes={setCurrentMinutes}
        setCurrentSeconds={setCurrentSeconds}
        minutes={minutes}
        seconds={seconds}
        startTimer={startTimer}
        setTimerItems={setTimerItems}
      />
      <TimerItemPopup
        onClose={closeAllPopups}
        item={targetItem}
        onItemDelete={handleItemDelete}
      />
    </div>
  );
}
