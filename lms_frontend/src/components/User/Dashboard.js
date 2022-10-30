import React from 'react';
import UserSidebar from './UserSidebar';

function Dashboard(){
    return(
        <div className='container-fluid' width={100}>
            <div className='row'>
                <aside className='col-md-3'> <UserSidebar /> </aside>
                <section className='col-md-7 mt-3'>
                    Dashboard
                </section>
           </div>
        </div>
    )
}

export default Dashboard;