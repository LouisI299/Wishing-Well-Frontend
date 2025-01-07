import styled from "styled-components";
import { Card } from "react-bootstrap";

// Page container styling
export const FriendRequestsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
`;

// Title styling
export const Title = styled.h1`
  text-align: center;
  color: #fffff;
  font-size: 24px;
  margin-bottom: 20px;
`;

// List container
export const RequestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Individual request item
export const RequestItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// User info
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

// Profile image
export const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #007bff;
`;

// User name
export const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

// Buttons container
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

// Accept button
export const AcceptButton = styled.button`
  background-color: #28a745;
  color: lightgreen;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Decline button
export const DeclineButton = styled.button`
  background-color: #dc3545;
  color: red;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`;
