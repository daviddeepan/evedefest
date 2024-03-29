import {
	ADD_POST,
	DELETE_POST,
	ADD_LIKE,
	POST_ERROR,
	GET_POSTS,
} from "../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(
					(post) => post._id !== action.payload
				),
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case ADD_LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.id
						? { ...post, festVotes: action.payload.festVotes }
						: post
				),
				loading: false,
			};
		default:
			return state;
	}
};
