"use client";

import { Copy } from "lucide-react";
import { useState, useEffect } from "react";

interface CopyCodeProps {
  text: string;
}

export function CopyCode({ text }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);

  const duration = 3000; // 3 seconds

  useEffect(() => {
    if (copied) {
      // Show confirmation after a small delay
      const showTimer = setTimeout(() => setShowConfirmation(true), 200);

      // Animate progress bar
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (elapsed >= duration) {
          clearInterval(interval);
          setShowConfirmation(false);
          setTimeout(() => {
            setCopied(false);
            setProgress(0);
          }, 200);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative flex items-center justify-center border rounded-full px-6 py-3 min-w-82 h-16 overflow-hidden">
        {/* Progress bar */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-black dark:bg-white"
          style={{
            width: `${progress}%`,
            opacity: copied ? 1 : 0,
            transition: "opacity 0.3s ease, width 0.2s linear",
          }}
        />

        {/* Code & Copy button */}
        <div
          className="absolute inset-0 flex items-center justify-between pl-10 pr-1"
          style={{
            opacity: copied ? 0 : 1,
            filter: copied ? "blur(8px)" : "blur(0px)",
            transform: copied ? "scale(0.95)" : "scale(1)",
            transition: "all 0.3s ease",
            pointerEvents: copied ? "none" : "auto",
            zIndex: copied ? 0 : 20,
          }}
        >
          <span
            title="Click to copy"
            onClick={handleCopy}
            className="text-base font-medium tracking-wide text-black dark:text-white select-none cursor-pointer hover:opacity-80 transition-all">
            {text}
          </span>
          <div className=" px-6 ">
            <button
              title="Copy"
              onClick={handleCopy}
              className=" font-medium border p-2 hover:bg-muted text-lg rounded-lg cursor-pointer select-none transition-all duration-200 active:scale-95"
            >
              <Copy />
            </button>
          </div>
        </div>

        {/* Confirmation */}
        <div
          className="relative flex items-center gap-3"
          style={{
            opacity: showConfirmation ? 1 : 0,
            filter: showConfirmation ? "blur(0px)" : "blur(8px)",
            transform: showConfirmation ? "scale(1)" : "scale(1.05)",
            transition: "all 0.5s ease",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white dark:text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: showConfirmation ? 0 : 24,
                  transition:
                    "stroke-dashoffset 0.4s ease 0.1s",
                }}
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-black dark:text-white">
            Copied to Clipboard!
          </span>
        </div>
      </div>
    </div>
  );
}
