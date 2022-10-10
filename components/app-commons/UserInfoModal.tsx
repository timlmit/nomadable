import React, { useEffect } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { apiFetchUserWithStats } from "../../redux/slices/api/apiUserSlice";
import {
  closeModalGlobal,
  selectVisibleModal,
} from "../../redux/slices/uiSlice";
import {
  initUserWithStats,
  selectUserWithStats,
} from "../../redux/slices/userSlice";
import { AccountContents } from "../account/AccountContents";
import { Modal } from "../commons/Modal";

interface Props {}

export const UserInfoModal: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const visibleModal = useAppSelector(selectVisibleModal);
  const userWithStats = useAppSelector(selectUserWithStats);

  const visible = visibleModal.modalId === cons.MODAL_USER_INFO;
  const userId = visibleModal.referenceId;

  const closeModal = () => {
    dispatch(closeModalGlobal());
  };

  useEffect(() => {
    if (visible && userId !== userWithStats._id) {
      dispatch(initUserWithStats());
      dispatch(apiFetchUserWithStats({ userId }));
    } else {
    }
  }, [visible, userId]);

  return (
    <Modal visible={visible} closeModal={closeModal} width="30rem">
      <AccountContents userWithStats={userWithStats} isMyAccount={false} />
    </Modal>
  );
};

const UserInfoModalWrapper = styled.div``;
