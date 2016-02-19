import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScheduleTable } from '../components'

class SearchResults extends Component {

	render(){

		let tracks = this.props.schedule.items || []
		return (
			<ScheduleTable data={tracks} />
		)
	}
}

function mapStateToProps( state ) {
  const { trainSchedule } = state

  return {
    schedule: trainSchedule.tracks || {}
  }
}

export default connect(mapStateToProps)(SearchResults)
