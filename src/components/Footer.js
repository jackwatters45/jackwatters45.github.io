import React from 'react';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0; 
`;
const Link = styled.a`
  display: flex;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Copyright © 2022 jackwatters45</p>
      <Link
        href="https://github.com/jackwatters45/"
        target="_blank"
        rel="noreferrer"
      >
        <Icon path={mdiGithub} size={1} />
      </Link>
    </FooterContainer>
  );
};

export default Footer;