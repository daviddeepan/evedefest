import { React, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentUser } from "../actions/profileAction";
import CreatePost from "./CreatePost";

const Dashboard = ({
	getCurrentUser,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	return loading && profile === null ? (
		<div>loading....</div>
	) : (
		<div>
			<div>Welcome {user && user.name}</div>
			<CreatePost />
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUser })(Dashboard);
