import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as cons from "../../constants";
import { isEmail, isPassword } from "../../modules/StringValidator";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiSignupWithEmail,
  initApiSignupWithEmailState,
  selectApiSignupWithEmailStatus,
} from "../../redux/slices/api/apiUserSlice";

import {
  ButtonPrimaryLarge,
  ButtonText,
} from "../../styles/styled-components/Buttons";

import {
  DividerStyle,
  ErrorMsgStyle,
  FooterWrapperStyle,
  FormLabelStyle,
  InfotipStyle,
  InputFormStyle,
  RedSpanStyle,
  SignupErrorStyle,
  TermsAndPrivacyStyle,
} from "../../styles/styled-components/Forms";

interface Props {}

export const SignupForm: React.FC<Props> = ({}) => {
  const router = useRouter();
  const apiSignupStatus = useAppSelector(selectApiSignupWithEmailStatus);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const canSubmit = () => {
    if (!isEmail(email)) return false;
    if (!isPassword(password, 8)) return false;
    return true;
  };

  const onClickSubmit = () => {
    if (canSubmit()) {
      // doSignupWithEmail(dispatch, email, password, userName);
      dispatch(apiSignupWithEmail({ email, password, userName }));
    }
  };

  const onChangeEmail = (e: any) => {
    const input = e.target.value;

    setEmail(input);

    if (isEmail(input) || input === "") {
      setEmailError("");
    } else {
      setEmailError("メールアドレスが不正です。");
    }
  };

  const onChangePassword = (e: any) => {
    const input = e.target.value;
    setPassword(input);

    if (isPassword(input, 8) || input === "") {
      setPasswordError("");
    } else {
      setPasswordError(
        "パスワードは数字を含んだ8文字以上の英数字を設定ください。"
      );
    }
  };

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    if (apiSignupStatus.status === cons.API_SUCCEEDED) {
      router.push("/signup-succeeded");
    }
  }, [apiSignupStatus.status]);

  useEffect(() => {
    return () => {
      dispatch(initApiSignupWithEmailState());
    };
  }, []);

  return (
    <FormContainer autoComplete="off">
      <FormSet>
        <FormLabelStyle>
          メールアドレス <RedSpanStyle>*</RedSpanStyle>
        </FormLabelStyle>
        <InputFormStyle
          placeholder="example@mail.com"
          value={email}
          onChange={onChangeEmail}
          error={emailError.length > 0}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <ErrorMsgStyle>{emailError}</ErrorMsgStyle>
      </FormSet>
      <FormSet>
        <FormLabelStyle>
          パスワード <RedSpanStyle>*</RedSpanStyle>
        </FormLabelStyle>
        <InfotipStyle>8文字以上の半角英数字</InfotipStyle>
        <InputFormStyle
          type="password"
          placeholder=""
          value={password}
          onChange={onChangePassword}
          error={passwordError.length > 0}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <ErrorMsgStyle>{passwordError}</ErrorMsgStyle>
      </FormSet>
      <FormSet>
        <FormLabelStyle>TripNoteで表示される名前</FormLabelStyle>
        <InputFormStyle
          placeholder="ユーザー名"
          value={userName}
          onChange={onChangeUserName}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </FormSet>
      {apiSignupStatus.error.length > 0 && (
        <SignupErrorStyle>{apiSignupStatus.error}</SignupErrorStyle>
      )}
      <SubmitButton
        disabled={
          !canSubmit() ||
          apiSignupStatus.status === cons.API_LOADING ||
          apiSignupStatus.status === cons.API_SUCCEEDED
        }
        onClick={onClickSubmit}
      >
        登録する
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
          <GoToLoginButton>ログインはこちら</GoToLoginButton>
        </Link>
      </FooterWrapperStyle>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
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
