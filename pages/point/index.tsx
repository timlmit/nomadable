import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { PointContents } from "../../components/Point/PointContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import HeadSetter from "../../components/commons/HeadSetter";

interface Props {}

const PointContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_SO_NARROW}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
    >
      <HeadSetter
        pageTitle={`Point | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/point`}
      />
      <ConsoleShell pathname={router.pathname}>
        <Wrapper>Comming soon...</Wrapper>
      </ConsoleShell>
    </Layout>
  );
};

export default PointContainer;

const Wrapper = styled.div`
  padding: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
`;
