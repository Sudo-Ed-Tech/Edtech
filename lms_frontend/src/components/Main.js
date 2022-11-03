import React from 'react'
import {Routes as Switch,Route} from 'react-router-dom';
import LogReg from './LogReg';
import Didactic from './Didactic';

function Main() {
    return (
         <div className="App">
            <Switch>
                <Route path="/lg" element={<LogReg />} />
                <Route path="" element={<Didactic />} />    
            </Switch>
        </div>
    );
}
export default Main;