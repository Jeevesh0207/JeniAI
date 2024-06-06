import {combineReducers } from '@reduxjs/toolkit';
import getImageData from './fetch' 
import UploadData from "./uploadData"

const rootReducer = combineReducers({
    getImage:getImageData,
    getUploadData:UploadData,
});

export default rootReducer;
