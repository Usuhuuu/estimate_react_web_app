import React from "react";
import { Link } from "react-router-dom";
import "../CSS/style.css"

const Artic = () => {
return (
    <>
    <article>
    <h1>홈서비스</h1>
    <h3>인기 추천 서비스</h3>
    <p>작은 변화로 새로운 공간 만들기</p>
    <div className="homeServiceContainer" />
    <div className="homeService">
        <div className="service">
            <Link to="/interior"><img src="/Photo/homeInterior.png" alt="집인테리어" /></Link>
            <p >집인테리어</p>
        </div>
        <div className="service">
            <Link to="/interior"><img src="/Photo/상업인테리어.jpg" alt="상업인테리어" /></Link>
            <p >상업인테리어</p>
        </div>
        <div className="service">
            <Link to="/cleaning"><img src="/Photo/에어컨청소.png" alt="에어컨청소" /></Link>
            <p >에어커 청소</p>
        </div>
        <div className="service">
            <Link to="/cleaning"><img src="/Photo/청소.jpg" alt="청소" /></Link>
            <p >청소</p>
        </div> 
        <div className="service">
            <Link to="/interior/kitchen"><img src="/Photo/주방인테리어.jpg" alt="주방 인테리어" /></Link>
            <p >주방 인테리어</p>
        </div>
        <div className="service">
            <Link to="/interior/floorAndWall"><img src="/Photo/도배장판.jpg" alt="도배 장판" /></Link>
            <p >도배 / 장판</p>
        </div>
        <div className="service">
            <Link to="/checkwaterproof"><img src="/Photo/방수.png" alt="방수 누수"/></Link>
            <p >방수 / 누수</p>
        </div>
        <div className="service">
            <Link to="/repair"><img src="/Photo/설비.jpg" alt="thirdService" /></Link>
            <p >설비 / 수리</p>
        </div>
    </div>
    </article>
    
</>

)};

export default Artic;