import * as React from 'react';
import MainLayout from '@components/layouts/main-layout';
import SEO from '@components/seo';
import styled, { createGlobalStyle } from 'styled-components';
import Dropzone from '@components/dropzone';
import { NotificationContainer } from 'react-notifications';
import '@assets/notifications/notifications.css';

const Title = styled.h1`
  font-family: Geometria, sans-serif;
`;

const SubTitle = styled.h2`
  font-family: Geometria, sans-serif;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
  }
`;

const Section = styled.section`
  padding: 25px 100px;
`;

const GithubLink = styled.a`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  font-family: Geometria, sans-serif;
  display: block;
  text-decoration: none;
  color: #818181;
  font-weight: 600;
  
  &:hover {
    color: black;
  }
`;

const IndexPage = () => {


  return (
    <MainLayout>
      <SEO title="Home" />
      <GlobalStyle />
      <GithubLink
        target="_blank"
        href="https://github.com/GTOsss/svg-to-react-component-online"
      >
        GitHub
      </GithubLink>

      <main>
        <Section>
          <Title>Svg to React component online (SVGR online)</Title>
          <SubTitle>
            The best way to work with SVG in react. Upload SVG files and get the react components.
          </SubTitle>

          <Dropzone />
        </Section>

      </main>

      <NotificationContainer />
    </MainLayout>
  );
};

export default IndexPage;
