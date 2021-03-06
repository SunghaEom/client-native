import { handleActions } from "redux-actions";
import Immutable from "immutable";

import {
  LOAD_RESERVATION,
  LOAD_RESERVATION_SUCCESS,
  LOAD_RESERVATION_FAILURE,
  ADD_RESERVATION,
  ADD_RESERVATION_SUCCESS,
  ADD_RESERVATION_FAILURE,
  MOD_RESERVATION,
  MOD_RESERVATION_SUCCESS,
  MOD_RESERVATION_FAILURE,
} from '../actions/reservation'

const initialState = Immutable.fromJS ({
  reservation: {
    loading: false,
    error: null,
    list: null,
    //tmp_alarm: null,
  },
});


// "reservations": [
//   {
//     "reservation_id": "reservation id",
//     "device_id": "device id",
//     "user_id": "user id",
//     "startTime": "10:00",
//     "endTime": "14:00",
//     "every": [
//       "mon",
//       "tue",
//       "wed",
//       "thr",
//       "fri"
//     ],
//     "invokeTime": 1530493200000,
//     "notification": true,
//     "notificationIds": [
//       15304931400001,
//       15304931400002,
//       15304931400003,
//       15304931400004,
//       15304931400005
//     ],
//     "light": 60,
//     "fanPower": 80,
//     "scentInfo": {
//       "name": "scent name",
//       "img": "scent img",
//       "cartridges": [
//         {
//           "scent": "lavender",
//           "fan": 70
//         },
//         {
//           "scent": "peppermint",
//           "fan": 50
//         },
//         {
//           "scent": "lemon",
//           "fan": 30
//         },
//         {
//           "scent": "sandalwood",
//           "fan": 20
//         }
//       ]
//     }
//   }
// ]
//


export default handleActions ({
  [LOAD_RESERVATION] (reservationState, {payload}) {
    console.log ("LOAD_RESERVATION: ", payload);

    const reservation = initialState.get ('reservation').set ('loading', true)

    return reservationState.set ('reservation', reservation)
  },
  [LOAD_RESERVATION_SUCCESS] (reservationState, {payload}) {

    const reservation_list = Immutable.fromJS (payload).get ("reservations");
    
    //console.log ("LOAD_RESERVATION_SUCCESS: ", reservation_list);
    
    const reservation = initialState.get ('reservation').set ('list', reservation_list);
    
    return reservationState.set ('reservation', reservation)
  },
  [LOAD_RESERVATION_FAILURE] (reservationState, {payload}) {
    console.log ("LOAD_RESERVATION_FAILURE: ", payload.response)

    const reservation = initialState.get ('reservation').set ('error', payload)

    return reservationState.set ('reservation', reservation)
  },
  [ADD_RESERVATION] (reservationState, {payload, meta}) {
    console.log ("ADD_RESERVATION");
    const reservation = reservationState.get ('reservation').set ('loading', true);
    return reservationState.set ('reservation', reservation);
  },
  [ADD_RESERVATION_SUCCESS] (reservationState, {payload, meta}) {
    console.log ("ADD_RESERVATION_SUCCESS: payload: ", payload);

    const reservationList = reservationState.getIn (['reservation', 'list']).push (payload);
    return reservationState.setIn (['reservation', 'list'], reservationList);
  },
  [ADD_RESERVATION_FAILURE] (reservationState, {payload, meta}) {
    console.log ("ADD_RESERVATION_FAILURE payload: ", payload.response);

    const reservation = reservationState.get ('reservation').set ('error', payload);
    return reservationState.set ('reservation', reservation);
  },
  [MOD_RESERVATION] (reservationState, {payload, meta}) {
    console.log ("MOD_RESERVATION");
    const reservation = reservationState.get ('reservation').set ('loading', true);
    return reservationState.set ('reservation', reservation);
  },
  [MOD_RESERVATION_SUCCESS] (reservationState, {payload, meta}) {
    console.log ("MOD_RESERVATION_SUCCESS: payload: ", payload);

    let reservationList = reservationState.getIn (['reservation', 'list'])
    let reservationId = payload.reservation_id;
    reservationList = reservationList.map ((item) => {
      if (item.get ("reservation_id") == reservationId) {
        return Immutable.fromJS (payload);
      }
      else {
        return item
      }
    });

    console.log ("reservationList: ", reservationList);
    return reservationState.setIn (['reservation', 'list'], reservationList);
  },
  [MOD_RESERVATION_FAILURE] (reservationState, {payload, meta}) {
    console.log ("MOD_RESERVATION_FAILURE payload: ", payload.response);

    const reservation = reservationState.get ('reservation').set ('error', payload);
    return reservationState.set ('reservation', reservation);
  }
},
initialState
);
