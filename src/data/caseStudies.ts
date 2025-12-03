// src/data/caseStudies.ts

export interface CaseStudy {
  id: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "moodymusik",
    problem:
      "Users struggled to find personalized playlists that matched their mood throughout the day. Existing music apps had generic playlists and limited mood-based recommendations.",
    solution:
      "Developed a full-stack web app that dynamically generates mood-based playlists. Integrated sentiment analysis, user mood selection, real-time audio previews, and smooth UI transitions. Implemented Firebase for authentication and cloud storage.",
    result:
      "User engagement increased significantly. Average listening time per session rose by 35%, and users reported higher satisfaction due to personalized playlists. The app also improved discoverability of new music.",
    features: [
      "Mood-based playlist generator",
      "Real-time search and filtering",
      "Dedicated song player with audio previews",
      "Real-time mood tagging",
      "Save favorite playlists",
      "Responsive design for mobile & desktop",
      "Dark mode toggle",
      "Smooth animations and transitions",
    ],
    techStack: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "ShadCN UI",
      "Firebase (Auth & Firestore)",
      "Vercel for deployment",
      "ESLint & Prettier for code quality",
    ],
  },

  {
    id: "imagetoolkit",
    problem:
      "People needed quick image edits without downloading heavy software or using complicated workflows. Existing online tools were slow, clunky, or lacked essential features like crop, resize, and compress.",
    solution:
      "Built a lightweight web tool that allows users to crop, resize, compress, convert, and apply filters to images instantly. Implemented drag-and-drop functionality, multiple file format support, and a real-time preview. The interface is minimal and responsive for both desktop and mobile users.",
    result:
      "Users can now edit images instantly online. Page load is under 1 second, and editing operations are completed in real-time without lag. User feedback shows high satisfaction for ease-of-use and speed.",
    features: [
      "Crop, resize, compress images",
      "Apply filters and adjust brightness/contrast",
      "Download images in multiple formats (JPEG, PNG, WebP)",
      "Drag-and-drop workspace",
      "Instant preview of edits",
      "Minimalist UI for better focus",
      "Dark mode compatible",
      "Responsive design for mobile and desktop",
      "Undo/Redo functionality",
    ],
    techStack: [
      "React",
      "JavaScript",
      "TailwindCSS",
      "Vite",
      "Browser APIs for image manipulation",
      "LocalStorage for saved images",
      "ESLint & Prettier",
      "Netlify for deployment",
    ],
  },
];
