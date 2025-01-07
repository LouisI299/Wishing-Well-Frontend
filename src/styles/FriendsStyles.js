import styled from "styled-components";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Wrapper for the entire Friends page
export const FriendsPageWrapper = styled.div`
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
`;

// Title styling
export const PageTitle = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 1em;
`;

// Search bar container
export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

// Search input styling
export const SearchInput = styled.input`
  padding: 10px 15px;
  width: 100%;
  max-width: 250px;
  border: 2px solid #ccc;
  border-radius: 25px 0 0 25px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

// Search button styling
export const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  height: 49px;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Friend card container
export const FriendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Individual friend card
export const FriendCard = styled(Card)`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  disply: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

// Profile image styling
export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid black;
  object-fit: cover;
`;

// Friend name styling
export const FriendName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

// Add/Remove button styling
export const FriendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Empty state message
export const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;

