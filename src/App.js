// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";    
import HomePage from "./pages/HomePage"; 
import CollectionListPage from "./pages/CollectionListPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";
import EditCollectionPage from "./pages/EditCollectionPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import EditCardPage from "./pages/EditCardPage";

function App() {
  return (
    <div className="App">
      
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/collections" element={<CollectionListPage />} />
        <Route path="/collections/:collectionId" element={<CollectionDetailsPage />} />
        <Route path="/collections/:collectionId/edit" element={<EditCollectionPage />} />
        <Route path="/card/:cardId" element={<CardDetailsPage />} />
        <Route path="/card/:cardId/edit" element={<EditCardPage />} />
      </Routes>
      
    </div>
  );
}

export default App;

