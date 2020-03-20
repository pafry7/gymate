import React from "react";
function App() {
  return (
    <div className="App">
      <div className="bg-green-600 w-screen h-20 flex items-center justify-between">
        <div className="flex 1 ml-20 font-bold text-white text-xl font-amiko">
          Gymate
        </div>
        <div className="flex 1">test</div>
      </div>
      <div className="ml-8 mt-8">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
