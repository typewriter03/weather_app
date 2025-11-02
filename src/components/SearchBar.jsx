// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { addFavorite } from '../features/favorites/favoritesSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state.auth); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const city = searchTerm.trim().toLowerCase();
      
      dispatch(addFavorite({ city: city, authState: authState }));
      setSearchTerm(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;