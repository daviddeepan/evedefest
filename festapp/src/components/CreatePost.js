import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost } from "../actions/postAction";

const CreatePost = ({ addPost, auth }) => {
	const [formData, setFormData] = useState({
		festName: "",
		location: "",
	});

	const { festName, location } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		addPost({ festName, location });
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Give us the details</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Fest Name"
						name="festName"
						value={festName}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Post" />
			</form>
		</Fragment>
	);
};

CreatePost.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(CreatePost);
