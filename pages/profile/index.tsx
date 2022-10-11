import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { AccountContents } from "../../components/account/AccountContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchMyAccountWithStats,
  selectApiFetchMyAccountWithStatsStatus,
} from "../../redux/slices/api/apiUserSlice";
import { selectMyAccountWithStats } from "../../redux/slices/userSlice";

interface Props {}

const AccountContainer: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const apiStatus = useAppSelector(selectApiFetchMyAccountWithStatsStatus);
  const userWithStats = useAppSelector(selectMyAccountWithStats);

  useEffect(() => {
    if (apiStatus.status === cons.API_IDLE) {
      dispatch(apiFetchMyAccountWithStats({}));
    }
  }, [apiStatus]);

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_SO_NARROW}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
    >
      <HeadSetter
        pageTitle={`Profile | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/profile`}
      />
      <ConsoleShell pathname={router.pathname}>
        <AccountContents userWithStats={userWithStats} isMyAccount />
      </ConsoleShell>
    </Layout>
  );
};

const AccountWrapper = styled.div``;

export default AccountContainer;
