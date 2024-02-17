import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost } from "../actions/postAction";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const CreatePost = ({ addPost, auth }) => {
	const [formData, setFormData] = useState({
		festName: "",
		location: "",
		collegeName: "",
		festDateFrom: "",
		festDateTo: "",
	});

	const { festName, location, collegeName, festDateFrom, festDateTo } =
		formData;

	const onChange = (value, name) => {
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		addPost({ festName, location, collegeName, festDateFrom, festDateTo });
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Fragment>
				<h1 className="large text-primary">Give us the details</h1>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Fest Name"
							name="festName"
							value={festName}
							onChange={(e) =>
								onChange(e.target.value, e.target.name)
							}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Location"
							name="location"
							value={location}
							onChange={(e) =>
								onChange(e.target.value, e.target.name)
							}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="College/University"
							name="collegeName"
							value={collegeName}
							onChange={(e) =>
								onChange(e.target.value, e.target.name)
							}
						/>
					</div>
					<DatePicker
						label="Fest Date From"
						value={festDateFrom}
						name="festDateFrom"
						onChange={(value) => {
							const date = new Date(value).toLocaleDateString(
								"fr-FR"
							);
							onChange(date, "festDateFrom");
						}}
						format="LL"
					/>
					<DatePicker
						label="Fest Date To"
						value={festDateTo}
						name="festDateTo"
						onChange={(value) => {
							const date = new Date(value).toLocaleDateString(
								"fr-FR"
							);
							onChange(date, "festDateTo");
						}}
						format="LL"
					/>
					<input
						type="submit"
						className="btn btn-primary"
						value="Post"
					/>
				</form>
			</Fragment>
		</LocalizationProvider>
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
