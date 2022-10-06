import { useRouter } from "next/router";
import React, { Fragment } from "react";
import styled from "styled-components";
// import { doLogoutUser } from "../../redux/actions/userAction";
import { useAppDispatch } from "../../redux/hooks";
import {
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
  authenticated: boolean;
  hideDropdown: () => void;
}

export const MenuDropdown: React.FC<Props> = ({
  visible,
  authenticated,
  hideDropdown,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClickNew = () => {
    hideDropdown();
    router.push("/new-place");
  };

  const onClickMyPosts = () => {
    hideDropdown();
    router.push("/posts");
  };

  const onClickLogin = () => {
    hideDropdown();
    dispatch(updateVisibleModal({ id: cons.MODAL_LOGIN }));
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, modal: cons.MODAL_LOGIN },
    // });
  };

  const onClickSignup = () => {
    hideDropdown();
    router.push("/signup");
  };

  const onClickLogout = () => {
    hideDropdown();
    removeCookie(cons.COOKIE_ACCESS_TOKEN, "/");
    dispatch(updateUser({ user: initialUser }));
    dispatch(initApiFetchUserState());
    dispatch(initLoginUserState());
    window.alert("ログアウトしました");
  };

  const renderDropdownContent = () => {
    if (authenticated) {
      return (
        <Fragment>
          <DropdownItem onClick={onClickNew}>新しく投稿</DropdownItem>
          <DropdownItem onClick={onClickMyPosts}>記事一覧</DropdownItem>
          <DropdownItem onClick={onClickLogout}>ログアウト</DropdownItem>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <DropdownItemBold onClick={onClickLogin}>ログイン</DropdownItemBold>
        {/* <DropdownItem onClick={onClickSignup}>登録する</DropdownItem> */}
      </Fragment>
    );
  };

  return (
    <MenuDropdownWrapper visible={visible} width={"14rem"}>
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
