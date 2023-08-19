import { HStack, Box, Spacer, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBar(props) {
	let iconName = props.resData.firstName + props.resData.lastName;

	return (
		<Box background="#2f6690" height="50px">
			<nav>
				<HStack
					fontSize="18"
					height="50px"
					spacing="35px"
					marginX="15px"
					textColor="white"
				>
					<Link to="/">
						<p>Home</p>
					</Link>
					<Link to="/courses">
						{props.resData.type === "teacher" ? (
							<p>Your Courses</p>
						) : (
							<p>Courses</p>
						)}
					</Link>
					{props.resData.type === "admin" ? (
						<Link to={"/accounts"}>Accounts</Link>
					) : (
						""
					)}
					<Link to="/about">
						<p>About</p>
					</Link>

					<Spacer />
					<Box>
						<Avatar
							name={iconName}
							backgroundColor="lightblue"
							color="black"
							size="sm"
						/>
					</Box>
				</HStack>
			</nav>
		</Box>
	);
}

export default NavBar;
