import React from "react";
import styled from "styled-components";

import {
  CONTAINER_WIDTH_NARROW,
  FONT_COLOR_NORMAL,
  FONT_COLOR_LIGHTEST,
} from "../../constants";
import { DottedBackground } from "../../styles/styled-components/Background";
import {
  ButtonPrimaryLarge,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import {
  FontSizeExLarge,
  FontSizeSemiLarge,
  FontSizeNormal,
} from "../../styles/styled-components/FontSize";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import { LayoutPlain } from "../commons/LayoutPlain";
import { SignupForm } from "./SignupForm";

interface Props {}

export const SignupPage: React.FC<Props> = ({}) => {
  return (
    <LayoutPlain>
      <ContentsWrapper imageUrl="/img/img/background.jpg">
        <HeroSection width={CONTAINER_WIDTH_NARROW}>
          <CatchCopy>
            <Title>旅行のストーリーを共有しましょう</Title>
            <Subtitle>
              TripNoteは旅行記共有サービスです。自分のアカウントを作成して好みのユーザーをフォローしたりあなたの旅行記を公開しましょう。
            </Subtitle>
          </CatchCopy>

          <Contents>
            <Label>アカウントを作成</Label>
            <FormBox>
              <SignupForm />
            </FormBox>
          </Contents>
        </HeroSection>

        <Mention>
          <a
            href="https://unsplash.com/ja?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
          の
          <a
            href="https://unsplash.com/@ploywanasiri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank"
            rel="noreferrer"
          >
            Wanaporn Yangsiri
          </a>
          が撮影した写真
        </Mention>
      </ContentsWrapper>
    </LayoutPlain>
  );
};

const ContentsWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 5rem);
  justify-content: center;
  width: 100%;

  ${DottedBackground}
`;

const HeroSection = styled.div`
  ${ContainerStyle}
  display: flex;
  justify-content: space-between;
  margin-top: 6rem;
`;

const CatchCopy = styled.div`
  color: white;
  /* max-width: 36rem; */
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;
`;

const Title = styled.div`
  ${FontSizeExLarge}
  font-weight: bold;
`;

const Subtitle = styled.div`
  ${FontSizeSemiLarge}
  font-weight: bold;
  opacity: 0.9;
  margin-top: 1em;
`;

const Contents = styled.div``;

const Label = styled.div`
  font-weight: bold;
  color: ${FONT_COLOR_NORMAL};
  ${FontSizeSemiLarge}
  margin-bottom: 1rem;
  color: white;
`;

const FormBox = styled.div`
  border: 1px solid ${FONT_COLOR_LIGHTEST};
  border-radius: 0.3rem;
  width: 26rem;
  background-color: rgba(255, 255, 255, 1);
`;

const Mention = styled.div`
  position: absolute;
  /* right: 1rem; */
  bottom: 1rem;
  /* margin: auto; */
  right: 2rem;

  color: white;
  & a {
    color: white;
  }
`;
