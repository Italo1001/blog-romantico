import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "O amor não é sobre encontrar a pessoa perfeita, mas sobre ver uma pessoa imperfeita perfeitamente.",
    author: "Sam Keen"
  },
  {
    text: "Ser profundamente amado por alguém te dá força, enquanto amar alguém profundamente te dá coragem.",
    author: "Lao Tzu"
  },
  {
    text: "O amor é a única força capaz de transformar um inimigo em amigo.",
    author: "Martin Luther King Jr."
  },
  {
    text: "Em todo o mundo, não há coração para mim como o seu. Em todo o mundo, não há amor para você como o meu.",
    author: "Maya Angelou"
  }
];

export default function QuoteCarousel() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mx-4 my-16 border border-white/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center min-h-[200px] flex items-center justify-center flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <blockquote className="font-dancing text-4xl md:text-5xl text-romantic-light italic leading-relaxed">
              "{quotes[currentQuote].text}"
            </blockquote>
            <cite className="text-romantic-soft text-xl font-medium not-italic">
              - {quotes[currentQuote].author}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentQuote
                ? 'bg-romantic-pink scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}
