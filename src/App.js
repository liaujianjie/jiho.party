import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { startPhysics, jizzho } from "./physics";

export default function App() {
  const audioRef = useRef(null);
  const [choochoo, updateChoochoo] = useState(false);

  useEffect(() => {
    startPhysics();
  }, []);

  useEffect(() => {
    // document.getElementById("App").addEventListener("click", jizzho);
    window.addEventListener("keypress", jizzho);
    return () => {
      // document.getElementById("App").removeEventListener("click", jizzho);
      window.removeEventListener("keypress", jizzho);
    };
  });

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
      onMouseDown={() => {
        //..
      }}
      onMouseUp={() => {
        //..
      }}
    >
      <img
        className="choo-choo-motherfucker"
        src={choochoo ? "/jiho-choo-choo.jpg" : undefined}
        // style={{ opacity: choochoo ? 1 : 0 }}
      />
      {/* <div className="thanku">Thank u for being an amazing friend</div> */}
      {/* preload jizzho face */}
      <img src="/jizzho.png" style={{ opacity: 0 }} />
      <audio ref={audioRef} src="/thomas-choo-choo.mp3" loop />
    </div>
  );
}
