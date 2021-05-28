import { ChangeEvent, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Colors } from '../style/Colors';
import Logo from '../images/Logo_ML.png';
import Search from '../images/ic_Search.png';

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = useCallback(
    (value: React.FormEvent<HTMLFormElement>) => {
      value.preventDefault();
      onSubmit(inputValue);
    },
    [onSubmit, inputValue]
  );

  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="Logo Mercado Libre" />
      </Link>
      <Form onSubmit={(value) => handleSubmit(value)}>
        <SearchInput
          type="text"
          placeholder="Nunca dejes de buscar"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
        />
        <ButtonContainer>
          <img src={Search} alt="Buscar" />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.YELLOW};
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: 32px;
`;
const SearchInput = styled.input`
  border: none;
  width: 60vw;
  padding: 8px 16px 8px 16px;
  font-size: 18px;
  ::placeholder {
    color: ${Colors.GREY_500};
  }
  :focus {
    outline: none;
  }
`;
const ButtonContainer = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
