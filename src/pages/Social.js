import React, { useState, useEffect} from "react";
import axios  from 'axios';
import { useAuth } from "../contexts/AuthProvider";

//Social feed page

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Track when to display results
  const [view, setView] = useState('main'); 
  const { token } = useAuth();

 // Fetch friends list
  const fetchFriends = async () => {
    try {
      const response = await axios.get('/api/friends', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(response.data);
      setView('friends');
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search friends to add
  const handleSearch = async () => {
    if(!searchQuery.trim()) return; // Don't search if query is empty
    try {
      const response = await axios.get(`/api/search-friends?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  // Add friend handler
  const handleAddFriend = async (friendId) => {
    try {
      await axios.post('/api/add-friend', { friendId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div>
      {view === 'main' && (
        <>
          <h1>Social</h1>

          {/* View Friends Button */}
          <button onClick={fetchFriends}>My Friends</button>

          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search for friends..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Search Results */}
          {showSearchResults && (
            <div>
              <h3>Search Results</h3>
              <ul>
                {searchResults.map(user => (
                  <li key={user.id}>
                    {user.name}
                    <button onClick={() => handleAddFriend(user.id)}>Add Friend</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {view === 'friends' && (
        <>
          {/* Back Button */}
          <button onClick={() => setView('main')}>← Back</button>

          {/* Friend List */}
          <h1>My Friends</h1>
          <ul>
            {friends.map(friend => (
              <li key={friend.id}>
                {friend.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Social; 
