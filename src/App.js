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
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";  // <== IMPORT
import IsAnon from "./components/IsAnon"; 


function App() {
  return (
    <div className="App">
      
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/collections" element={<IsPrivate><CollectionListPage /></IsPrivate>}/>
        <Route path="/collections/:collectionId" element={<IsPrivate><CollectionDetailsPage /></IsPrivate>}/>
        <Route path="/collections/:collectionId/edit" element={<IsPrivate><EditCollectionPage /></IsPrivate>}/>
        <Route path="/card/:cardId" element={<IsPrivate><CardDetailsPage /></IsPrivate>} />
        <Route path="/card/:cardId/edit" element={<IsPrivate><EditCardPage /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>
      
    </div>
  );
}

export default App;

