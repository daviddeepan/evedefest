import React from "react";
import { Button, Card } from "react-bootstrap";
import { addLike } from '../actions/postAction';
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Festlist({ post:{_id, festName, festVotes, location} , addLike , auth}) {
	return (
		<Card className="my-3 py-3 rounded">
			<Card.Body>
				<Card.Title as="div">
					<strong>{festName}</strong>
				</Card.Title>
				<Card.Text as="div">{location}</Card.Text>

				<Button onClick={()=>addLike(_id)}><span>{<span>{festVotes.length}</span>}</span></Button>
			</Card.Body>
		</Card>
	);
}


Festlist.propTypes = {
	addLike: PropTypes.func.isRequired,
	post:PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});



export default connect(mapStateToProps, { addLike })(Festlist);