import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import RelationshipCounter from "@/components/RelationshipCounter";
import Timeline from "@/components/Timeline";
import MomentsGrid from "@/components/MomentsGrid";
import QuoteCarousel from "@/components/QuoteCarousel";
import PhotoGallery from "@/components/PhotoGallery";
import MusicPlayer from "@/components/MusicPlayer";
import FuturePlans from "@/components/FuturePlans";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface HomeProps {
  onOpenModal: (imageSrc: string) => void;
}

export default function Home({ onOpenModal }: HomeProps) {
  const handleHeartClick = () => {
    const loveMessage = document.getElementById('love-message');
    if (loveMessage) {
      loveMessage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTimeline = () => {
    const timeline = document.getElementById('nossa-historia');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Home Section */}
      <section id="home" className="section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.header
            variants={fadeInUp}
            className="gradient-romantic text-white p-8 text-center font-pacifico text-5xl md:text-6xl text-shadow-romantic rounded-3xl mx-4 flex justify-center items-center gap-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
            <span className="flex items-center gap-3 relative z-10">
              Blog dos Namorados{" "}
              <span className="text-6xl animate-float">❤️</span>
            </span>
            <button
              onClick={handleHeartClick}
              className="w-10 h-9 bg-gradient-to-r from-romantic-red to-romantic-dark heart-clip filter drop-shadow-lg hover:scale-125 hover:-rotate-12 transition-all duration-300 relative z-10"
              aria-label="Mensagem especial"
            />
          </motion.header>

          {/* Main Content */}
          <motion.main
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-romantic rounded-2xl shadow-romantic p-8 mx-4 border border-white/20"
          >
            <h2 className="font-pacifico text-romantic-light text-4xl text-center text-shadow-romantic mb-6">
              Bem-vindo ao nosso espaço especial!
            </h2>
            <div className="space-y-6 text-romantic-soft text-lg leading-relaxed">
              <p className="text-justify">
                Que tal espalhar amor neste Dia dos Namorados? Aqui você encontra nossa história, momentos especiais,
                fotos lindas e tudo que faz nosso amor único. Personalize sua experiência e aproveite a magia do amor
                com animações lindas e interações divertidas!
              </p>
              <p className="text-justify">
                Explore cada seção e descubra os detalhes da nossa jornada juntos:
              </p>
            </div>
            <motion.button
              onClick={scrollToTimeline}
              className="gradient-romantic text-white border-none p-4 text-xl rounded-full cursor-pointer font-pacifico shadow-lg animate-heartbeat transition-all duration-300 hover:shadow-2xl hover:shadow-romantic-pink/60 hover:-translate-y-1 mx-auto mt-6 block min-w-48 text-center relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-romantic-pink/40 to-romantic-red/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
              <span className="relative z-10">Começar Jornada 💕</span>
            </motion.button>
          </motion.main>

          {/* Relationship Counter */}
          <motion.div variants={fadeInUp}>
            <RelationshipCounter />
          </motion.div>
        </motion.div>
      </section>

      {/* Nossa História Section */}
      <section id="nossa-historia" className="section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-pacifico text-5xl text-center text-romantic-light mb-12 text-shadow-romantic relative"
        >
          Nossa História
          <motion.div
            className="text-4xl mt-2 block animate-float"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.h1>
        <Timeline />
      </section>

      {/* Momentos Especiais Section */}
      <section id="momentos" className="section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-pacifico text-5xl text-center text-romantic-light mb-12 text-shadow-romantic relative"
        >
          Momentos Especiais
          <motion.div
            className="text-4xl mt-2 block animate-float"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.h1>
        <MomentsGrid />
      </section>

      {/* Quote Carousel */}
      <QuoteCarousel />

      {/* Fotos Section */}
      <section id="fotos" className="section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-pacifico text-5xl text-center text-romantic-light mb-12 text-shadow-romantic relative"
        >
          Nosso Álbum de Fotos
          <motion.div
            className="text-4xl mt-2 block animate-float"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.h1>
        <PhotoGallery onOpenModal={onOpenModal} />
        
        <motion.div
          id="love-message"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto mt-8 bg-gradient-to-br from-white to-pink-50 text-gray-800 p-8 rounded-[60px_30px_60px_30px] shadow-2xl text-center text-xl relative overflow-hidden"
        >
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-romantic-pink/10 to-transparent animate-shimmer" />
          <p className="relative z-10">
            Cada foto conta uma história, cada momento é uma página no livro do nosso amor. 
            Você é a luz da minha vida e a razão do meu sorriso. Sempre seu, para sempre meu. 💖
          </p>
        </motion.div>
      </section>

      {/* Playlist Section */}
      <section id="playlist" className="section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-pacifico text-5xl text-center text-romantic-light mb-12 text-shadow-romantic relative"
        >
          Playlist do Amor
          <motion.div
            className="text-4xl mt-2 block animate-float"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.h1>
        <MusicPlayer />
      </section>

      {/* Planos Futuros Section */}
      <section id="planos" className="section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-pacifico text-5xl text-center text-romantic-light mb-12 text-shadow-romantic relative"
        >
          Planos Futuros
          <motion.div
            className="text-4xl mt-2 block animate-float"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.h1>
        <FuturePlans />
      </section>
    </div>
  );
}
