import * as React from 'react';
import MainLayout from '@components/layouts/main-layout';
import SEO from '@components/seo';
import styled, { createGlobalStyle } from 'styled-components';
import Dropzone from '@components/dropzone';

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
  padding: 50px 100px;
`;

const IndexPage = () => {


  return (
    <MainLayout>
      <SEO title="Home" />
      <GlobalStyle />

      <main>
        <Section>
          <Title>Svg to React component online</Title>
          <SubTitle>Upload SVG files and get the react components.</SubTitle>

          <Dropzone />
        </Section>

      </main>

    </MainLayout>
  );
};

export default IndexPage;
