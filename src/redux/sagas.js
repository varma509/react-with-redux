import { takeLatest,all,put,call,fork } from "redux-saga/effects";
import * as types from './actionTypes';
import {getRecipies} from './api';

export function* onLoadRecipeAsync({payload:query}){
    try{
        const response=yield call(getRecipies,query);
        yield put({type:types.FETCH_RECIPIE_SUCCESS,payload:response.data});
    }catch(error){
        yield put({type:types.FETCH_RECIPIE_FAIL,payload:error});
    }

}


export function* onLoadRecipe(){
    yield takeLatest(types.FETCH_RECIPIE_START,onLoadRecipeAsync);
}
const recipeSaga=[fork(onLoadRecipe)];
export default function* rootSaga(){
    yield all([...recipeSaga]);
}
