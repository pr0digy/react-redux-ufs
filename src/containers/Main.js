import React from 'react'
import { Provider, connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { SearchForm } from './'

class Main extends React.Component {

	render(){
		return (
			<div>
				<div className="row">
					<div id="header" className="col-md-12 text-center">
						<h3>Поиск билетов</h3>
					</div>
				</div>	
				<SearchForm/>
				<hr/>
				{this.props.children}
			</div>	
		)
	}
}


export default connect()(Main)