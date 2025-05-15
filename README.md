# 🎨 Designer Portfolio Template

This is a dynamic and interactive personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**. The site is designed to showcase a professional designer’s work and profile with an elegant and customizable layout.

The project provides sections for highlighting your About info, Experience, Skills, and most importantly, your Portfolio or Artworks — all managed via Sanity CMS for easy content updates.

---

## 🛠️ Technologies Used

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) – for smooth animations and transitions
- [Sanity.io](https://www.sanity.io/) – headless CMS for managing portfolio content dynamically
- [shadcn/ui](https://ui.shadcn.com/) – reusable, accessible UI components

---

## 🧪 Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```.env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

> Your Sanity project ID can be found in your Sanity Studio or on [sanity.io/manage](https://www.sanity.io/manage).

---

## 🔧 How to Setup Sanity

1. Go to [https://www.sanity.io](https://www.sanity.io) and create a free account.
2. Create a new project from your Sanity dashboard.
3. Choose a dataset name (use `production` to match the example).

---

## 🚀 Getting Started

```bash
git clone https://github.com/edwinperaza99/designer-portfolio-template.git
cd designer-portfolio-template

# Install dependencies
npm install

# Create and fill out .env.local
cp .env.local.example .env.local

# Run the dev server
npm run dev
```

---

## 🚢 Deployment

This app is ready to be deployed on [Vercel](https://vercel.com/):

- Push your repo to GitHub
- Import it in Vercel
- Set environment variables in the project settings
- Done 🎉

> Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID`, etc., are added to Vercel's environment.

---

## 🔍 Example

You can see a live example of this portfolio in action here:

👉 [https://www.okadamio.com](https://www.okadamio.com)
