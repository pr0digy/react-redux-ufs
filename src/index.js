import 'react-widgets/lib/less/react-widgets.less'
import './styles/base.less'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory, Link } from 'react-router'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
momentLocalizer(moment)


import trainSchedule from './reducers'
import { reducer as formReducer } from 'redux-form'
import { NoMatch } from './components'
import { Main, SearchResults } from './containers'

const reducer = combineReducers(Object.assign({}, {
	routing: routeReducer,
	form: formReducer,
	trainSchedule
}))

const middleware = syncHistory(browserHistory)


const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="tomorrow" preserveScrollTop={false}/>
  </DockMonitor>
)


const finalCreateStore = compose(
  applyMiddleware(middleware, thunkMiddleware),
  DevTools.instrument()
)(createStore)

const store = finalCreateStore(reducer)
middleware.listenForReplays(store)


ReactDOM.render(
	<Provider store={store}>
		<div className="container">
			<Router history={browserHistory}>
				<Route path="/" component={Main}>
					<Route path=":origin/:destination(/:date)" component={SearchResults}/>
					<Route path="*" component={NoMatch}/>
				</Route>
			</Router>
			<DevTools/>
		</div>
	</Provider>,
	document.getElementById('root')
)