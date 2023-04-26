import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetLearningDetail from '../lib/hooks/useGetLearningDetail';
import styled from 'styled-components';

import { BackPageNav, UserInputBox, Error404, PeerNaHeader, LearningBtnList, QuestionTitle } from '../@components/@common';

const LearningDetailPage = () => {
  const { historyId } = useParams<{ historyId: string }>();
  const historyIdToNumber = Number(historyId) as number;

  // const { historyDetailInfo, isLoading, isError } = useGetLearningDetail(historyIdToNumber);
  const time = '2023-10-10';
  // if (isError) <Error404 />;

  return (
    <>
      <PeerNaHeader />
      <St.LearningDetailSection>
        <BackPageNav backTitle="메인으로" isAbsolute={true} />
        <div>
          <LearningBtnList isActive={true} />
          <QuestionTitle question={'OS의 데드락에 대해 설명해주세요'} isAnswer={true} />
          <p className="question_time">{time}</p>
          <St.UserInputBoxWrapper>
            <UserInputBox
              isModify={false}
              content="OS 데드락이란 두 개 이상의 프로세스나 스레드가 서로 자원을 얻지 못해서 다음 처리를 하지 못하는 상태이다."
              userName="happhee"
              imageUrl="https://avatars.githubusercontent.com/u/79238676?v=4"
            />
            <UserInputBox
              isModify={false}
              content="OS 데드락이란 두 개 이상의 프로세스나 스레드가 서로 자원을 얻지 못해서 다음 처리를 하지 못하는 상태이다."
              userName="happhee"
              imageUrl="https://avatars.githubusercontent.com/u/79238676?v=4"
            />
          </St.UserInputBoxWrapper>
        </div>
      </St.LearningDetailSection>
    </>
  );
};

export default LearningDetailPage;
const St = {
  LearningDetailSection: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    > div {
      width: 70%;
    }

    .question_time {
      padding: 1.3rem;

      ${({ theme }) => theme.fonts.Peer_Noto_R_SubTitle_1};
      text-align: end;
    }
  `,
  UserInputBoxWrapper: styled.section`
    display: grid;
    justify-content: center;
    align-items: center;

    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  `,
};