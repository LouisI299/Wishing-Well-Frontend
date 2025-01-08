import styled from "styled-components";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export const CommentSection = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;

  &.expanded {
    max-height: 30vh;
    overflow: auto;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.text};

    .commentProfile {
      display: flex;
      flex-direction: column;

      justify-content: start;
      align-items: center;
      border-right: 1px solid ${({ theme }) => theme.text};
      max-width: 30%;
      padding-top: 0.1em;
      border-top: none;
      img {
        border: none;
        border-radius: 50%;
        max-height: 2em;
      }

      p {
        margin: 0;
      }
    }

    .commentContent {
      display: flex;
      flex-direction: column;
      max-width: 70%;
      border: none;
      p {
        margin: 0;
      }
    }
  }
`;

export const StyledCard = styled(Card)`
  margin: 1em 0 1em 0;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  height: 30vh;
  min-height: fit-content;
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
    margin: 0 0.5rem 0.8rem 0;
    padding-left: 0.5rem;

    svg {
      font-size: 2em;
    }
  }
  .card-header .title {
    font-weight: bold;
    font-size: 1.5em;
    margin: 0;
  }

  .card-body {
    padding-top: 0.5em;
    padding-left: 0.3em;
    padding-bottom: 0.1rem;
    height: 25%;
    min-height: fit-content;
    margin-top: -1em;

    .dateSummary{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 0rem;
      margin-bottom: 0.5rem;

      p{
        margin: 0;
      }
      
      a {
      max-width: 20%;
      border-radius: 1em;
      background-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.text};
      text-align: center;
      height: 2em;
      padding-top: 0.3em;}
    }

    .likesComments {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      p {
        margin: 0;
        padding:
    }

    p {
      margin-bottom: 0;
      margin-top: 0.4rem;
    }

    #targetDiv {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-height: fit-content;
      margin-right: 4vw;
      margin-bottom: 0.5rem;
      p {
        padding-bottom: 0em;
        margin: 0;
      }
    }

    #progressTargetDiv {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-height: fit-content;
      margin-bottom: 0.3rem;

      p {
        padding-bottom: 0em;
        margin-bottom: 0em;
        margin-top: 0;
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
  overflow: auto;

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
`;
