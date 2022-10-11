import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { SectionLoader } from "../../components/commons/SectionLoader";
import { PlacePage } from "../../components/place/PlacePage";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchPlaceForPage,
  initapiFetchPlaceForPageState,
  selectApiFetchPlaceForPageStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  initPlaceForPage,
  selectPlaceForPage,
} from "../../redux/slices/placeSlice";

interface Props {}

const PlaceContainer: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const apiStatusFetchPlace = useAppSelector(selectApiFetchPlaceForPageStatus);
  const placeWithData = useAppSelector(selectPlaceForPage);

  /**
   * Effect
   */

  useEffect(() => {
    if (router.query.placeId) {
      const { placeId } = router.query;

      if (!placeId || typeof placeId !== "string") return;
      dispatch(apiFetchPlaceForPage({ placeId }));
    }

    return () => {
      dispatch(initPlaceForPage());
    };
  }, [router.query]);

  /**
   * Render
   */

  return (
    <Layout width={cons.CONTAINER_WIDTH_NARROW}>
      <HeadSetter
        pageTitle={`${placeWithData.spotName} | ${cons.APP_NAME}`}
        pageDescription={cons.APP_LONG_DESCRIPTION}
        pagePath={`${cons.APP_URL}/place/${placeWithData.id}`}
      />
      <SectionLoader
        visible={apiStatusFetchPlace.status === cons.API_LOADING}
      />
      <PlacePage placeWithData={placeWithData} />
    </Layout>
  );
};

export default PlaceContainer;
