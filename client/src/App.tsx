import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import LoginForm from "@/components/LoginForm";
import HeartExplosion from "@/components/HeartExplosion";
import Home from "@/pages/Home";
import PhotoModal from "@/components/PhotoModal";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check for heart explosion trigger when user scrolls to bottom
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setShowHeartExplosion(true);
      }
    };

    if (isLoggedIn) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoggedIn]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = '';
  };

  if (!isLoggedIn) {
    return (
      <>
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>
        {!isLoading && <LoginForm onLogin={handleLogin} />}
      </>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      <ParticleBackground />
      
      <motion.div
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none gradient-overlay mix-blend-screen transition-all duration-300"
        id="gradient-overlay"
      />
      
      <Navigation />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <Home onOpenModal={openModal} />
      </div>
      
      <PhotoModal 
        imageSrc={modalImage} 
        isOpen={!!modalImage} 
        onClose={closeModal} 
      />

      <HeartExplosion isVisible={showHeartExplosion} />
      
      <audio autoPlay loop preload="auto" className="hidden">
        <source src="https://www.bensound.com/bensound-music/bensound-love.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
