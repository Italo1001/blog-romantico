import { motion } from "framer-motion";

const plans = [
  {
    icon: "💒",
    title: "Casamento dos Sonhos",
    description: "Sonhamos com um casamento ao ar livre, cercado por nossa família e amigos, celebrando nosso amor eterno sob as estrelas."
  },
  {
    icon: "🌍",
    title: "Viagem pelo Mundo",
    description: "Queremos conhecer lugares incríveis juntos: Paris, Japão, Nova Zelândia... Colecionar memórias ao redor do mundo."
  },
  {
    icon: "👶",
    title: "Nossa Família",
    description: "Planejamos ter nossos próprios filhos e criar uma família cheia de amor, risadas e aventuras inesquecíveis."
  },
  {
    icon: "🏡",
    title: "Casa dos Sonhos",
    description: "Uma casa aconchegante com jardim, onde possamos receber nossa família e criar milhares de memórias especiais."
  },
  {
    icon: "📚",
    title: "Crescimento Juntos",
    description: "Queremos crescer juntos, aprender coisas novas, desenvolver hobbies em comum e nos apoiar em todos os nossos sonhos."
  },
  {
    icon: "🌅",
    title: "Envelhecer Juntos",
    description: "Nosso maior sonho é envelhecer lado a lado, de mãos dadas, contando nossas histórias para netos e bisnetos."
  }
];

export default function FuturePlans() {
  return (
    <motion.div
      className="bg-romantic-dark/30 backdrop-blur-lg rounded-3xl p-12 mx-4 border border-romantic-pink/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transition-all duration-300 relative group overflow-hidden hover:shadow-2xl hover:shadow-romantic-red/30"
            initial={{ opacity: 0, rotateY: -30 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Enhanced gradient overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/20 to-romantic-red/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl" />
            {/* Sparkle effect */}
            <div className="absolute top-2 right-2 w-4 h-4 bg-romantic-pink rounded-full opacity-0 group-hover:opacity-100 animate-sparkle" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-4 text-romantic-red">
                {plan.icon}
              </div>
              <div className="font-pacifico text-romantic-light text-xl mb-4">
                {plan.title}
              </div>
              <div className="text-romantic-soft leading-relaxed">
                {plan.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
