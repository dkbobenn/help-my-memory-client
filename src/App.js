// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";    
import HomePage from "./pages/HomePage"; 
import CollectionListPage from "./pages/CollectionListPage";

function App() {
  return (
    <div className="App">
      
     {/*  ADD <Navbar>, <Routes> & <Route>  */}
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/collections" element={<CollectionListPage />} />
      </Routes>
      
    </div>
  );
}

export default App;

