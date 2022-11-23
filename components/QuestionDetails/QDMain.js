import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import QDBody from './QDBody/QDBody';
import QDHeroSection from './QDHeroSection/QDHeroSection';

const QDMain = (props) => {
    return (
      <div>
        <QDHeroSection data={props.data}></QDHeroSection>
        <QDBody data={props.data}></QDBody>
      </div>
    );
};

export default QDMain;