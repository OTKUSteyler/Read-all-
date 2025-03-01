// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { ack } from './utils'; // Import the ack function from utils.ts

// A simple React component that uses the ack function
const App = () => {
  const handleClick = () => {
    ack('Button clicked!'); // Call the ack function when the button is clicked
  };

  return (
    <div>
      <h1>Welcome to the TSX Example!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

// Render the React app to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
