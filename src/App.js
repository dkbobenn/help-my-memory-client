// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";    
import HomePage from "./pages/HomePage"; 
import CollectionListPage from "./pages/CollectionListPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";
import EditCollectionPage from "./pages/EditCollectionPage";

function App() {
  return (
    <div className="App">
      
     {/*  ADD <Navbar>, <Routes> & <Route>  */}
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/collections" element={<CollectionListPage />} />
        <Route path="/collections/:collectionId" element={<CollectionDetailsPage />} />
        <Route path="/collections/:collectionId/edit" element={<EditCollectionPage />} />
      </Routes>
      
    </div>
  );
}

export default App;

