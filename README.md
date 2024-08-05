<div align="center">
    
<img height="80px" src="https://github.com/user-attachments/assets/deefdc86-594b-4c2a-b3e9-dc8a036c83ee" alt="">

<h1>Bookify</h1>
<a href="https://bookify.ranitmanik.live">View Demo</a>
·
<a href=".github/ISSUE_TEMPLATE/bug_report.md">Report Bug</a>
·
<a href=".github/ISSUE_TEMPLATE/feature_request.md">Request Feature</a>
<br/>
<br/>

![GitHub Created At](https://img.shields.io/github/created-at/RanitManik/Bookify)
![GitHub repo size](https://img.shields.io/github/repo-size/RanitManik/Bookify)
![GitHub Discussions](https://img.shields.io/github/discussions/RanitManik/Bookify)
![GitHub License](https://img.shields.io/github/license/RanitManik/Bookify)
![GitHub stars](https://img.shields.io/github/stars/RanitManik/Bookify?style=default)
![GitHub forks](https://img.shields.io/github/forks/RanitManik/Bookify?style=default)
<br/>
![Netlify Status](https://api.netlify.com/api/v1/badges/ec026107-913c-4f7b-a3b9-ea809a6da7f7/deploy-status)
![wakatime](https://wakatime.com/badge/github/RanitManik/Bookify.svg)

</div>

Welcome to **Bookify**! This project harnesses the capabilities of **Firebase** and **React** to provide a seamless platform for book transactions, featuring an interactive and modern design for an enhanced user experience.

## Table of Contents

- [Overview](#overview)
    - [What is Bookify?](#what-is-bookify)
    - [Technologies Used](#technologies-used)
    - [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [FirebaseContext Configuration](#firebasecontext-configuration)
    - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Overview

### What is Bookify?

 Bookify is designed with a focus on user experience and efficiency, utilizing **Firestore** for robust and scalable data storage. As a serverless application, Bookify offers unparalleled flexibility and scalability, making it an ideal choice for users seeking a modern and efficient book trading solution. Additionally, the integration of **shadcn** ensures a polished and dynamic user interface, enhancing the overall experience.

### Technologies Used

<p>
   <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" height="30px">
   <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white" alt="FirebaseContext" height="30px">
   <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" height="30px">
   <img src="https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="ShadcnUI" height="30px">
   <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" height="30px">
   <img src="https://img.shields.io/badge/PostCSS-%23DD3A0A.svg?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS" height="30px">
   <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" height="30px">
   <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black" alt="Prettier" height="30px">
</p>

### Features

- **React**: A powerful JavaScript library for building user interfaces.
- **FirebaseContext**: A comprehensive app development platform for managing databases, authentication, and hosting.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: A UI component library for building beautiful interfaces.
- **JavaScript**: The programming language that powers the web.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
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

## FirebaseContext Configuration

To configure FirebaseContext for this project:

1. Go to the [FirebaseContext Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Navigate to the project settings and locate your FirebaseContext configuration.
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
├── docs/ # Project Documentation
│   ├── firestore structure # Firestore database architecture
├── public/ # Public static assets
├── src/ # Main source code
│   ├── assets/ # Application assets (e.g., images, icons)
│   ├── components/ # Reusable React components
│   │   ├── ui/ # UI components (e.g., buttons, forms)
│   │   └── block/ # Custom reusable components
│   ├── context/ # React contexts for state management
│   ├── hooks/ # Custom React hooks
│   ├── index.css # Global styles
│   ├── App.jsx # Main application component
│   └── main.jsx # Entry point for React application
├── .env.example # Template for environment variables
├── .gitignore # Files and directories to be ignored by Git
├── .prettierrc # Prettier configuration file
├── index.html # HTML template for the app
├── LICENSE # License information
├── package.json # Project dependencies and scripts
├── package-lock.json # Lock file for dependencies
├── postcss.config.js # PostCSS configuration
├── README.md # Project documentation
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── tsconfig.node.json # TypeScript configuration for Node.js
└── vite.config.js # Vite configuration file
```

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

<table>
  <tr>
    <th></th>
    <th>Social Media</th>
    <th>Username</th>
    <th>Link</th>
  </tr>
  <tr>
    <td><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" width="20" /></td>
    <td>Email</td>
    <td><code>ranitmanik.dev@gmail.com</code></td>
    <td><a href="mailto:ranitmanik.dev@gmail.com" target="_blank">Email</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" width="20" /></td>
    <td>LinkedIn</td>
    <td><code>Ranit Manik</code></td>
    <td><a href="https://www.linkedin.com/in/ranit-manik/" target="_blank">LinkedIn</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" width="20" /></td>
    <td>Instagram</td>
    <td><code>ranit_manik_</code></td>
    <td><a href="https://www.instagram.com/ranit_manik_/" target="_blank">Instagram</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" width="20" /></td>
    <td>Facebook</td>
    <td><code>RanitKumarManik</code></td>
    <td><a href="https://www.facebook.com/RanitKumarManik/" target="_blank">Facebook</a></td>
</tr>
</table>

_Feel free to reach out if you have questions or just want to chat about web adventures!_

## Acknowledgments

This project wouldn't be possible without the collaboration and resources of the developer community. Thanks to the community and tools like React and Firebase. Special appreciation goes to friends and family. I hope it inspires further learning.

---

<p align="center">
   Thank you for reviewing <strong>Bookify</strong>! Happy coding! 📚🚀
</p>
