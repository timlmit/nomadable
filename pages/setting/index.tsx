import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { PointContents } from "../../components/Point/PointContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SettingContents } from "../../components/setting/SettingContents";
import HeadSetter from "../../components/commons/HeadSetter";

interface Props {}

const SettingContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_SO_NARROW}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
    >
      <HeadSetter
        pageTitle={`Setting | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/setting`}
      />
      <ConsoleShell pathname={router.pathname}>
        <SettingContents />
      </ConsoleShell>
    </Layout>
  );
};

export default SettingContainer;

const Wrapper = styled.div`
  padding: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
`;
