import { useState } from "react";
import "./App.css";
import Landing from "./page/Landing";
import JsonTableUploader from "./page/JsonTableUploader";
import Navigation from "./page/Navigation";

function App() {
  return (
    <>
      {/* <Landing /> */}
      <Navigation />
      <JsonTableUploader />
    </>
  );
}

export default App;
