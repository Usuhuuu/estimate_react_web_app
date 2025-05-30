import React, { useEffect, useState } from "react";
import "../CSS/loading.css";
import RotateLoader from "react-spinners/RotateLoader";

const Loading = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div className="loadingOverlay">
      <p style={{ padding: 15, font: 15 }}>잠시만 기다려 주세요</p>
      <RotateLoader
        loading={loading}
        color="#0056b3"
        size={20}
        className="loadingAnime"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
