import * as React from 'react';
import styled from 'styled-components';
import device from '@helpers/styled-breakpoints';

const Label = styled.label`
  height: 42px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  font-family: Geometria,sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SpanLabel = styled.span`
`;

interface IWrapInput {
  cssWidth: string;
}

const WrapInput = styled.div<IWrapInput>`
  flex: ${({ cssWidth }) => (cssWidth ? '' : '1 1 1px')};
  width: ${({ cssWidth }) => cssWidth}
`;

const InputStyled = styled.input`
  font-family: Geometria,sans-serif;
  padding: 4px 6px;
  display: block;
  width: 100%;
  border: 1px solid #bababa;
  border-radius: 4px;
`;

interface IProps {
  children: React.ReactNode;
  inputWidth: string;
  name: string;
  value: string;

  onChange(value: any): void;
}

const Input = React.memo(({
  children,
  inputWidth,
  onChange,
  name,
  value = '',
}: IProps) => {

  const onChangeHandler = ({ target: { value: inputValue } }) => {
    onChange(inputValue);
  };

  return (
    <Label>
      <SpanLabel>
        {children}
      </SpanLabel>
      <WrapInput cssWidth={inputWidth}>
        <InputStyled value={value} name={name} onChange={onChangeHandler} />
      </WrapInput>
    </Label>
  );
});

export default Input;
