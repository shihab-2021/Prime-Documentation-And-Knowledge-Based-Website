import React from 'react';
import MainAsk from '../components/Ask/MainAsk/MainAsk';
import authCheck from '../hook/authCheck';

const ask = () => {
    return (
        <div>
            <MainAsk></MainAsk>
        </div>
    );
};

export default authCheck(ask);