import { Button, Card, Container } from "react-bootstrap";
import styled from "styled-components";

export const AddGoalContainer = styled(Container)`
  h1 {
    font-weight: bolder;
    text-align: center;
    margin-top: 0.5rem;
  }

  .BackButton {
    display: block;
  }

  .categoryButtons {
    display: flex;
    flex-wrap: wrap;
    padding-top: 1rem;
    gap: 1rem;
    justify-content: center;
    min-height: fit-content;
  }

  Form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .categoryButtons button {
    flex: 1 1 calc(50% - 10px);

    margin: 5px 0;
  }

  .categoryDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 10px);
    height: 17vh;
  }
`;

export const CategoryButton = styled(Button)`
  width: 100%;

  margin: 0;
  background-size: cover;
  background-position: center;
  border: none;

  margin: 10px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

export const NextButton = styled(Button)`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  position: fixed;
  top: 85%;
  font-size: 1.5rem;
  border-radius: 2em;
  width: 20%;
`;
export const SummaryCard = styled(Card)`
border-radius: 15px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
padding: 1rem; 

h2 {
text-align: center;
font-weight: bolder;
}

#GoalName, #TotalAmount{
margin: auto;
text-align: center;
font-weight: bolder;
font-size: 1.5rem;
}

#EndDate {
  margin: auto;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center; 
  width: 40%;
  background-color:${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
}
  #CurrentSaved, #TimeNeeded, #SavingMethod{
  margin: auto;
  text-align: center;
  }

  .SummaryIcon{
  margin-right: 0.5rem;
  }

.categoryImage img {
  width: 100%;
  height: auto;
  display: block;
  margin: auto;
  border-radius: 15px;
  border: 1px solid #ccc;
}
`;
