import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CAREER_TYPE_LIST, SELET_TITLE_LIST, SUBJECT_CATEGORY_LIST } from '../../constants/mainPageInfo';
import { userInfoState } from '../../recoil/atom/userInfo';
import styled from 'styled-components';
import { postMatchingInterest } from '../../lib/api/auth';
import { PatchInterestInfo } from '../../type/userInfo';

interface LearningSelectProps {
  isSubject: boolean;
  title: string;
}
const LearningSelect = (props: LearningSelectProps) => {
  const { isSubject, title } = props;

  const [userInfoAtom, setUserInfoAtom] = useRecoilState(userInfoState);
  const {
    career,
    interest: { priority1, priority2, priority3 },
  } = userInfoAtom;

  // console.log(userInfoAtom);
  const OPTION_LIST = isSubject ? SUBJECT_CATEGORY_LIST : CAREER_TYPE_LIST;

  const handleChangeOptionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (title) {
      case SELET_TITLE_LIST[0]:
        setUserInfoAtom({ ...userInfoAtom, career: e.target.value });
        handlePatchInterest({ career: e.target.value });
        break;
      case SELET_TITLE_LIST[1]:
        setUserInfoAtom({ ...userInfoAtom, interest: { ...userInfoAtom.interest, priority1: e.target.value } });
        handlePatchInterest({ priority1: e.target.value });

        break;
      case SELET_TITLE_LIST[2]:
        setUserInfoAtom({ ...userInfoAtom, interest: { ...userInfoAtom.interest, priority2: e.target.value } });
        handlePatchInterest({ priority2: e.target.value });

        break;
      case SELET_TITLE_LIST[3]:
        setUserInfoAtom({ ...userInfoAtom, interest: { ...userInfoAtom.interest, priority3: e.target.value } });
        handlePatchInterest({ priority3: e.target.value });

        break;
    }
  };

  const handlePatchInterest = async (patchInterest: PatchInterestInfo) => {
    const data = await postMatchingInterest(patchInterest);
    console.log(data);
  };
  const getSelectValue = () => {
    switch (title) {
      case SELET_TITLE_LIST[0]:
        return career;
      case SELET_TITLE_LIST[1]:
        return priority1;

      case SELET_TITLE_LIST[2]:
        return priority2;

      case SELET_TITLE_LIST[3]:
        return priority3;
    }
  };

  return (
    <St.SubjectArticleWrapper>
      <header>
        <h3>{title}</h3>
      </header>
      <St.SubjectSelect onChange={handleChangeOptionValue} value={getSelectValue()}>
        {OPTION_LIST.map((option) => (
          <St.SubjectOption key={option} value={option}>
            {option}
          </St.SubjectOption>
        ))}
      </St.SubjectSelect>
    </St.SubjectArticleWrapper>
  );
};

export default LearningSelect;
const St = {
  SubjectArticleWrapper: styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;

    h3 {
      margin-bottom: 0.7rem;
      margin-left: 0.5rem;

      ${({ theme }) => theme.fonts.Peer_Noto_B_Title_2}
      color: ${({ theme }) => theme.colors.Peer_Color_Gray};
    }
  `,
  SubjectSelect: styled.select`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 7.6rem;

    cursor: pointer;

    ${({ theme }) => theme.fonts.Peer_Noto_B_Content_1}
    background-color: ${({ theme }) => theme.colors.Pic_Color_Mint_1};
    border: 0.3rem solid ${({ theme }) => theme.colors.Peer_Color_Sky_2};
    border-radius: 10rem;

    appearance: none;

    &:hover {
      color: ${({ theme }) => theme.colors.Pic_Color_Mint_1};
      background-color: ${({ theme }) => theme.colors.Peer_Color_White_1};
    }
  `,
  SubjectOption: styled.option`
    text-align: center;
  `,
};