import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import { useEffect } from "react";
import { loadUser } from "./actions/authAction";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<HomeScreen />} />
					<Route exact path="/register/" element={<Register />} />
					<Route exact path="/login/" element={<Login />} />
					<Route path="/" element={<PrivateRoute />}>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						></Route>
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
