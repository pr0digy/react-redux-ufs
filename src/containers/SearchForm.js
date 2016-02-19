import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { reduxForm } from 'redux-form'
import { routeActions } from 'react-router-redux'
import { fetchTracks } from '../actions'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { cities } from '../data'

export const fields = ['origin', 'destination', 'date']

const submit = (values, dispatch) => {

	//emulate server side validation
	return new Promise((resolve, reject) => {
		setTimeout(() => {

			let validOrigin = values.origin && (/^[a-zа-я]+$/i).test(values.origin)
			let validDestination = values.destination && (/^[a-zа-я]+$/i).test(values.destination)
			let errors = {}

			if ( !validOrigin || !validDestination ) {
				
				if( !validOrigin ) Object.assign(errors, {origin: 'Only alphabetic characters are allowed.'})
				if( !validDestination ) Object.assign(errors, {destination: 'Only alphabetic characters are allowed.'})
				reject(errors)

			} else {

				const origin = cities[values.origin.toLowerCase()] || 'unknown'
				const destination = cities[values.destination.toLowerCase()] || 'unknown'

				if ( values.date ) {
					let date = moment(values.date).format('YYYY-MM-DD')
					dispatch(routeActions.push(`/${origin}/${destination}/${date}`))	
				} else {
					dispatch(fetchTracks({origin: origin, destination: destination}))
					dispatch(routeActions.push(`/${origin}/${destination}`))	
				}
				
				resolve()
			}
		}, 100)
	})
}

const fixBlur = (event, input) => {
  event.target = {value: input.value}
  input.onBlur(event)  
}

class SearchForm extends Component {

	static propTypes = {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		resetForm: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired
	};

	render() {
		
		const {fields: {origin, destination, date}, error, resetForm, handleSubmit, submitting} = this.props

		return (
			<form className="inline-form" onSubmit={handleSubmit(submit)}>

				<div className="col-md-4">
					<div className={classNames({'form-group': true, 'has-warning': origin.error})}>
						<input type="text" placeholder="Откуда" {...origin} className="form-control"/>
					</div>
				</div>

				<div className="col-md-4">
					<div className={classNames({'form-group': true, 'has-warning': destination.error})}>
						<input type="text" placeholder="Куда" {...destination} className="form-control"/>
					</div>
				</div>

				<div className="col-md-3">
					<DateTimePicker min={new Date()} time={false} {...date} placeholder="Когда" onBlur={(event) => fixBlur(event, date)}/>
				</div>
				
				<div className="col-md-1 text-right">
					<div className="form-group">
						<button type="submit" disabled={submitting} className="btn btn-primary">
							<span className={classNames({glyphicon: true, 'glyphicon-refresh': submitting, 'spinning': submitting})}></span> Поиск
						</button>
					</div>	
				</div>

			</form>
		)
	}
}

export default reduxForm({
	form: 'submitValidation',
	fields
})(SearchForm)