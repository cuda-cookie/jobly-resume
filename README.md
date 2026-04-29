# Miro Resume

Miro Resume is a modern, AI-powered online resume editor built with TanStack Start, HeroUI, and Tailwind CSS. This is a 1:1 reproduction of Magic Resume, optimized for deployment on Vercel and using DeepSeek via OpenRouter for AI assistance.

## Features

- **AI-Powered**: Use DeepSeek V3 via OpenRouter to polish your resume and check grammar.
- **TanStack Start**: Built on the latest TanStack stack for type-safety and performance.
- **Vercel Optimized**: Ready to deploy on Vercel with minimal configuration.
- **Privacy First**: Your data stays in your browser's local storage.
- **Rich Templates**: Multiple professional templates to choose from.

## Quick Start

1. **Clone the repo**:
   ```bash
   git clone https://github.com/cuda-cookie/miro.git
   cd miro
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run development server**:
   ```bash
   pnpm dev
   ```

4. **Build & Deploy**:
   Connect your repository to [Vercel](https://vercel.com) and it will automatically deploy using the provided `vercel.json`.

## AI Configuration

To use the AI features:
1. Go to the **Settings** > **AI Configuration** page in the app.
2. Select **OpenRouter**.
3. Enter your [OpenRouter API Key](https://openrouter.ai/keys).
4. (Optional) Set your preferred model (defaults to `deepseek/deepseek-chat`).

## Credits

This project is based on the excellent work of [JOYCEQL/magic-resume](https://github.com/JOYCEQL/magic-resume).
