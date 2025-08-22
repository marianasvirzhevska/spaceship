import React from 'react';
import { Image } from 'primereact/image';

import gift1 from '../assets/svg/Asset_1.svg';
import gift2 from '../assets/svg/Asset_2.svg';
import gift3 from '../assets/svg/Asset_3.svg';
// import gift4 from '../assets/svg/Asset_4.svg';

export function Gifts() {
    return (
        <div className="gifts">
            {/* <Image src={gift4} alt="Gift" width="100%" className='gift gift-four' /> */}
            <Image src={gift3} alt="Gift" width="100%" className='gift gift-three bounce-1' />
            <Image src={gift1} alt="Gift" width="100%" className='gift gift-one bounce-2' />
            <Image src={gift2} alt="Gift" width="100%" className='gift gift-two bounce-3' />
        </div>
    )
}
