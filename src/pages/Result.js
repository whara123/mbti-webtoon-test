import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateRecommned } from '../redux/modules/resultdata';
import { Navigate } from '../../node_modules/react-router-dom/index';

import FirstSection from '../components/Result/FirstSection';
import SecondSection from '../components/Result/SecondSection';
import Button from '../components/Button/Button';

const Result = () => {
  const dispatch = useDispatch();
  const mbti = useSelector((state) => state.mbti.result);
  if (!mbti) return <Navigate to="/" replace={true} />;

  const preventGoBack = () => {
    history.pushState(null, '', location.href);
  };
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  const resultData = (result) => {
    fetch(`https://mbtiwebtoontest.herokuapp.com/getData?name=${result}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(
          updateRecommned(data.recommendRandomData, data.rankData, true),
        );
      });
  };

  const mbtiResultData = (mbti) => {
    let genre = '';
    switch (mbti) {
      case 'INTP':
      case 'ISFP':
      case 'ENTP':
      case 'INFJ':
        genre = 'fantasy';
        break;
      case 'ENFJ':
        genre = 'romanceComic';
        break;
      case 'INFP':
      case 'ENTJ':
      case 'ISTP':
      case 'INTJ':
        genre = 'boys-drama';
        break;
      case 'ESTP':
        genre = 'boys';
        break;
      case 'ENFP':
      case 'ESFP':
      case 'ESFJ':
        genre = 'drama';
        break;
      case 'ISFJ':
      case 'ESTJ':
        genre = 'romance';
        break;
      case 'ISTJ':
        genre = 'romance-ori';
        break;
      default:
        console.log('올바르지 않은 정보');
        break;
    }
    resultData(genre);
  };

  useEffect(() => {
    mbtiResultData(mbti);
  }, []);

  return (
    <ResultWrap>
      <SrOnly>테스트 결과페이지 입니다.</SrOnly>
      <SectionWrap>
        <FirstSection />
        <SecondSection />
        <ButtonWrap>
          <Button
            text={'테스트 다시 하기'}
            backcolor={'#ed1c24'}
            color={'#fff'}
            goto={'/'}
            opacity={'rgba(237, 28, 36, 0.6)'}
          />
        </ButtonWrap>
      </SectionWrap>
    </ResultWrap>
  );
};

const ResultWrap = styled.div`
  height: inherit;
  background-color: #170512;
  overflow-x: hidden;
`;
const SectionWrap = styled.div`
  width: 390px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
`;

const SrOnly = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 30px;
`;

export default Result;
