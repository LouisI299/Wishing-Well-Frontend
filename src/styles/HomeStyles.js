import styled from "styled-components";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const StyledCard = styled(Card)`
  margin: 1em 0 1em 0;
  border-radius: 1.5em;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  height: 30vh;
  .card-img {
    max-height: 55%;
    border-top-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border: none;
    max-height: fit-content;
    padding-bottom: 0;
    height: 20%;
  }
  .card-header .title {
    font-weight: bold;
    font-size: 1.5em;
  }

  .card-body {
    padding-top: 0.5em;
    padding-left: 0.3em;
    height: 25%;
    margin-top: -1em;

    #targetDiv {
      display: flex;
      flex-direction: row;
      justify-content: end;
      max-height: fit-content;
      margin-bottom: -1em;
    }

    #progressTargetDiv {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-height: fit-content;

      p {
        padding-bottom: 0em;
        margin-bottom: 0em;
      }
    }
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: fit-content;
  padding-bottom: 1em;

  a {
    width: 90%;
    max-height: 25%;
    text-decoration: none;
  }
`;

export const Chevron = styled.div`
  position: absolute;
  top: 90%;
  left: ${({ progress }) => `${progress}%`};
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 0.8em;
  text-align: center;

  .chevron-icon {
    font-size: 1.5em;
    margin-bottom: -0.4em;
  }
`;

export const GoalProgress = styled.div`
  min-width: 80%;
  position: relative;
  margin-left: 0.3em;
`;
