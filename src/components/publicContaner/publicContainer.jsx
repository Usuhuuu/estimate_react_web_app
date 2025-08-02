import { Routes, Route } from "react-router-dom";
import RepairContainer from "./main/repair";

import PartInterior from "./main/partInterior";
import WaterProofContainer from "./main/water_proof_container";

import Business from "./footerThings/회사소개";
import AgreeTerm from "./footerThings/이용약관";
import PrivateAgree from "./footerThings/개인정보";
import DynamicSubQuestions from "./estimate/dynamic_questions";

const PublicContainer = () => {
  return (
    <>
      <Routes>
        <Route path="part-interior" element={<PartInterior />} />
        <Route path="estimate/:type" element={<DynamicSubQuestions />} />
        <Route path="water" element={<WaterProofContainer />} />
        <Route path="repair" element={<RepairContainer />} />

        <Route path="businessIntro" element={<Business />} />
        <Route path="agreeterm" element={<AgreeTerm />} />
        <Route path="privateagree" element={<PrivateAgree />} />

        {/* repair, cleaning ednaring mapiig hiij gants page eer bugdiin gargana */}
      </Routes>
    </>
  );
};
export default PublicContainer;
