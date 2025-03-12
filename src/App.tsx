// App.tsx
import React from "react";
import { NewsFeed } from "./components/NewsFeed";
import "./index.css"; // Ensure your CSS is imported

const App: React.FC = () => {
  return (
    <div>
      <NewsFeed />
    </div>
  );
};

export default App;
