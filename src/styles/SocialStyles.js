import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Card } from "react-bootstrap";

export const StyledCard = styled(Card)`
  border-radius: 1em;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
`;
