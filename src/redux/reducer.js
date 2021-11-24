import * as types from './actionTypes'

const initialState={
    recipes:[],
    loading:false,
    error:null
};
const recipeReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_RECIPIE_START:
            //console.log("FETCH_RECIPIE_START ",action);
            return{
                ...state,
                loading:true

            };
        case types.FETCH_RECIPIE_SUCCESS:
            //console.log("FETCH_RECIPIE_SUCCESS ",action);
            return{
                ...state,
                loading:false,
                recipes:action.payload
            };
            
        case types.FETCH_RECIPIE_FAIL:
            //console.log("FETCH_RECIPIE_FAIL ",action);
            return{
                ...state,
                loading:false,
                recipes:action.payload
            };
        default :
            return state;

    }
   

}
export default recipeReducer;