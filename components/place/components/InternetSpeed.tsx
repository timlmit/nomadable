import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { ButtonPrimaryLarge } from "../../../styles/styled-components/Buttons";
import { NetSpeedIndicator } from "../../app-commons/NetSpeedIndicator";
import { SectionLoader } from "../../commons/SectionLoader";

interface Props {
  speedUp: number;
  speedDown: number;
  testCnt: number;
  onClickSpeedTest: () => void;
  loading: boolean;
  checkedInByUser: boolean;
}

export const InternetSpeed: React.FC<Props> = ({
  speedUp,
  speedDown,
  testCnt,
  onClickSpeedTest,
  loading,
  checkedInByUser,
}) => {
  return (
    <InternetSpeedWrapper>
      <SectionLoader visible={loading} />
      <SpeedSection>
        <Download>
          <Label>Download</Label>
          <SpeedResultWrapper>
            <NetSpeedIndicator speed={speedDown} />
          </SpeedResultWrapper>
        </Download>
        <Upload>
          <Label>Upload</Label>{" "}
          <SpeedResultWrapper>
            <NetSpeedIndicator speed={speedUp} />{" "}
          </SpeedResultWrapper>
        </Upload>
      </SpeedSection>
      <Devider />
      <TestSection>
        <TestButtonWrapper>
          <CheckInInfo>
            <CheckInNumber>{testCnt}</CheckInNumber> checked in this month
          </CheckInInfo>

          <CheckInButton onClick={onClickSpeedTest} disabled={checkedInByUser}>
            {checkedInByUser ? (
              <Fragment>
                <ButtonText>Check-In Completed</ButtonText>
                <ButtonSubtext>(disabeld for 6 hours)</ButtonSubtext>
              </Fragment>
            ) : (
              <Fragment>
                <ButtonText>Check In & Test WiFi</ButtonText>
                <ButtonSubtext>(earn 10pt)</ButtonSubtext>
              </Fragment>
            )}
          </CheckInButton>
        </TestButtonWrapper>
      </TestSection>
    </InternetSpeedWrapper>
  );
};

const InternetSpeedWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SpeedSection = styled.div`
  flex-grow: 1;
  display: flex;
`;

const TestSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TestButtonWrapper = styled.div``;

const Download = styled.div`
  flex-grow: 1;
`;

const Upload = styled.div`
  flex-grow: 1;
`;

const Label = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  margin-bottom: 0.7rem;
`;

const SpeedResultWrapper = styled.div`
  ${fs.FontSizeLarge}
`;

const Devider = styled.div`
  height: 4rem;
  width: 1px;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const CheckInInfo = styled.div`
  font-weight: 500;
  ${fs.FontSizeSemiSmall};
  color: ${cons.FONT_COLOR_LIGHT};
  display: flex;
  align-items: flex-end;
`;

const CheckInNumber = styled.span`
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 700;
  ${fs.FontSizeNormal}
  margin-right: 0.3rem;
`;

const CheckInButton = styled.button`
  ${ButtonPrimaryLarge};
  margin-top: 1rem;

  ${(props) =>
    props.disabled &&
    `
    background-color: #bee7e4;
    color: #044742;
    border: 1px solid #22b8ad;
  `};
`;

const ButtonText = styled.div``;

const ButtonSubtext = styled.div`
  ${fs.FontSizeSemiSmall}
  font-weight: 500;
  margin-top: 0.2rem;
  opacity: 0.9;
`;
