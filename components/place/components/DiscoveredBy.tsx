import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";

interface Props {
  userName: string;
  userTitle: string;
  userPicture: string;
}

export const DiscoveredBy: React.FC<Props> = ({
  userName,
  userTitle,
  userPicture,
}) => {
  return (
    <DiscoveredByWrapper>
      <Label>Discovered by</Label>
      <UserInfo>
        <UserPicture src={userPicture} />
        <NameAndDescription>
          <Name>{userName}</Name>
          <Description>{userTitle}</Description>
        </NameAndDescription>
      </UserInfo>
    </DiscoveredByWrapper>
  );
};

const DiscoveredByWrapper = styled.div``;

const Label = styled.div`
  ${fs.FontSizeSemiSmall};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const UserInfo = styled.div`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
`;

const UserPicture = styled.img`
  width: 2.6rem;
  border-radius: 100%;
`;

const NameAndDescription = styled.div`
  margin-left: 0.8rem;
`;

const Name = styled.div`
  ${fs.FontSizeNormal};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const Description = styled.div`
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
  margin-top: 0.1rem;
`;
