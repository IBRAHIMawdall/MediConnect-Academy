# MediConnect Academy

Welcome to **MediConnect Academy**, an AI-enhanced e-learning platform designed for healthcare professionals. This Next.js application provides a modern, interactive, and personalized learning experience, leveraging generative AI to deliver intelligent features that support medical education.

---

## ✨ Key Features

MediConnect Academy is more than just a course catalog. It's an intelligent learning partner with several AI-driven features:

- **Course Catalog**: Browse a rich and diverse catalog of medical courses, filterable by category and subcategory.
- **Personalized Learning Paths**: Receive AI-driven course recommendations based on your professional role and learning history.
- **AI Research Assistant**: Ask complex medical questions and get concise, accurate answers synthesized from real-world sources like PubMed, complete with citations.
- **AI Topic Explainer**: Enter any medical topic and receive a clear explanation and a hierarchical mind map to aid understanding.
- **AI Content Assistant**: For course creators, this tool helps find relevant articles and summaries to build out new course content.
- **Dynamic Certificate Generation**: Automatically generate a PDF certificate upon course completion with your name and the course title.
- **Modern, Responsive UI**: A sleek and intuitive interface built with ShadCN UI and Tailwind CSS.

---

## 🚀 Tech Stack

This project is built with a modern, production-ready tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/react)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/mediconnect-academy.git
    cd mediconnect-academy
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key. This is required for the AI features to work.
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You may also want to add an NCBI API key to avoid rate limiting on the research assistant.
    ```env
    NCBI_API_KEY=YOUR_NCBI_KEY_HERE
    ```


4.  **Run the development server:**
    The application runs on two concurrent processes: the Next.js frontend and the Genkit AI flows.

    - **Start the Next.js app:**
      ```sh
      npm run dev
      ```
      This will start the frontend on `http://localhost:9002`.

    - **Start the Genkit AI flows:**
      In a separate terminal, run:
      ```sh
      npm run genkit:watch
      ```
      This will start the Genkit development server, which the Next.js app will call for AI-related tasks.

Once both are running, you can open your browser to `http://localhost:9002` to see the application.
