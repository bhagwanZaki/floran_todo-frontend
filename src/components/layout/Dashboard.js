import React, {Fragment} from 'react'
import Todo from './Todo'
import Profile from './Profile'
import Form from './Form'
import Header from '../common/Header';
import Alerts from '../common/Alert';
export default function Dashboard() {
    return (
            <Fragment>
                <Header />
                <Alerts />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-12'>
                            <div className='row'>
                                <div className='col-md-12 col-12'>
                                    <Profile />
                                </div>
                                <div className='col-md-12 col-12'>
                                    <Form />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 col-12'>
                            <div className='col-12'>
                                <Todo />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}
