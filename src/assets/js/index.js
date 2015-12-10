import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './containers/App';
import Pokemon from './components/Pokemon';
import store from './store';

render(
  <div>
    <Provider store={store}>
			<Router history={createBrowserHistory()}>
				<Route path='/' component={App} >
					<Route path='pokemon' component={Pokemon} />
				</Route>
			</Router>
    </Provider>

    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,

  document.querySelector('#app')
);
