import React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { addLike } from "../actions/postAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ForwardRounded from "@mui/icons-material/ForwardRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "../App.css";

function Festlist({
	post: { _id, festName, festVotes, location },
	addLike,
	auth,
}) {
	return (
		<div className="festBody grid">
			<div className="side-tag"></div>
			<div className="upvotes">
				<button onClick={() => addLike(_id)}>
					<ArrowDropUpIcon sx={{ fontSize: 60 }} />
				</button>
				<p>{festVotes.length}</p>
			</div>

			<div className="fest-details">
				<h3>{festName}</h3>
				<p>{location}</p>
			</div>
		</div>
	);
}

Festlist.propTypes = {
	addLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike })(Festlist);
