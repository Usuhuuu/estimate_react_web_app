import React from "react";
import NavigationBar from "../nav";
import './CSS/design.css'
import Footer from "../footer";
const Business =() => {
return(
    <>
    <NavigationBar />
        <div className="Buhel">
            <h1>회사소개</h1>
            <div className="parameterBusiness">
            <p>안녕하십니까?고객 여러분!  HI 우리집 대표이사 한 명환 입니다.</p>
            <p>
            우리 회사는 종합 플랫폼 회사로서  국민 생활 개선 및 불편 해소를 위해 우리은행 출신 직원 50여 명이  뜻을 모아 설립하였습니다. 
            취급 업무는 종합인테리어, 부분인테리어(주방.도배) 설비 ㆍ누수 방수 ㆍ청소(이사ㆍ 입주ㆍ 에어컨) 입니다. 
            </p>
            <p>
            영업 권역은 서울 ㆍ경기ㆍ 인천 등 수도권 75개 지역이며, 지사 및 직할체제로 운영하고 있습니다.
            전국 국민 모든 분들을 우리 회사의 후원자요 영업사원으로 모시고자 합니다.
            </p>
            
            <p>
            집ㆍ건물 관련 공사를 소개하신 부동산 공인중개업소나 국민 누구 에게도 공사 수익금의 10%를 드려서
            영업수익을 함께 나누겠습니다.
            </p>
            
            <p>저희 임직원은 그간 우리은행에서 갈고 닦은 실력을 바탕으로 고객님들을 친절과 신뢰로 봉사하면서 공익도 함께
            추구하는 국민 기업이 되겠습니다.</p>
            <p>감사합니다.</p>
            </div>
        </div>
    </>
)
}
export default Business