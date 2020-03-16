import * as React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  cursor: pointer;
`;

const CircleElement = styled.span`
  position: absolute;
  width: 40px;
  height: 24px;
  background-color: #D0D0D0;  
  border-radius: 20px;
  right: 0;
  
  &:after {
    content: "";
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translateY(-50%);
    transition: 200ms ease-out transform;
  }
`;

const Text = styled.span`
  margin-right: 30px;
  font-size: 20px;
  font-weight: 500;
  font-family: Geometria, sans-serif;
`;

const InputToggleDark = styled.input`
  visibility: hidden;

  &:focus {
    outline: none;
  }
  
  &:focus + ${CircleElement} {
    box-shadow: 0 0 0 2px rgba(255,255,255,0.65);
  }

  &:checked + ${CircleElement} {
    background-color: #05D69E;
  }
  
  &:checked + ${CircleElement}:after {
    transform: translateY(-50%) translateX(15px);
  }
`;

interface IProps {
  children: React.ReactNode;
  name: string;
  value: boolean;

  onChange(value: any): void;
}

const Checkbox = ({
  children,
  name,
  value,
  onChange,
}: IProps) => {
  return (
    <Label htmlFor={name}>
      <Text>{children}</Text>
      <InputToggleDark
        onChange={() => onChange(!value)}
        checked={value}
        id={name}
        type="checkbox"
      />
      <CircleElement />
    </Label>
  );
};

export default Checkbox;
