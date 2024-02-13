import React, { Fragment } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authAction";

import burger from "../../assets/burger-menu2.svg";
import close from "../../assets/close.svg";

import "../../App.css";
import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logout, profile }) => {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	const authLinks = (
		<nav className="navbar" ref={navRef}>
			<ul>
				<li>
					<Link to="/dashboard">
						<i className="fas fa-user" />{" "}
						<span className="hide-sm">Dashboard</span>
					</Link>
				</li>
				<li>
					<a onClick={logout} href="#!">
						<i className="fas fa-sign-out-alt" />{" "}
						<span className="hide-sm">Logout</span>
					</a>
				</li>
			</ul>
			<a href="#" className="nav-btn button-close" onClick={showNavbar}>
				<img src={close} alt="close-icon" />
			</a>
		</nav>
	);

	const guestLinks = (
		<nav className="navbar" ref={navRef}>
			<ul>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
			<a href="#" className="nav-btn button-close" onClick={showNavbar}>
				<img src={close} alt="close-icon" />
			</a>
		</nav>
	);

	// const slideMenu = (
	// 	<div>
	// 		<a href="#" className="nav-btn button-close" onClick={showNavbar()}>
	// 			<img src={close} alt="close-icon" />
	// 		</a>
	// 		<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
	// 	</div>
	// );

	return (
		<header>
			<h1>
				<Link to="/">evedefest</Link>
			</h1>

			{!isLoading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
			<a href="#" className="nav-btn" onClick={showNavbar}>
				<img src={burger} alt="burger-menu" />
			</a>
			
		</header>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
