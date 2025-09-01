# Sachin Burnwal Portfolio

A modern, interactive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with dark/light theme support
- 🌍 Interactive 3D Earth with orbiting skills
- ✨ Smooth animations with GSAP and Framer Motion
- 📱 Responsive design
- 🎯 TypeScript for type safety
- 🎭 Beautiful UI components with shadcn/ui

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment to Vercel

This project is optimized for deployment on Vercel:

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build settings

2. **Environment Variables (if needed):**
   - Add any environment variables in the Vercel dashboard
   - This project doesn't require any specific environment variables

3. **Build Settings:**
   - **Framework Preset:** Next.js
   - **Build Command:** `pnpm build`
   - **Install Command:** `pnpm install`
   - **Output Directory:** `.next`

4. **Deploy:**
   - Vercel will automatically deploy on every push to your main branch
   - Preview deployments are created for pull requests

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** GSAP, Framer Motion
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Project Structure

```
sachin-portfolio/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── effects/         # Animation and effect components
│   ├── sections/        # Page sections
│   └── ui/             # shadcn/ui components
├── public/             # Static assets
│   └── assets/3d/      # 3D textures
├── vercel.json         # Vercel configuration
└── styles/             # Global styles
```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed: `pnpm install`
2. Clear Next.js cache: `rm -rf .next`
3. Restart the development server: `pnpm dev`
4. For deployment issues, check Vercel build logs

## License

This project is private and proprietary.
