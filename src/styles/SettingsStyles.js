import styled from "styled-components";
import { Card } from "react-bootstrap";

export const SettingsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: fit-content;
    padding-bottom: ;

    section {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center aligns all content in the section */
        gap: 20px; /* Adds consistent spacing between child elements */
      }

    a {
    width: 90%;
    max-height: 25%;
    text-decoration: none;
    }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: flex-start;
  gap: 10px;
  padding: 20px;
  background: linear-gradient(135deg, #3a3a52, #2a2a42);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  color: #ffffff;
  
  margin-top: 20px; /* Adds spacing above the user info */


  div {
    display: flex;
    align-items: center;
    margin-bottom: 50px; /* Adds spacing between username and email rows */
  }

  label {
    font-weight: bold;
    width: 100px; /* Set a consistent width for labels */
    text-align: right;
    margin-right: 10px; /* Space between label and value */
  }

  span {
    flex: 1; /* Allows the value to expand and align properly */
  }

  &:hover {
    background: linear-gradient(135deg, #484864, #32324a);
    transform: scale(1.02);
    transition: all 0.3s ease;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 
`;

export const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`; 

export const NotificationSettingsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: fit-content;
    padding-bottom: 2em;
    gap: 10px;
`;

export const ProgressBar = styled.div`
  width: 80%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

export const ProgressFiller = styled.div`
  height: 100%;
  background: linear-gradient(to right, #4caf50, #8bc34a);
  transition: width 0.3s ease;
`;

export const StyledButton = styled.button`
  background: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s;

  &:hover {
    background: #3700b3;
  }
`;