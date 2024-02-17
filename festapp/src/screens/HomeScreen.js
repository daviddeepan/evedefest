import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { getPosts } from "../actions/postAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FestList from "../components/Festlist";



function HomeScreen({ getPosts, posts: { posts, loading } }) {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<div>
			{loading ? (
				<h2> loading ....</h2>
			) : (
				<Row>
					{posts.map((fest) => (
						<FestList key={fest._id} post={fest} />
					))}
				</Row>
			)}
		</div>
	);
}

HomeScreen.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(HomeScreen);
