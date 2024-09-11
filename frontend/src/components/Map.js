import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    const { kakao } = window;

    const container = document.getElementById("map");

    const options = {
      center: new kakao.maps.LatLng(35.1694334, 128.1313252),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(35.1694334, 128.1313252);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "70%",
        height: "500px",
      }}
    ></div>
  );
};

export default KakaoMap;
