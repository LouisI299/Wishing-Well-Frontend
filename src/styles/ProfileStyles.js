import styled from "styled-components";
import profilePicture from "../images/emptyProfilePicture.jpg";
import { ProgressBar } from "react-bootstrap";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

export const ProfileHeader = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${profilePicture});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

export const ProfileText = styled.h1`
  font-size: 2em;
  font-weight: bold;
  color: white;
  margin: 0.5em;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1em;
`;

export const ProfileStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0em;
`;

export const STR = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.2em;
  margin: 0.1em 0;
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0em;
`;

export const Arrow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0em;
  margin: 0.2em 0;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #eceff1;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  margin-bottom: 0.5em;
`;

export const StyledProgressBar = styled(ProgressBar)`
  height: 2em;
  .progress-bar {
    background-color: #7100c2;
  }
`;

export const LogoutButton = styled.button`
  margin-top: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  background-color: #7100c2;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #5a008c;
  }
`;
