import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import HomePage from "./HomePage.js";
import AboutPage from "./AboutPage.js";
import CoursesPage from "./CoursesPage.js";
import AccountsPage from "./AccountsPage.js";

function LoginPage() {
	const [userID, setUserID] = useState();
	const [password, setPassword] = useState();
	const [resData, setResData] = useState({ found: false });

	const handleClick = () => {
		fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userID: userID, password: password }),
		}).then((response) => response.json().then((data) => setResData(data)));
	};

	return (
		<Box>
			<Box
				margin="20"
				style={resData.found ? { display: "none" } : { display: "block" }}
			>
				<FormControl>
					<VStack spacing="5">
						<Box width="50%">
							<FormLabel>User ID</FormLabel>
							<Input type="text" onChange={(e) => setUserID(e.target.value)} />
						</Box>

						<Box width="50%">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Box>
						<Box>
							<Button type="submit" onClick={handleClick}>
								Submit
							</Button>
						</Box>
					</VStack>
				</FormControl>
			</Box>
			<Box style={resData.found ? { display: "block" } : { display: "none" }}>
				<NavBar resData={resData} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/courses" element={<CoursesPage resData={resData} />} />
					<Route
						path="/accounts"
						element={<AccountsPage resData={resData} />}
					/>
				</Routes>
			</Box>
		</Box>
	);
}

export default LoginPage;
