import {
	Box,
	Card,
	CardHeader,
	CardBody,
	Text,
	VStack,
	Input,
	Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function CoursesPage(props) {
	const [backendData, setBackendData] = useState();
	const [searchField, setSearchField] = useState("");

	useEffect(() => {
		fetch("/api/courses")
			.then((response) => response.json())
			.then((data) => {
				setBackendData(data);
			});
	}, []);

	const handleChange = (e) => {
		setSearchField(e.target.value);
	};

	return (
		<Center margin="10px">
			<VStack marginTop="10" width="40%" spacing="5">
				<Input
					type="search"
					placeholder="Search Courses"
					onChange={handleChange}
				/>
				<Box style={{ overflowY: "scroll" }} width="100%" height="500">
					{typeof backendData == "undefined" ? (
						<Center>
							<p>Loading....</p>
						</Center>
					) : (
						backendData.data
							.filter((course) => {
								return course.name
									.toLowerCase()
									.includes(searchField.toLowerCase());
							})

							.map((course) => {
								return (
									<Card border="2px" borderColor="black" marginBottom="2">
										<CardHeader borderBottom="2px" borderColor="black">
											<Text>{course.name}</Text>
										</CardHeader>
										<CardBody>
											<Text>{course.desc}</Text>
										</CardBody>
									</Card>
								);
							})
					)}
				</Box>
			</VStack>
		</Center>
	);
}

export default CoursesPage;
