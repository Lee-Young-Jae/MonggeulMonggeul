import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../modal";
import Input from "../Input";
import useInput from "@/hooks/common/useInput";
import Button from "../button";
import Link from "next/link";
import { useLeaveGroup } from "@/hooks/queries/group/useDelete";
import { useRouter } from "next/router";

const GroupActionsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FunctionLinkStyle = styled(Link)`
  text-decoration: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width: 100%;
`;

const GroupActionStyle = styled.div`
  cursor: pointer;
`;

const ModalTitleStyle = styled.div`
  text-align: center;
`;

const GroupActions = () => {
  const [groupJoinModal, setGroupJoinModal] = useState(false);
  const [groupLeaveModal, setGroupLeaveModal] = useState(false);

  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const [groupInviteModal, setGroupInviteModal] = useState(false);
  const [groupJoinInputValue, groupJoinInputHandler] = useInput("");
  const { mutateAsync: leaveGroup } = useLeaveGroup();

  const router = useRouter();
  return (
    <GroupActionsStyle>
      <GroupActionStyle
        onClick={() => {
          setGroupJoinModal(true);
        }}
      >
        새로운 모임 참가
      </GroupActionStyle>
      {groupJoinModal && (
        <Modal
          visible={groupJoinModal}
          onClose={() => {
            setGroupJoinModal(false);
          }}
        >
          <ModalTitleStyle>
            친구들이 초대한 모임에 참가해보세요!
          </ModalTitleStyle>
          <Input
            value={groupJoinInputValue}
            onChange={groupJoinInputHandler}
            placeholder="모임 코드를 입력해주세요"
          ></Input>
          <Button>참가하기</Button>
        </Modal>
      )}
      <FunctionLinkStyle
        href={{
          pathname: `/groups`,
        }}
        about="새로운 모임 생성"
      >
        새로운 모임 생성
      </FunctionLinkStyle>
      <GroupActionStyle
        onClick={() => {
          setGroupLeaveModal(true);
        }}
      >
        모임 나가기
      </GroupActionStyle>
      {groupLeaveModal && (
        <Modal
          visible={groupLeaveModal}
          onClose={() => {
            setGroupLeaveModal(false);
          }}
        >
          <ModalTitleStyle>정말로 모임을 나가시겠습니까?</ModalTitleStyle>
          <Button
            onClick={async () => {
              const code = router.query.groupcode as string;
              const result = await leaveGroup(code);
              if (result) {
                console.log(result);
                router.push("/auth");
              }
              setGroupLeaveModal(false);
            }}
          >
            나가기
          </Button>
        </Modal>
      )}
    </GroupActionsStyle>
  );
};

export default GroupActions;
