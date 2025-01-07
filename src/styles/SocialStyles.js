import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Card } from "react-bootstrap";

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBody = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled.img`
  max-height: 2em;
  border-radius: 50%;
`;

export const StyledCard = styled(Card)`
  border-radius: 1em;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 0.5em 0 0.5em 0;

  .likeCommentCount {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 95%;
    gap: 0.5em;

    div {
      display: flex;
      flex-direction: row;
      gap: 0.2em;
      align-items: center;
      max-height: fit-content;

      p {
        margin: 0;
      }
    }
  }
`;

export const CardImg = styled(Card.Img)`
  max-width: 95%;
  border-radius: 1em;
`;

export const CardHeader = styled(Card.Header)`
  background-color: ${({ theme }) => theme.secondary};
  width: 95%;
`;

export const CardBody = styled(Card.Body)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  p {
    margin: 0;
  }
`;

export const CardFooter = styled(Card.Footer)`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0em;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;

  .likeDiv {
    border-bottom-left-radius: 1em;
    button {
      border-bottom-left-radius: 1em;
    }
  }

  .commentDiv {
    border-bottom-right-radius: 1em;
    button {
      border-bottom-right-radius: 1em;
    }
  }

  div {
    width: 50%;
    display: flex;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.text};
    border-bottom-left-radius: 1em;

    button {
      width: 100%;
    }
  }
`;

export const CommentSection = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  width: 100%;
  &.expanded {
    max-height: 30vh;
    overflow: auto;
  }

  .commentInput {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 0.5em;
    margin-right: 0.2em;
    textarea {
      width: 90%;

      height: 3em;
      border-radius: 1em;
    }

    button {
      width: 10%;
    }
  }

  .comment {
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${({ theme }) => theme.text};
    margin-top: 0.2em;
    height: 5em;
    .commentText {
      width: 75%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        margin-left: 0.5em;
      }
    }
    .commentProfile {
      display: flex;
      border-right: 1px solid ${({ theme }) => theme.text};
      width: 25%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        margin: 0;
      }
      img {
        max-height: 2em;
        border-radius: 50%;
      }
    }
  }
`;

export const CardTitle = styled(Card.Title)`
  max-height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 1em;
  width: 95%;
  align-items: center;
  h2 {
    margin: 0em;
  }
`;

export const GoalProgress = styled.div`
  width: 95%;
`;
