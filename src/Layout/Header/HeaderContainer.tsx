import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #197642;
  color: white;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;