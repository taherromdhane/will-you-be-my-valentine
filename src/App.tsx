"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import audioFile from "/will-you-be-my-valentine/assets/DO YOU LOVE ME.mp3";

export default function Page() {
  const [step, setStep] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const yesButtonSize = noCount * 20 + 16;
  let audio = new Audio(audioFile);

  const getAudioTimeForStep = (step: number) => {
    return [
      49,
      53.5,
      57,
      61
    ][Math.min(step-2, 3)]
  }

  useLayoutEffect(() => {
    let startPlayStep = step;
    if (step >= 2 && step <= 5)
    {
      audio.pause();
      audio.currentTime = getAudioTimeForStep(step);
      audio.play();
      setTimeout(() => {if (step <= 4 && startPlayStep == step) audio.pause();}, 4000)
    }
  }, [step])

  useEffect(()=>{
    setShowBtn(false);
    setTimeout(()=>{
      setShowBtn(true);
    },1000)
   },[step])

  const handleYesClick = () => {
    setNoCount(0);
    setStep(step + 1);
  };

  const getStepQuestionText = () => {
    const phrases = [
      "Hey kiki, I have very important questions for you",
      "Do you love me?",
      "Do you need me?",
      "Do you want me?",
      "(a bit late but whatever) Will you be my valentine, kiki?"
    ];

    return phrases[Math.min(step-1, phrases.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getYesButtonText = () => {
    if (step == 1) return "I'd love to hear them!";
    if (step <= 4) return "Do you";
    return "Yes";
  }

  const getNoButtonText = () => {
    const phrases = [
      (step >= 2 && step <= 4 ? "Do you?" : "haeh"),
      "Are you sure?",
      "What if I asked really nicely?",
      "Baliiiz",
      "Baliiiz",
      "Baliiiz",
      "With a white chocolate piece on top",
      "What about a velvet cake ?",
      "BALIIZ KIKI",
      "But :*(",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "Estoy muerto",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {step>=6 ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="my-4 text-4xl font-bold">WOOOOOO!!! I love you kiki!! ;))</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          />
          <h1 className="my-4 text-4xl">{getStepQuestionText()}</h1>
          {showBtn && <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              {getYesButtonText()}
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {getNoButtonText()}
            </button>
          </div>
          }
        </>
      )}
    </div>
  );
}
