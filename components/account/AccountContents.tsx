import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { removeHttps } from "../../modules/StringConverter";
import { UserWithStats } from "../../redux/slices/userSlice";
import {
  FontSizeNormal,
  FontSizeSemiLarge,
  FontSizeSemiSmall,
} from "../../styles/styled-components/FontSize";
import { SectionLoader } from "../commons/SectionLoader";
import { AccountDetail } from "./AccountDetail";
import { StatsItems } from "./StatsItems";

interface Props {
  userWithStats: UserWithStats;
  isMyAccount: boolean;
}

export const AccountContents: React.FC<Props> = ({
  userWithStats,
  isMyAccount,
}) => {
  if (!userWithStats._id)
    return (
      <Wrapper>
        <SectionLoader visible />;
      </Wrapper>
    );

  return (
    <Wrapper>
      <Header>Account Page</Header>
      <BasicSecion>
        <NameAndDescription>
          <Picture src={userWithStats.picture} />
          <Name>{userWithStats.name}</Name>
          <Id>@{userWithStats.id}</Id>
          <Title>{userWithStats.title}</Title>
          <Description>{userWithStats.description}</Description>
          <LinkBio href={userWithStats.link} target="_blank" rel="noopener">
            <LinkIcon src="/icon/link-red.svg" />
            {removeHttps(userWithStats.link)}
          </LinkBio>
        </NameAndDescription>
        <StatsInfo>
          <StatsItems
            points={userWithStats.points}
            ranking={userWithStats.ranking}
            discovered={userWithStats.discovered}
            checkIns={userWithStats.checkIns}
          />
        </StatsInfo>
      </BasicSecion>
      <DetailSection>
        {/* <AccountDetail discoveredPlaces={} myReviews={} /> */}
      </DetailSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  position: relative;
  min-height: 100%;
`;

const Header = styled.div`
  border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  padding: 1rem 2rem;
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  ${FontSizeNormal}
`;

const BasicSecion = styled.div`
  margin-bottom: 3rem;
`;

const NameAndDescription = styled.div`
  padding: 2rem 2rem;
`;

const Picture = styled.img`
  width: 4rem;
`;
const Name = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  ${FontSizeSemiLarge};
`;

const Id = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall};
  font-weight: 400;
  margin-top: 0.1rem;
`;

const Title = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
  ${FontSizeSemiSmall};
  margin-top: 1rem;
  /* background-color: ${cons.FONT_COLOR_SUPER_LIGHT}; */
  /* padding: 0.2rem 0.4rem; */
  border-radius: 0.3rem;
  display: inline-block;
`;

const Description = styled.div`
  ${FontSizeNormal};
  margin-top: 0.6rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_SECONDARY};
  margin-bottom: 0.6rem;
`;

const LinkBio = styled.a`
  font-weight: 500;
`;

const LinkIcon = styled.img`
  width: 0.7rem;
  margin-right: 0.2rem;
`;

const StatsInfo = styled.div``;

const DetailSection = styled.div``;
const Detail = styled.div``;
