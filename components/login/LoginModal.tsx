import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectApiLoginUserStatus,
  selectApiFetchUserStatus,
  apiLoginUser,
  initLoginUserState,
} from "../../redux/slices/api/apiUserSlice";
import {
  ButtonPrimaryLarge,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import {
  FormLabelStyle,
  InputFormStyle,
  SignupErrorStyle,
  TermsAndPrivacyStyle,
  DividerStyle,
  FooterWrapperStyle,
} from "../../styles/styled-components/Forms";

import { Modal } from "../commons/Modal";
import { ModalHeader } from "../commons/ModalHeader";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

export const LoginModal: React.FC<Props> = ({ visible, closeModal }) => {
  const router = useRouter();
  const apiLoginStatus = useAppSelector(selectApiLoginUserStatus);
  const apiFetchUserStatus = useAppSelector(selectApiFetchUserStatus);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = () => {
    if (email.length < 1) return false;
    if (password.length < 1) return false;
    return true;
  };

  const onClickSubmit = () => {
    if (canSubmit()) {
      dispatch(
        apiLoginUser({
          email,
          password,
        })
      );
    }
  };

  const onChangeEmail = (e: any) => {
    const input = e.target.value;
    setEmail(input);
  };

  const onChangePassword = (e: any) => {
    const input = e.target.value;
    setPassword(input);
  };

  useEffect(() => {
    if (
      apiLoginStatus.status === cons.API_SUCCEEDED &&
      apiFetchUserStatus.status === cons.API_SUCCEEDED
    ) {
      dispatch(initLoginUserState());
      setEmail("");
      setPassword("");
      if (router.pathname === "/signup") {
        router.push("/");
      } else {
        closeModal();
      }
    }
  }, [apiLoginStatus.status, apiFetchUserStatus.status]);

  return (
    <Modal visible={visible} closeModal={closeModal} width="26rem">
      <ModalHeader title="ログイン" onClickClose={closeModal} />
      <FormContainer>
        <FormSet>
          <FormLabelStyle>メールアドレス</FormLabelStyle>
          <InputFormStyle
            placeholder="example@mail.com"
            value={email}
            onChange={onChangeEmail}
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </FormSet>
        <FormSet>
          <FormLabelStyle>パスワード</FormLabelStyle>

          <InputFormStyle
            type="password"
            placeholder=""
            value={password}
            onChange={onChangePassword}
            autoComplete="password"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </FormSet>

        {apiLoginStatus.error.length > 0 && (
          <SignupErrorStyle>{apiLoginStatus.error}</SignupErrorStyle>
        )}
        <SubmitButton
          disabled={
            !canSubmit() ||
            apiLoginStatus.status === cons.API_LOADING ||
            apiLoginStatus.status === cons.API_SUCCEEDED
          }
          onClick={onClickSubmit}
        >
          ログイン
        </SubmitButton>
        <TermsAndPrivacyStyle></TermsAndPrivacyStyle>
        <DividerStyle />
        <FooterWrapperStyle>
          <Link
            href={{
              pathname: router.pathname,
              query: { ...router.query, modal: cons.MODAL_LOGIN },
            }}
            passHref
            shallow
            replace
          >
            <GoToLoginButton>パスワードをお忘れの場合</GoToLoginButton>
          </Link>
        </FooterWrapperStyle>
      </FormContainer>
    </Modal>
  );
};

const FormContainer = styled.div`
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
  margin-top: -0.5rem;
`;

const FormSet = styled.div``;

const SubmitButton = styled.button`
  ${ButtonPrimaryLarge}
  width: 100%;
  margin-top: 2rem;
`;

const GoToLoginButton = styled.button`
  ${ButtonText}
`;