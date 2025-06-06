import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RelationshipCounter() {
  const [timeData, setTimeData] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const startDate = new Date('2024-10-07T19:00:00');
    
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeData({ years, months, days, hours });
    };
    
    updateCounter();
    const interval = setInterval(updateCounter, 60000); // Update every minute for more accuracy
    
    return () => clearInterval(interval);
  }, []);

  const counterItems = [
    { value: timeData.years, label: "Anos" },
    { value: timeData.months, label: "Meses" },
    { value: timeData.days, label: "Dias" },
    { value: timeData.hours, label: "Horas" },
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-romantic-pink/20 to-romantic-red/20 backdrop-blur-romantic rounded-3xl p-12 mx-4 border border-white/20 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="font-pacifico text-romantic-light text-4xl mb-8">
        Nosso Tempo Juntos
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
        {counterItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-4xl font-bold text-romantic-red block mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              {item.value}
            </motion.span>
            <span className="text-romantic-soft text-sm uppercase tracking-wider font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
