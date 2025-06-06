import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PhotoModalProps {
  imageSrc: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoModal({ imageSrc, isOpen, onClose }: PhotoModalProps) {
  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-romantic-dark/95 backdrop-blur-lg flex items-center justify-center z-[300]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh] rounded-3xl overflow-hidden bg-romantic-dark/50 animate-modal-slide-in"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 bg-romantic-pink/80 backdrop-blur-lg border-none rounded-full w-9 h-9 text-2xl text-white cursor-pointer shadow-lg transition-all duration-300 hover:bg-romantic-pink hover:scale-110 z-[310] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={imageSrc}
            alt="Foto ampliada"
            className="w-full h-auto block rounded-3xl pointer-events-none select-none"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
