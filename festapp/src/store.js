import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { errorReducer } from "./reducers/errorReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer } from "./reducers/profileReducer";
import { postReducer } from "./reducers/postReducer";

const reducers = combineReducers({
	auth: authReducer,
	error: errorReducer,
	profile: profileReducer,
	posts: postReducer,
});

const middleWare = [thunk];

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
