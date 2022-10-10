import Link from "next/link";
import React, { ReactNode, useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { FontSizeSemiLarge } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  pathname: string;
  children: ReactNode;
}

export const ConsoleShell: React.FC<Props> = ({ pathname, children }) => {
  return (
    <Wrapper>
      <Navigation>
        <Link href="/event">
          <NavItem active={pathname === "/event"}>
            <NavIcon src="/icon/home-black.svg" />
            Event
          </NavItem>
        </Link>
        <Link href="/point">
          <NavItem active={pathname === "/point"}>
            <NavIcon src="/icon/coin-black.svg" />
            Point
          </NavItem>
        </Link>
        <Link href="/profile">
          <NavItem active={pathname === "/profile"}>
            <NavIcon src="/icon/user-black.svg" />
            Profile
          </NavItem>
        </Link>
        <Link href="/setting">
          <NavItem active={pathname === "/setting"}>
            <NavIcon src="/icon/gear-black.svg" />
            Setting
          </NavItem>
        </Link>
      </Navigation>
      <Card>{children}</Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 4rem;
`;

const Navigation = styled.div`
  width: 20rem;
`;

const NavItem = styled.button<{ active: boolean }>`
  ${ClickableStyle}
  background: none;
  display: flex;
  align-items: center;
  border: none;
  ${FontSizeSemiLarge};
  font-weight: 500;
  padding: 0.8rem 1.3rem 0.8rem 1rem;
  border-radius: 10rem;
  margin-bottom: 0.5rem;
  transition: all 0.1s ease-in-out;
  color: rgba(0, 0, 0, 0.5);
  & img {
    opacity: 0.5;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  ${(props) =>
    props.active &&
    `
      color: ${cons.FONT_COLOR_NORMAL};
    font-weight: bold;
    & img {
      opacity: 0.9;
    }
  `};
`;

const NavIcon = styled.img`
  width: 1.6rem;
  margin-right: 1rem;
`;

const Card = styled.div`
  width: 50rem;
  /* min-height: 20rem; */
  background-color: white;
  border-radius: 1rem;
`;