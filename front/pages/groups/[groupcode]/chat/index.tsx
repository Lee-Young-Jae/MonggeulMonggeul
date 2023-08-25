import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import Button from "@/components/common/button";
import useSocket, { EventProps } from "@/hooks/socket/useSocket";
import useSocketEmit from "@/hooks/socket/useSocketEmit";
import { socket } from "@/apis/config/socket.io";
import { useGetMyProfile } from "@/hooks/queries/user/useGet";
import { User } from "@/types/user";
import Image from "next/image";
import Loading from "@/components/common/loading";

interface receivedMessageProps {
  message: string;
  time: string;
  user: User;
  type: "chat" | "join" | "leave";
}

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const ChatContainer = styled.div`
  display: flex;

  height: 500px;
  width: auto;
  background-color: #fff;
  border-radius: 14px;
  padding: 0px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  // 스크롤바 숨기기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  flex-direction: column-reverse;
`;

const ChatItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  box-sizing: border-box;
  padding: 10px;
`;

const ChatItemHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: flex-end;

  & > p {
    margin: 0px;
    margin-left: 10px;
  }
`;

const TimeStamp = styled.p`
  margin: 0px;
  color: #999999;
  font-size: 12px;
`;

const ChatItemBody = styled.div`
  border-radius: 5px;
  overflow-wrap: break-word;
  width: 100%;
  word-break: keep-all;
`;

const JoinMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  border-radius: 5px;
  color: #999999;
  margin-top: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const Message = styled.div``;

const Chat = () => {
  const router = useRouter();
  const { groupcode } = router.query;
  const { data: userProfile, isSuccess: getUserProfileSuccess } =
    useGetMyProfile({
      staleTime: 1000 * 60 * 10,
    });

  const [receivedMessages, setReceivedMessages] = useState<
    receivedMessageProps[]
  >([]);
  const [message, messageHandler, resetMessage] = useInput();
  const events: EventProps[] = [
    {
      name: "chat",
      handler: (data: receivedMessageProps) => {
        setReceivedMessages((prev) => [data, ...prev]);
      },
    },

    {
      name: "joinedUser",
      handler: (data: receivedMessageProps) => {
        if (data) {
          setReceivedMessages((prev) => [data, ...prev]);
        }
      },
    },

    {
      name: "leavedUser",
      handler: (data: receivedMessageProps) => {
        if (data) {
          setReceivedMessages((prev) => [data, ...prev]);
        }
      },
    },
  ];
  useSocket(events);
  const { emit } = useSocketEmit();

  const sendMessage = (event: any) => {
    event.preventDefault();
    emit(
      "chat",
      { message, user: userProfile, roomId: groupcode },
      (error: any) => {
        if (error) {
          alert(error);
        }
      }
    );
    resetMessage();
  };

  useEffect(() => {
    // groupcode로 socket 연결
    if (!groupcode || !getUserProfileSuccess) return;

    socket.connect();
    socket.emit(
      "join",
      { roomId: groupcode, user: userProfile },
      (error: any) => {
        if (error) {
          alert(error);
        }
      }
    );

    return () => {
      socket.emit("leave", { roomId: groupcode, user: userProfile });
      socket.disconnect();
    };
  }, [getUserProfileSuccess, groupcode]);

  if (!getUserProfileSuccess) {
    return <Loading />;
  }

  return (
    <GroupPage>
      <PageContent>
        <ChatContainer>
          {receivedMessages.map((message, index) =>
            message.type === "chat" ? (
              <ChatItem key={index}>
                <ChatItemHeader>
                  <UserProfile>
                    <ProfileImage
                      width={35}
                      height={35}
                      src={message.user.profileImage}
                      alt={message.user.profileImage}
                    />
                    <p>{message.user.name}</p>
                  </UserProfile>
                </ChatItemHeader>
                <ChatItemBody>
                  <Message>{message.message}</Message>
                  <TimeStamp>{message.time}</TimeStamp>
                </ChatItemBody>
              </ChatItem>
            ) : message.type === "join" ? (
              <JoinMessage key={index}>
                <p>{message?.user?.name}님이 입장하셨습니다.</p>
              </JoinMessage>
            ) : (
              <JoinMessage key={index}>
                <p>{message?.user?.name}님이 퇴장하셨습니다.</p>
              </JoinMessage>
            )
          )}
        </ChatContainer>

        <form>
          <Input value={message} onChange={messageHandler} />
          <Button
            onClick={(e) => {
              sendMessage(e);
            }}
          >
            Send
          </Button>
        </form>
      </PageContent>
    </GroupPage>
  );
};

export default Chat;
