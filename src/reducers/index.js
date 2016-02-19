import { REQUEST_TRACKS, RECEIVE_TRACKS } from '../actions'


function posts(state = {isFetching: false, items: []}, action) {
	
	switch ( action.type ) {
		case REQUEST_TRACKS:
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_TRACKS:
			return Object.assign({}, state, {
				isFetching: false,
				items: action.data,
				lastUpdated: action.receivedAt
			})
		default:
			return state
	}
}

function trainSchedule(state = {}, action) {
	switch (action.type) {
		case RECEIVE_TRACKS:
		case REQUEST_TRACKS:
			return Object.assign({}, state, {
				tracks: posts(state.tracks, action)
			})
		default:
			return state
	}
}


export default trainSchedule