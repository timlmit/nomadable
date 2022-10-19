import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthenticated } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import {
  FontSizeNormal,
  FontSizeSemiLarge,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { Layout } from "../commons/Layout";

interface Props {
  pathname: string;
  children: ReactNode;
  headerLabel: string;
}

export const ConsoleShell: React.FC<Props> = ({
  pathname,
  children,
  headerLabel,
}) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_SO_NARROW}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
      fixed
    >
      <Wrapper>
        <Navigation>
          <Link href="/community">
            <NavItem active={pathname === "/community"}>
              <NavIcon src="/icon/group-black.svg" />
              Community
            </NavItem>
          </Link>
          <Link href="/notification">
            <NavItem active={pathname === "/notification"}>
              <NavIcon src="/icon/bell-black.svg" />
              Notification
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
        <Card>
          <CardHeader>{headerLabel}</CardHeader>
          {children}
        </Card>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: 9rem;
  padding-bottom: 4rem;

  ${forMobile(`
    padding-top: 6.5rem;
  `)}
`;

const Navigation = styled.div`
  width: 20rem;
  position: fixed;

  ${forMobile(`
    display:none;
  `)}
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
  margin-left: 15rem;

  ${forMobile(`
    margin-left: 0;
    width: 100%;
  `)}
`;

const CardHeader = styled.div`
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  ${ContainerStyleInside}
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  ${FontSizeNormal}
`;
