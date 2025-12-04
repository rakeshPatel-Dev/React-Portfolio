import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/*
  🌍 HELLO IN 10 POPULAR LANGUAGES
  Change / reorder freely
*/
const words = [
  "Hello",      // English
  "Hola",       // Spanish
  "Bonjour",    // French
  "Hallo",      // German
  "Ciao",       // Italian
  "Namaste",    // Hindi
  "Salaam",     // Arabic
  "Konnichiwa", // Japanese
  "Annyeong",   // Korean
  "Olá"         // Portuguese
];

export default function Preloader({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    /*
      ⏱ Timing
      perWordTime = 500ms → not too slow, not too fast
      backgroundSlideTime = 1200ms
    */
    const perWordTime = 200;
    const totalTime = words.length * perWordTime + 1200;
    console.log(totalTime);

    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, totalTime);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 1,
        delay: (words.length * 0.2) + 0.2, // match word time
        ease: "easeInOut",
      }}
      className="fixed inset-0 bg-[#ffffcc] dark:bg-black z-9999 flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center dark:text-white text-black text-7xl font-extrabold">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.4, 1.8, 0],
            }}
            transition={{
              duration: 0.3,         // faster popping
              times: [0, 0.35, 0.65, 1],
              ease: "easeOut",
              delay: i * 0.2,       // each word comes in sequence
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
