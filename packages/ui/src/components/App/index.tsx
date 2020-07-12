import React from 'react';
import {Root} from './styled';
import {Layout} from '../Layout';
import {Switch, Route} from 'react-router-dom';
import {LoginPage} from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { RequireAuthentication } from '../RequireAuthentication';

export function App() {

    return (
        <Root>
            <Layout>
                <div>
                    Header
                </div>
                <div>
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
                        <Route path="/dashboard" exact render={() => {
                            return (
                                <RequireAuthentication>
                                    <DashboardPage />
                                </RequireAuthentication>
                            );
                        }} />
                    </Switch>
                </div>
            </Layout>
        </Root>
    )

}