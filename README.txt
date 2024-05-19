npm init -y
npm install --save-dev vite @vitejs/plugin-react
npm install react react-dom
npm install bulma

testのところを

    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"

に変更

: d3.js
<head>//index.htmlのheadの下にコピペ
    <script src="https://d3js.org/d3.v7.min.js"></script>
----------------------------------------------------------------------------------------------------------
: vite.config.js 

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
----------------------------------------------------------------------------------------------------------
: index.html 

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
----------------------------------------------------------------------------------------------------------
: src/App.jsx

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
----------------------------------------------------------------------------------------------------------
: src/main.jsx

import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.querySelector("#content")).render(<App />);
----------------------------------------------------------------------------------------------------------
: .gitignore

https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore