import React from 'react';
import Routes from './routes';
import {TitleBar } from '@reperio/ui-components'

const App = () => (
    <div className="app-main">
        <div className="page-container">
            <TitleBar
                isAuthenticated={false}
                profile={null}
                applicationMenuItems={[]} />
            <Routes/>
        </div>
    </div>
);
export default App;