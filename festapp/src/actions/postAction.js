import axios from "axios";
import {
	ADD_POST,
	DELETE_POST,
	ADD_LIKE,
	POST_ERROR,
	GET_POSTS,
} from "../actions/types";

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:5000/api/items");

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add like

export const addLike = (id) => async (dispatch, getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}
	let data = {};
	try {
		const res = await axios.put(
			`http://localhost:5000/api/items/like/${id}`,
			data,
			config
		);
		console.log(res);
		dispatch({
			type: ADD_LIKE,
			payload: { id, festVotes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//delete post

export const deletePost = (id) => async (dispatch, getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	try {
		await axios.delete(`http://localhost:5000/api/items/${id}`, config);

		dispatch({
			type: DELETE_POST,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//Add post

export const addPost =
	({ festName, location }) =>
	async (dispatch, getState) => {
		const token = getState().auth.token;
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (token) {
			config.headers["x-auth-token"] = token;
		}

		const body = JSON.stringify({ festName, location });

		try {
			const res = await axios.post(
				"http://localhost:5000/api/items",
				body,
				config
			);

			dispatch({
				type: ADD_POST,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};
