import styled from "styled-components";
import profilePicture from "../images/emptyProfilePicture.jpg";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
`;

export const ProfileText = styled.h1`
  height: 8em;
  width: 100%;
  padding: 0.3em;
  font-size: 2.5em;
  font-weight: bold;
  color: white;
  background-image: url(${profilePicture}););  
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: flex-end;
`;

export const STR = styled.div`
  display: flex;
  margin-left: 0.5em;
  margin-right: 0.5em;
  font-size: 1.5em;
  justify-content: space-between;
`;

export const CurrentTXTFL = styled.div`
    
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin-left: 0.5em;
  font-size: 1.2em;
`;

export const Arrow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7100c2;
  margin-right: 0.5em;
`;
