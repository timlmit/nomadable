import { useRouter } from "next/router";
import React, { Fragment } from "react";
import styled from "styled-components";
// import { doLogoutUser } from "../../redux/actions/userAction";
import { useAppDispatch } from "../../redux/hooks";
import {
  DropDownIconStyle,
  DropDownItemStyle,
  DropdownWindowStyle,
} from "../../styles/styled-components/Dropdown";
import * as cons from "../../constants";
import Link from "next/link";
import { removeCookie } from "../../modules/CookieHandler";
import { updateUser, initialUser } from "../../redux/slices/userSlice";
import {
  initApiFetchUserState,
  initLoginUserState,
} from "../../redux/slices/api/apiUserSlice";
import { updateVisibleModal } from "../../redux/slices/uiSlice";

interface Props {
  visible: boolean;
  authenticated: boolean | undefined;
  hideDropdown: () => void;
}

export const MenuDropdown: React.FC<Props> = ({
  visible,
  authenticated,
  hideDropdown,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToPage = (pathname: string) => {
    hideDropdown();
    router.replace(pathname);
  };

  const onClickLogin = () => {
    hideDropdown();
    dispatch(updateVisibleModal({ id: cons.MODAL_LOGIN }));
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, modal: cons.MODAL_LOGIN },
    // });
  };

  const onClickLogout = () => {
    hideDropdown();
    removeCookie(cons.COOKIE_ACCESS_TOKEN, "/");
    dispatch(updateUser({ user: initialUser }));
    dispatch(initApiFetchUserState());
    dispatch(initLoginUserState());
    window.alert("Logged out");
  };

  const renderDropdownContent = () => {
    if (authenticated) {
      return (
        <Fragment>
          <DropdownItem onClick={() => goToPage("/new-place")}>
            <ItemIcon src="/icon/plus-black2.svg" />
            New Place
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/community")}>
            <ItemIcon src="/icon/group-black.svg" /> Community
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/profile")}>
            <ItemIcon src="/icon/user-black.svg" /> Profile
          </DropdownItem>
          <DropdownItem onClick={() => goToPage("/setting")}>
            <ItemIcon src="/icon/gear-black.svg" /> Setting
          </DropdownItem>
          <DropdownItem onClick={onClickLogout}>
            <ItemIcon src="/icon/logout-black3.svg" />
            Log Out
          </DropdownItem>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <DropdownItem onClick={onClickLogin}>Log In</DropdownItem>
        <DropdownItem onClick={() => goToPage("/signup")}>Sign Up</DropdownItem>
      </Fragment>
    );
  };

  return (
    <MenuDropdownWrapper visible={visible} width={"13rem"}>
      {renderDropdownContent()}
    </MenuDropdownWrapper>
  );
};

const MenuDropdownWrapper = styled.div`
  ${DropdownWindowStyle};
  z-index: 1;
`;

const DropdownItem = styled.div`
  ${DropDownItemStyle}
`;

const DropdownItemBold = styled.div`
  ${DropDownItemStyle}
  font-weight: bold;
`;

const ItemIcon = styled.img`
  ${DropDownIconStyle}
`;

const Hr = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
`;
