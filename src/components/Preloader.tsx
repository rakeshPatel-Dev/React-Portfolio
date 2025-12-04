import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/*
  🌍 HELLO IN 10 POPULAR LANGUAGES
  Change / reorder freely
*/
const words = [
  "Hello",        // English
  "Hola",         // Spanish
  "Bonjour",      // French
  "Hallo",        // German
  "Ciao",         // Italian
  "नमस्ते",       // Hindi
  "سلام",         // Arabic
  "Konnichiwa",     // Japanese
  "Annyeong",     // Korean
  "Olá"           // Portuguese
];

interface PreloaderProps {
  onFinish: () => void; // function with no args, returns nothing
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const perWordTime = 200;
    const totalTime = words.length * perWordTime + 1200;
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, totalTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 1,
            delay: (words.length * 0.2) + 0.2,
            ease: "easeInOut",
          }}
          className="px-10 sm:px-4 md:px-0 fixed inset-0 dark:bg-[#f9f9f9] bg-black z-9999 flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center justify-center text-white dark:text-black text-7xl font-extrabold">
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
                  duration: 0.3,
                  times: [0, 0.35, 0.65, 1],
                  ease: "easeOut",
                  delay: i * 0.2,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
