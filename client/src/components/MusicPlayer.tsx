import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const songs = [
  { title: 'Perfect', artist: 'Ed Sheeran' },
  { title: 'All of Me', artist: 'John Legend' },
  { title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
  { title: 'A Thousand Years', artist: 'Christina Perri' },
  { title: 'Make You Feel My Love', artist: 'Adele' },
  { title: "Can't Help Myself", artist: 'Four Tops' }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
  };

  const currentSong = songs[currentSongIndex];

  return (
    <motion.div
      className="bg-romantic-dark/30 backdrop-blur-lg rounded-3xl p-12 mx-4 border border-romantic-pink/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Music Player */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
        <div className="text-center mb-6">
          <div className="font-pacifico text-romantic-light text-2xl mb-2">
            {currentSong.title}
          </div>
          <div className="text-romantic-soft text-lg">
            {currentSong.artist}
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <motion.button
            onClick={prevSong}
            className="bg-romantic-pink border-none rounded-full w-12 h-12 text-white text-xl cursor-pointer transition-all duration-300 hover:bg-romantic-red hover:scale-110 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={togglePlay}
            className="bg-romantic-pink border-none rounded-full w-16 h-16 text-white text-2xl cursor-pointer transition-all duration-300 hover:bg-romantic-red hover:scale-110 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>
          
          <motion.button
            onClick={nextSong}
            className="bg-romantic-pink border-none rounded-full w-12 h-12 text-white text-xl cursor-pointer transition-all duration-300 hover:bg-romantic-red hover:scale-110 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-romantic-pink to-romantic-red rounded-full"
            style={{ width: `${progress}%` }}
            animate={{ width: isPlaying ? '100%' : `${progress}%` }}
            transition={{ duration: isPlaying ? 30 : 0 }}
          />
        </div>
      </div>
      
      {/* Playlist */}
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <motion.li
            key={index}
            onClick={() => selectSong(index)}
            className={`bg-white/5 rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
              index === currentSongIndex
                ? 'bg-romantic-pink/20 border-romantic-pink/30'
                : 'border-transparent hover:bg-white/10 hover:border-romantic-pink/20'
            }`}
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-romantic-light font-medium">
                  {song.title}
                </span>
                <span className="text-romantic-soft ml-2">
                  - {song.artist}
                </span>
              </div>
              {index === currentSongIndex && (
                <div className="text-romantic-pink">♪</div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
