import { motion } from "framer-motion";

const timelineEvents = [
  {
    date: "Janeiro 2020",
    title: "Primeiro Encontro 💫",
    description: "Foi numa tarde ensolarada de janeiro que nossos caminhos se cruzaram. Um olhar, um sorriso, e soubemos que algo especial estava começando."
  },
  {
    date: "Março 2020",
    title: "Primeiro Beijo 💋",
    description: "Sob as estrelas, em uma noite mágica de março, selamos nosso amor com o primeiro beijo. O mundo parou e só existíamos nós dois."
  },
  {
    date: "Julho 2020",
    title: "Declaração de Amor 💖",
    description: '"Eu te amo" - três palavrinhas que mudaram tudo. Foi numa manhã de julho que nos declaramos e decidimos construir nosso futuro juntos.'
  },
  {
    date: "Dezembro 2020",
    title: "Nosso Primeiro Natal 🎄",
    description: "Nosso primeiro Natal juntos foi mágico. Decoramos a árvore, trocamos presentes e prometemos que seria o primeiro de muitos natais ao lado um do outro."
  }
];

export default function Timeline() {
  return (
    <motion.div
      className="bg-romantic-dark/30 backdrop-blur-lg rounded-3xl p-12 mx-4 border border-romantic-pink/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="timeline relative max-w-4xl mx-auto">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            className={`timeline-item relative bg-inherit w-1/2 p-4 ${
              index % 2 === 0 ? 'left-0' : 'left-1/2'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <motion.div
              className="timeline-content p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-romantic-red font-bold text-lg mb-3">
                {event.date}
              </div>
              <div className="text-romantic-light font-pacifico text-xl mb-3">
                {event.title}
              </div>
              <div className="text-romantic-soft leading-relaxed">
                {event.description}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
