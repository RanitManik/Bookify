<div align="center">
  <h1>Bookify</h1>
</div>

Welcome to Bookify! This project, inspired by Piyush Garg's comprehensive Firebase with React course, leverages the power of Firebase and React to deliver a seamless platform for book transactions. Bookify is designed with a focus on user experience and efficiency, utilizing Firestore for robust and scalable data storage. As a serverless application, Bookify offers unparalleled flexibility and scalability, making it an ideal choice for users seeking a modern and efficient book trading solution.

## Table of Contents

- [Overview](#overview)
    - [Why Bookify?](#why-bookify)
    - [Technologies Used](#technologies-used)
    - [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Firebase Configuration](#firebase-configuration)
    - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Overview

### Why Bookify?

Bookify utilizes the powerful combination of Firebase and React to offer users a seamless platform for buying and selling books. The app is designed with a focus on user experience and efficiency, using Firestore database to store information. It operates as a serverless application, providing flexibility and scalability for users.

### Technologies Used

<p>
   <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" height="30px">
   <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" height="30px">
   <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" height="30px">
   <img src="https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="ShadcnUI" height="30px">
   <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" height="30px">
   <img src="https://img.shields.io/badge/PostCSS-%23DD3A0A.svg?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS" height="30px">
   <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" height="30px">
   <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black" alt="Prettier" height="30px">
</p>

### Features

- **React**: A powerful JavaScript library for building user interfaces.
- **Firebase**: A comprehensive app development platform for managing databases, authentication, and hosting.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ESLint**: Code linting to maintain consistent code quality.
- **Prettier**: Code formatting to ensure a consistent code style.

## Getting Started

### Prerequisites

- **Node.js** (>= 20.0.0)
- **npm** (>= 10.0.0) or **yarn** (>= 1.22.0)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RanitManik/Bookify.git
   cd bookify
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Firebase Configuration

To configure Firebase for this project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Navigate to the project settings and locate your Firebase configuration.
4. Copy the configuration details and replace the placeholders in your `.env.local` file.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the
build for the best performance.

### `npm run lint`

Lints the codebase using ESLint. This ensures your code adheres to specified linting rules and conventions. It
checks `.js` and `.jsx` files, reports any unused disable directives, and sets the maximum number of warnings to 0.

### `npm run preview`

Previews the production build locally. Useful for testing the production build before deploying.

### `npm run format`

Formats the codebase using Prettier. It targets all `.js` and `.jsx` files within the `src` directory to ensure
consistent code formatting.


## Project Structure

The project structure is as follows:

```
bookify/
├── components.json
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
├── README.md
├── src
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.js
```

- **components.json**: Configuration for components.
- **index.html**: HTML template.
- **LICENSE**: License information.
- **package.json**: Project metadata and dependencies.
- **package-lock.json**: Dependency lock file.
- **postcss.config.js**: PostCSS configuration file.
- **public/**: Contains static assets.
- **README.md**: Project documentation.
- **src/**: Contains the main source code for the React application.
- **tailwind.config.js**: Tailwind CSS configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **tsconfig.node.json**: Node-specific TypeScript configuration file.
- **vercel.json**: Vercel deployment configuration file.
- **vite.config.js**: Vite configuration file.

## Contributing

We welcome contributions to enhance the Bookify project. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your fork:

   ```bash
   git push origin feature-name
   ```

5. Create a pull request to the main repository, detailing the changes and enhancements you have made.

## Contact

- **LinkedIn**: [Ranit Manik](https://www.linkedin.com/in/ranit-manik/)
- **GitHub**: [RanitManik](https://github.com/RanitManik)
- **Email**: [ranitmanik.dev@gmail.com](mailto:ranitmanik.dev@gmail.com)

_Feel free to reach out if you have questions or just want to chat about web adventures!_

## Acknowledgments

- [Piyush Garg's Firebase with React Course](https://www.youtube.com/playlist?list=PLinedj3B30sCw8Qjrct1DRglx4hWQx83C)
- [Markdown Badges](https://github.com/Ileriayo/markdown-badges)
- [shields.io Badges](https://shields.io/)
- [Skill Icons](https://github.com/tandpfun/skill-icons)

---

<p align="center">
   Thank you for using <strong>Bookify</strong>! Happy coding! 📚🚀
</p>
