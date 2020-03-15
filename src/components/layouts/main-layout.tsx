import * as React from 'react';
import '@assets/fonts/stylesheet.css';
import '@assets/css-normalizer/normalize.css';

interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default MainLayout;
