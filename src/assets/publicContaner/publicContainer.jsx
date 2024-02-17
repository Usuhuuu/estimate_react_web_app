import React from "react";
import { Routes,Route } from "react-router-dom";
import Interior from "./main/interior";
import Clean from "./main/cleaning";
import Repair from "./main/repair";
import Waterproof from "./main/waterproof";
import Waterleak from "./main/waterLeak";

import FloorAndWall from "./SUB/도배";
import Kitchen from "./SUB/주방";
import Waterwork from "./SUB/상수도";
import Sewer from "./SUB/하수도";
import Bathroom from "./SUB/욕실";
import PartInterior from "./main/partInterior";
import CheckWaterproof from "./main/checkWaterproof";

import Business from "./footerThings/회사소개";
import AgreeTerm from "./footerThings/이용약관";
import PrivateAgree from "./footerThings/개인정보";

const PublicContainer = () => {
    return (
        <>
        <Routes>
            <Route path="interior" element={<Interior />}/>  
            <Route path="partInterior" element={<PartInterior />}/>  

            <Route path="businessIntro" element={<Business/>} />
            <Route path="agreeterm" element={<AgreeTerm/>} />
            <Route path="privateagree" element={<PrivateAgree/>} />
            
            <Route path="repair"element={<Repair />}/>   
            <Route path='/repair/waterwork' element={<Waterwork />}/>
            <Route path='/repair/sewer' element={<Sewer />}/>
            <Route path='/repair/bathroom' element={<Bathroom/>}/>

            <Route path="cleaning"element={<Clean />}/> 
            <Route path="checkwaterproof"element={<CheckWaterproof />}/> 
            <Route path="waterproof"element={<Waterproof />}/> 
            <Route path='/waterproof/waterLeak' element={<Waterleak />}/>

            <Route path='/interior/floorAndWall' element={<FloorAndWall />}/>
            <Route path='/interior/kitchen' element={<Kitchen />}/>
        </Routes>
        </>
    )
}
export default PublicContainer;