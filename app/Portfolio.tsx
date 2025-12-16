import React, { useState, useEffect } from "react";
import "./index.css";
import GameCanvas from "./GameCanvas";

export default function Portfolio() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Styles moved to index.css */}

      <div className="container">
        <div className="topbar">
          <h1>
            Nguyen Thai Son{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
              / Software Engineer
            </span>
          </h1>
          <div className="controls">
            {!isGameOpen && (
              <button onClick={() => setIsGameOpen(true)}>Play Game</button>
            )}
            {isGameOpen && (
              <button
                className="secondary"
                onClick={() => setIsGameOpen(false)}
              >
                Exit Game
              </button>
            )}
          </div>
        </div>

        <GameCanvas isGameOpen={isGameOpen} setIsGameOpen={setIsGameOpen} />
      </div>
    </>
  );
}
