import React, {Component, PropTypes} from 'react'
import moment from 'moment'

class ScheduleTable extends React.Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	render(){

		let data = this.props.data
		let content
		let title

		if( data.length ) {

			title = `Найдено ${data.length} рейсов`

			let headings = (
				<tr>
					<th>Поезд</th>
					<th>Маршрут</th>
					<th>Время</th>
					<th>Стоимость</th>
				</tr>	
			)
			

			let rows = data.map(data => {
				return(
					<tr key={`${data.id}-st-tr`}>
						<td>{data.name}</td>
						<td>{data.route}</td>
						<td>{moment(data.times.departure).format('LLL')}</td>
						<td>{data.price} р.</td>
					</tr>	
				)
			})

			content = <table className="table table-striped table-hover"><thead>{headings}</thead><tbody>{rows}</tbody></table>

		} else {
			content = ''
			title = 'Поезда не найдены'
		}

		return (
			<div className="container">
				<div className="panel panel-default">
					<div className="panel-heading">
				    <h3 className="panel-title">{title}</h3>
				  </div>
					<div className="panel-body">
						{content}
					</div>	
				</div>
			</div>
		)
	}
}

export default ScheduleTable