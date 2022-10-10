import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { EventContents } from "../../components/event/EventContents";
import { ConsoleShell } from "../../components/app-commons/ConsoleShell";
import { Layout } from "../../components/commons/Layout";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface Props {}

const EventContainer: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <Layout
      width={cons.CONTAINER_WIDTH_SO_NARROW}
      bgColor={cons.FONT_COLOR_SUPER_LIGHT}
    >
      <ConsoleShell pathname={router.pathname}>
        <EventContents />
      </ConsoleShell>
    </Layout>
  );
};

export default EventContainer;
