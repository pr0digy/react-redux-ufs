import { schedules } from '../data'

export const REQUEST_TRACKS = 'REQUEST_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'

function requestTracks(params) {
	return {
		type: REQUEST_TRACKS,
		params
	}
}


function receiveTracks(params, data) {

	return {
		type: RECEIVE_TRACKS,
		params,
		data,
		receivedAt: Date.now()
	}
}


//this should be done on server side, date filter also can be included
function filterFunction( params ){
	return function( item ){
		return item.origin == params.origin.toLowerCase() && item.destination == params.destination.toLowerCase()	
	}
}

//emulate API fetch 
export function fetchTracks(params) {
	return dispatch => {
		dispatch(requestTracks(params))
			
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				let data = schedules.filter(filterFunction(params))	

				dispatch(receiveTracks(params, data))
				resolve()
				
			}, 100)
		})
	}
}