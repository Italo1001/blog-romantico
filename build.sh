
export BUN_DISABLE=true

echo "Instalando dependências com npm..."
npm install

echo "Construindo o client com Vite..."
npx vite build

echo "Construindo o server com esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
