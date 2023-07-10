import React from "react";
import { GroupPage, PageContent } from "@/components/layout/GroupLayout";

import { useRouter } from "next/router";

const PollPage = () => {
  const router = useRouter();
  return (
    <GroupPage>
      <PageContent>
        <div>
          <h1>투표 목록</h1>
          <button
            onClick={() => {
              router.push(`/groups/${router.query.group}/poll/create`);
            }}
          >
            투표 생성하기
          </button>
        </div>
        <div>
          <span>첫 투표를 만들어보세요!</span>
        </div>
      </PageContent>
    </GroupPage>
  );
};

export default PollPage;
