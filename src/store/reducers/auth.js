import * as actionTypes from "./../actions/actionTypes"

const initialState = {
    user: null,
    loading: true
}

const reducer = (state=initialState, action) =>{
    switch(action.type){

        case actionTypes.SET_AUTH: 
            return {
                loading: false,
                user: action.user
            }

        default: return state
    }
}

export default reducer

