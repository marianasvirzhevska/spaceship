import React from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';

import mainMap0 from '../assets/map_0.jpg';
import mainMap1 from '../assets/map_1.jpg';
import mainMap2 from '../assets/map_2.jpg';
import mainMap3 from '../assets/map_3.jpg';
import mainMap4 from '../assets/map_4.jpg';
import mainMap5 from '../assets/map_5.jpg';
import mainMap6 from '../assets/map_6.jpg';
import mainMap7 from '../assets/map_7.jpg';

const MapSrcSet = {
    0: mainMap0,
    1: mainMap1,
    2: mainMap0,
    3: mainMap2,
    4: mainMap3,
    5: mainMap4,
    6: mainMap5,
    7: mainMap6,
    8: mainMap7,
};

export function Map() {
    const { id } = useParams(); 
    const mapImgSrc = id ? MapSrcSet[id] : mainMap1;

    return (
        <div className="task-container">
            <div className="content-wrapper">
                <div className="card-content">
                    <div className="map-container">
                        <Image src={mapImgSrc} alt="Карта завдань" width="100%" preview />
                    </div>
                </div>
            </div>
        </div>
    );
}