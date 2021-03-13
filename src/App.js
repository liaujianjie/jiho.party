import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { startPhysics, jizzho } from "./physics";

export default function App() {
  const audioRef = useRef(null);
  const [choochoo, updateChoochoo] = useState(false);

  // Start physics on mount.
  useEffect(() => {
    startPhysics();
  }, []);

  // Shoot jizzho on keypress.
  useEffect(() => {
    window.addEventListener("keypress", jizzho);
    return () => {
      window.removeEventListener("keypress", jizzho);
    };
  });

  // Shoot jizzho on every beat.
  useEffect(() => {
    if (!choochoo) {
      return;
    }
    const interval = setInterval(jizzho, 612);
    return () => clearInterval(interval);
  }, [choochoo]);

  return (
    <div
      className="App"
      id="App"
      onClick={() => {
        if (!!audioRef.current.paused) {
          audioRef.current.volume = 0.1;
          audioRef.current.play();
          updateChoochoo(true);
        } else {
          // audioRef.current.pause();
        }
      }}
    >
      <img
        className="choo-choo-motherfucker"
        src={choochoo ? "/jiho-choo-choo.jpg" : undefined}
      />
      {/* preload jizzho face */}
      <img src="/jizzho.png" style={{ opacity: 0 }} />
      <img src="/jiho-choo-choo.jpg" style={{ opacity: 0 }} />
      <audio ref={audioRef} src="/thomas-choo-choo.mp3" loop />
    </div>
  );
}
