import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { BackPageNav, LearningHeader, PeerNaHeader } from '../@components/@common';
import { AnswerPaging, DetailModal } from '../@components/AnswerListPage';
import useModal from '../lib/hooks/useModal';
import ModalPortal from '../ModalPortals';
import { problemInfoState } from '../recoil/atom/problemInfo';

const AnswerListPage = () => {
  const { isPeernaModal } = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { question } = useRecoilValue(problemInfoState);

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <PeerNaHeader />
      <St.AnswerListWrapper>
        <St.HeaderWrapper ref={scrollRef}>
          <LearningHeader title={question} pageType="answerList" />
        </St.HeaderWrapper>
        <AnswerPaging handleScrollToTop={handleScrollToTop} />
      </St.AnswerListWrapper>
      {isPeernaModal && (
        <ModalPortal>
          <DetailModal />
        </ModalPortal>
      )}
    </>
  );
};

export default AnswerListPage;
const St = {
  AnswerListWrapper: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    gap: 1.7rem;

    width: 100%;

    padding: 2.9rem 2.6rem;
    margin-bottom: 1rem;
  `,
  HeaderWrapper: styled.div`
    width: 100%;
  `,

  UserInputBoxWrapper: styled.section`
    display: grid;
    justify-content: center;
    align-items: center;

    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  `,
};
