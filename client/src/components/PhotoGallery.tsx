import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583391733981-3ac5c05c7a38?ixlib=rb-4.0.3&w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&w=400&h=500&fit=crop'
];

interface PhotoGalleryProps {
  onOpenModal: (imageSrc: string) => void;
}

export default function PhotoGallery({ onOpenModal }: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      className="mx-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center italic text-lg text-romantic-soft/80 mb-4 font-semibold">
        Use as setas para navegar pelas fotos no estilo polaroide.
      </div>
      
      <div className="relative bg-romantic-dark/50 backdrop-blur-lg rounded-2xl shadow-romantic-lg p-4 max-h-[480px] w-full max-w-6xl mx-auto overflow-hidden flex justify-center items-center border border-white/10">
        {/* Navigation Arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-romantic-pink/90 backdrop-blur-lg border-none rounded-full w-12 h-12 text-white text-2xl cursor-pointer shadow-lg transition-all duration-300 hover:bg-romantic-pink hover:scale-110 z-20"
        >
          <ChevronLeft className="w-6 h-6 mx-auto" />
        </button>
        
        <button
          onClick={nextPhoto}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-romantic-pink/90 backdrop-blur-lg border-none rounded-full w-12 h-12 text-white text-2xl cursor-pointer shadow-lg transition-all duration-300 hover:bg-romantic-pink hover:scale-110 z-20"
        >
          <ChevronRight className="w-6 h-6 mx-auto" />
        </button>

        {/* Gallery */}
        <div className="relative w-80 h-96 perspective-[1500px]">
          {photos.map((photo, index) => {
            let className = "absolute w-80 h-96 border-[12px] border-white rounded-xl overflow-hidden transition-all duration-700 cursor-pointer select-none";
            let transform = "";
            let opacity = 1;
            let zIndex = 1;

            if (index === currentPhotoIndex) {
              className += " z-10";
              transform = "translateX(0) rotateY(0deg) scale(1)";
              opacity = 1;
              zIndex = 10;
            } else if (index < currentPhotoIndex) {
              transform = "translateX(-350px) rotateY(45deg) scale(0.7)";
              opacity = 0.3;
              zIndex = 1;
            } else {
              transform = "translateX(350px) rotateY(-45deg) scale(0.7)";
              opacity = 0.3;
              zIndex = 1;
            }

            return (
              <motion.div
                key={index}
                className={className}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter: "drop-shadow(0 15px 8px rgba(182,38,71,0.7))",
                  backfaceVisibility: "hidden",
                }}
                onClick={() => index === currentPhotoIndex && onOpenModal(photo)}
                whileHover={index === currentPhotoIndex ? { scale: 1.02 } : {}}
              >
                <img
                  src={photo}
                  alt={`Foto do casal ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
