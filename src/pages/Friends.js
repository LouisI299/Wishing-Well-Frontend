import React, { useEffect, useState } from "react";
import axios  from 'axios';
import { useAuth } from "../contexts/AuthProvider";


const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { token } = useAuth();

    // Fetch friends list
    const fetchFriends = async () => {
        try {
            const response = await axios.get('/api/friends/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    // Search friends to add
    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Don't search if query is empty
        try {
            const response = await axios.get(`/api/users/search?query=${searchQuery}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching friends:', error);
        }
    };

    // Add a friend
    const handleAddFriend = async (friendId) => {
        try {
            const response = await axios.post('/api/friends/add', { friend_id: friendId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Friend request sent!');
            setSearchResults([]); // Clear the search results after adding a friend
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return(
        <div>
            <h1>Friends</h1>
            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for friends"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results</h3>
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id}>
                            {`${result.first_name} ${result.last_name}`} 
                            <button onClick={() => handleAddFriend(result.id)}>Add Friend</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Friend List */}
            <h3>My Friends</h3>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>{friend.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Friends;