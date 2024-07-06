import React from "react";

function App() {
  return (
    <div className="gradient-bg flex min-h-screen items-center justify-center">
      <div className="max-w-xl transform rounded-lg bg-white p-8 shadow-lg transition duration-500">
        <h1 className="mb-4 animate-bounce text-center text-4xl font-bold">
          Hello World
        </h1>
        <p className="text-violet-950">
          Welcome to our Frontend App Starter Template. This application is
          built using the modern web development stack: Vite, React, Tailwind
          CSS, and TypeScript.
        </p>
      </div>
    </div>
  );
}

export default App;
