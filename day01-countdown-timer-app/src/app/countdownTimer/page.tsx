"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, ChangeEvent } from "react";

export default function CountdownTimer() {
  let [enterInput, setEnterInput] = useState<number | string>("");
  let [leftTime, setLeftTime] = useState<number>(0);
  let [isActiveTimer, setIsActiveTimer] = useState<boolean>(false);
  let [isPausedTimer, setIsPausedTimer] = useState<boolean>(false);

  let timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetButton = () => {
    if (typeof enterInput === "number" && enterInput > 0) {
      setLeftTime(enterInput);
      setIsActiveTimer(false);
      setIsPausedTimer(false);

      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleStartButton = () => {
    if (leftTime > 0) {
      setIsActiveTimer(true);
      setIsPausedTimer(false);

      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handlePauseButton = () => {
    if (isActiveTimer) {
      setIsPausedTimer(true);
      setIsActiveTimer(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleResetButton = () => {
    setIsActiveTimer(false);
    setIsPausedTimer(false);
    setLeftTime(typeof enterInput === "number" ? enterInput : 0);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };

  useEffect(() => {
    if (isActiveTimer && !isPausedTimer) {
      timeRef.current = setInterval(() => {
        setLeftTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isActiveTimer, isPausedTimer]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEnterInput(Number(e.target.value) || "");
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800 gap-6">
        <div className="h-2/4 w-1/2 bg-white rounded-3xl">
          <h1 className="text-4xl from-neutral-900 font-bold text-center mt-2">Countdown Timer</h1>
          <div className="flex justify-center gap-6 mt-10">
            <Input
              onChange={handleDurationChange}
              id="duration"
              type="number"
              className="h-8 w-80 text-black"
              placeholder="Enter duration in seconds"
            />
            <Button
              onClick={handleSetButton}
              variant="outline"
              className="h-8 w-20 rounded-xl border-2 border-slate-800 hover:bg-slate-800 hover:text-white"
            >
              Set
            </Button>
          </div>
          <div className="flex justify-center mt-10 font-extrabold text-5xl">
            {formatTime(leftTime)}
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <Button
              onClick={handleStartButton}
              variant="outline"
              className="h-8 w-20 bg-white rounded-xl border-2 border-slate-800 hover:bg-slate-800 hover:text-white"
            >
              {isPausedTimer ? "Resume" : "Start"}
            </Button>
            <Button
              onClick={handlePauseButton}
              variant="outline"
              className="h-8 w-20 bg-white rounded-xl border-2 border-slate-800 hover:bg-slate-800 hover:text-white"
            >
              Pause
            </Button>
            <Button
              onClick={handleResetButton}
              variant="outline"
              className="h-8 w-20 bg-white rounded-xl border-2 border-slate-800 hover:bg-slate-800 hover:text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
