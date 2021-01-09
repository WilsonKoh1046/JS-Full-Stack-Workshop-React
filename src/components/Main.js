import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Account from './account/Account';

export default function Main() {
    return (
        <main>
            <Switch>
                <Route  exact path='/' component={Home} />
                <Route path='/account' component={Account} />
            </Switch>
        </main>
    );
}