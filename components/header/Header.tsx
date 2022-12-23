import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  COLOR_RED_0,
  COLOR_RED_1,
  FONT_COLOR_LIGHT,
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_SUPER_LIGHT,
  SHADOW_0,
  SHADOW_1,
} from "../../constants";
import { useClickOutsideEffect } from "../../modules/hooks/useClickOutsideEffect";
import { useAppSelector } from "../../redux/hooks";
import { selectUnseenNotificationCnt } from "../../redux/slices/notificationSlice";
import { User } from "../../redux/slices/userSlice";
import { forMobile } from "../../styles/Responsive";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import { NotificationMarkCss } from "../../styles/styled-components/UIs";
import { MenuDropdown } from "./MenuDropdown";

interface Props {
  user: User;
  width: string;
  authenticated: boolean | undefined;
  fixed?: boolean;
}

export const Header: React.FC<Props> = ({
  user,
  width,
  authenticated,
  fixed,
}) => {
  const wrapperRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const notificationCnt = useAppSelector(selectUnseenNotificationCnt);

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  useClickOutsideEffect(wrapperRef, hideDropdown);

  return (
    <HeaderWrapper fixed={fixed}>
      <PageContainer width={width}>
        <Link href="/" passHref>
          <a>
            <Brandlogo src="/img/brand/brandlogo.svg" />
          </a>
        </Link>
        <MenuWrapper ref={wrapperRef}>
          <NotificationMark visible={notificationCnt > 0} />
          <Menu onClick={() => setDropdownVisible(!dropdownVisible)}>
            <MenuIcon src="/icon/menu-black.png" />
            <UserIcon src={user.picture || "/icon/user-gray.png"} />
          </Menu>
          <MenuDropdown
            visible={dropdownVisible}
            authenticated={authenticated}
            hideDropdown={hideDropdown}
            notificaitonExist={notificationCnt > 0}
          />
        </MenuWrapper>
      </PageContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ fixed?: boolean }>`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${FONT_COLOR_SUPER_LIGHT};
  height: 5rem;
  box-sizing: border-box;
  background-color: white;

  ${(props) =>
    props.fixed &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;

    ${forMobile(`
      z-index: 3;
      width: calc(100%);
    `)}

  `};
`;

const PageContainer = styled.div`
  ${ContainerStyle}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brandlogo = styled.img`
  ${ClickableStyle}
  width: 8rem;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const Menu = styled.div`
  ${ClickableStyle}

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 4rem;
  border: 1px solid ${FONT_COLOR_LIGHTEST};
  border-radius: 5rem;
  padding: 0.4rem 0rem 0.4rem 0.4rem;
`;

const MenuIcon = styled.img`
  width: 0.8rem;
  opacity: 0.9;
  margin-right: 0.1rem;
`;

const UserIcon = styled.img`
  width: 1.7rem;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationMark = styled.div<{ visible: boolean }>`
  ${NotificationMarkCss}
`;
