import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const validUsers = [
  { username: "jaine", password: "143" },
  { username: "italo", password: "143" }
];

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const user = validUsers.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
      setTimeout(() => {
        onLogin(user.username);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Usuário ou senha incorretos");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background hearts animation */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romantic-pink text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl max-w-md w-full mx-4 relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-20 h-18 bg-romantic-pink heart-clip mx-auto mb-4 animate-heartbeat"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <h1 className="font-pacifico text-4xl text-romantic-light mb-2">
            Blog dos Namorados
          </h1>
          <p className="text-romantic-soft">
            Entre para acessar nosso espaço especial
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-romantic-soft" />
            <Input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-romantic-soft focus:border-romantic-pink"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-romantic-soft" />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-romantic-soft focus:border-romantic-pink"
              required
            />
          </div>

          {error && (
            <motion.p
              className="text-red-400 text-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-romantic text-white font-pacifico text-lg py-3 transition-all duration-300 hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <Heart className="w-5 h-5 inline mr-2" />
                Entrar
              </>
            )}
          </Button>
        </motion.form>

        <motion.div
          className="text-center mt-6 text-sm text-romantic-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Use: jaine ou italo | Senha: 143
        </motion.div>
      </motion.div>
    </div>
  );
}