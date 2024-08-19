import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const YandexMap = () => {
  return (
    <YMaps>
      <div
        style={{
          borderRadius: "10px", // радиус границы
          overflow: "hidden", // чтобы содержимое не выходило за границы
        }}
      >
        <Map
          defaultState={{
            center: [44.825255, 65.488591], // координаты центра карты (Москва)
            zoom: 18, // масштаб карты
          }}
          width="100%" // ширина карты
          height="300px" // высота карты
        >
          <Placemark geometry={[44.825255, 65.488591]} />
        </Map>
      </div>
    </YMaps>
  );
};

// 7404d4a8-4302-4310-91cf-395abdc9ccc2
export default YandexMap;
