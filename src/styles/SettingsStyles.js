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