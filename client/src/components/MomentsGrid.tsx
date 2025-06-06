import { motion } from "framer-motion";

const moments = [
  {
    icon: "🌹",
    title: "Primeira Rosa",
    date: "14 de Fevereiro, 2020",
    description: "A primeira rosa vermelha que você me deu, ainda guardo as pétalas secas em nosso álbum de memórias."
  },
  {
    icon: "🏖️",
    title: "Viagem à Praia",
    date: "15 de Agosto, 2020",
    description: "Nossa primeira viagem juntos! Três dias de sol, mar e muito amor. Construímos castelos de areia e sonhos."
  },
  {
    icon: "🍰",
    title: "Aniversário Surpresa",
    date: "5 de Novembro, 2021",
    description: "A festa surpresa que você organizou para mim. Nunca vou esquecer sua dedicação e carinho."
  },
  {
    icon: "🏠",
    title: "Nossa Primeira Casa",
    date: "20 de Janeiro, 2022",
    description: "O dia em que pegamos as chaves do nosso primeiro lar juntos. Um novo capítulo da nossa história começou."
  },
  {
    icon: "💍",
    title: "Pedido de Namoro",
    date: "12 de Setembro, 2021",
    description: "Com o coração acelerado, você me pediu oficialmente em namoro. Foi o 'sim' mais fácil da minha vida."
  },
  {
    icon: "🎓",
    title: "Formatura Juntos",
    date: "15 de Dezembro, 2021",
    description: "Nos formamos no mesmo semestre e comemoramos juntos essa conquista tão importante."
  }
];

export default function MomentsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">
      {moments.map((moment, index) => (
        <motion.div
          key={index}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-300 relative overflow-hidden group hover:shadow-2xl hover:shadow-romantic-pink/40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          {/* Enhanced shimmer effect */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-romantic-pink/20 to-transparent transition-all duration-500 group-hover:left-full" />
          {/* Glow border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-romantic-pink/30 to-romantic-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          <div className="text-6xl mb-4 text-center">
            {moment.icon}
          </div>
          <div className="font-pacifico text-romantic-light text-2xl text-center mb-4">
            {moment.title}
          </div>
          <div className="text-romantic-red font-bold text-center mb-4">
            {moment.date}
          </div>
          <div className="text-romantic-soft leading-relaxed text-center">
            {moment.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
