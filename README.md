# Stock Analyzer - StockWise Analytics

A modern Next.js 14 stock analysis application built with TypeScript, Tailwind CSS, and Supabase for authentication and data management.

## 🚀 Features

- **Next.js 14** - Latest version with improved performance and features
- **React 18** - Latest React version with enhanced capabilities
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Supabase** - Backend-as-a-Service for authentication and database
- **Stock Analysis** - Comprehensive stock analysis and portfolio management tools

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- A Supabase account and project ([Create one here](https://supabase.com))

## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. Set up Supabase:
  
  a. Create a new project on [Supabase](https://supabase.com)
  
  b. Copy `.env.example` to `.env.local`:
  ```bash
  cp .env.example .env.local
  ```
  
  c. Update `.env.local` with your Supabase credentials:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
  ```
  
  You can find these values in your Supabase project settings under **Project Settings > API**.
  
  d. Run the database migrations:
  ```bash
  # Install Supabase CLI if you haven't already
  npm install -g supabase
  
  # Link to your Supabase project
  supabase link --project-ref your-project-ref
  
  # Run migrations
  supabase db push
  ```
  
  The migrations will create the necessary tables and seed demo users:
  - **Investor**: investor@example.com / investor123
  - **Analyst**: analyst@example.com / analyst123

3. Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  
4. Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

```
nextjs-js-tailwind/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```

## 🧩 Page Editing

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js and React
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
