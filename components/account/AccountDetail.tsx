import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Place } from "../../redux/slices/placeSlice";

interface Props {
  discoveredPlaces: Place[];
  myReviews: any[];
}

export const AccountDetail: React.FC<Props> = ({}) => {
  return <AccountDetailWrapper></AccountDetailWrapper>;
};

const AccountDetailWrapper = styled.div``;
