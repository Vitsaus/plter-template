import React from 'react';
import {Root} from './styled';
import {Layout} from '../Layout';
import {Switch, Route, useHistory, Link} from 'react-router-dom';
import {LoginPage} from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { RequireAuthentication } from '../RequireAuthentication';
import { RegisterPage } from '../../pages/RegisterPage';
import { tokenState } from '../../states/user';
import { useRecoilState } from 'recoil';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function App() {

    const [token, setToken] = useRecoilState(tokenState);

    const history = useHistory();

    return (
        <Root>
            <Layout>
                <div>
                    <Header />
                    <div>
                        {token && (
                            <div onClick={() => {
                                localStorage.removeItem('token');
                                setToken(null);
                                history.push('/');
                            }}>
                                Logout
                            </div>
                        )}
                        {!token && (
                            <div>
                                <Link to="/">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
                        <Route path="/register" exact component={RegisterPage} />
                        <Route path="/dashboard" exact render={() => {
                            return (
                                <RequireAuthentication>
                                    <DashboardPage />
                                </RequireAuthentication>
                            );
                        }} />
                    </Switch>
                </div>
                <Footer />
            </Layout>
        </Root>
    )

}