import { Route, Routes, Navigate } from "react-router-dom";
import TimerList from "./components/pages/TimerList";
import NewTimerPopup from "./components/common/newTimerPopup/NewTimerPopup";
// import TimerItemPopup from "./components/common/timerItemPopup/TimerItemPopup";
import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";

export default function App() {
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [isItemPopupOpen, setIsItemPopupOpen] = useState(false);
  const [targetItem, setTargetItem] = useState({});
  const [timerItems, setTimerItems] = useState([]);

  return (
    <div className={styles.page}>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <TimerList
              timerItems={timerItems}
              setTimerItems={setTimerItems}
              setIsNewPopupOpen={setIsNewPopupOpen}
              setTargetItem={setTargetItem}
              targetItem={targetItem}
              isItemPopupOpen={isItemPopupOpen}
              setIsItemPopupOpen={setIsItemPopupOpen}
            />
          }
        />
      </Routes>
      <NewTimerPopup
        isOpen={isNewPopupOpen}
        setTimerItems={setTimerItems}
        setTargetItem={setTargetItem}
        setIsNewPopupOpen={setIsNewPopupOpen}
        timerItems={timerItems}
        setIsItemPopupOpen={setIsItemPopupOpen}
      />
    </div>
  );
}
