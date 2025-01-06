import React, { useState, useEffect} from "react";
import axios  from 'axios';
import { useAuth } from "../contexts/AuthProvider";
import { Link } from 'react-router-dom';

//Social feed page

const Social = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  return (
    <div>
      <h1>Social</h1>
      <Link to="/friends">
        <button>
          Search for Friends
        </button>
      </Link>
    </div>
  );
};

export default Social; 
