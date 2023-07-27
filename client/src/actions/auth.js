import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => { 
  try {
    /* log in the user */
    const { data } = await api.signin(formData);
    
    dispatch({ type: AUTH, data });
    
    /* navigate to homepage */
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => { 
  try {
    /* sign up the user */
    const { data } = await api.signup(formData);
    
    dispatch({ type: AUTH, data });
    
    /* navigate to homepage */
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};