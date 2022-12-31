import React, { Fragment } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useGoogleLogin } from "@react-oauth/google";
import { APP_URL } from "../../constants";
import { ButtonSecondaryLarge } from "../../styles/styled-components/Buttons";

interface Props {
  handleClickGoogle: (code: string) => void;
  loginForElectron: (authCode: string) => void;
  isElectron: boolean;
  text: string;
}

export const GoogleLoginButton: React.FC<Props> = (props) => {
  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      console.log(
        "🚀 ~ file: GoogleLoginButton.tsx:18 ~ codeResponse",
        codeResponse
      );
      props.handleClickGoogle(codeResponse.code);
    },
    onError: (error: any) => console.log(error),
    flow: "auth-code",
    ux_mode: "popup",
  });

  // const handleClickGoogleLoginElectron = () => {
  //   const authCode = uuidv4();
  //   window.open(`${APP_URL}/electron-google-login?authCode=${authCode}`);

  //   let x = 0;
  //   const _interval = setInterval(() => {
  //     props.loginForElectron(authCode);
  //     if (++x > 20) {
  //       clearInterval(_interval);
  //     }
  //   }, 1000);
  // };

  // if (props.isElectron) {
  //   return (
  //     <WhiteButton onClick={handleClickGoogleLoginElectron}>
  //       <GLogo src="/icons/g-logo.png" />
  //       Login with Google
  //     </WhiteButton>
  //   );
  // }

  return (
    <WhiteButton onClick={handleClickGoogleLogin}>
      <GLogo src="/icon/g-logo.png" />
      {props.text}
    </WhiteButton>
  );
};

const GLogo = styled.img`
  width: 18px;
  margin-right: 1rem;
  /* opacity: 0.6; */
`;

const WhiteButton = styled.button`
  ${ButtonSecondaryLarge};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
