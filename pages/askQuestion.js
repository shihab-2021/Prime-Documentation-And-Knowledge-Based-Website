import React from 'react';
import AQMain from '../components/AskQuestion/AQMain/AQMain';
import authCheck from '../hook/authCheck';

const askQuestion = () => {
    return (
        <div>
            <AQMain></AQMain>
        </div>
    );
};

export default authCheck(askQuestion);