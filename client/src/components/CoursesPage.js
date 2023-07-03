import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function CoursesPage() {
	const [backendData, setBackendData] = useState({ courses: [""] });

	useEffect(() => {
		fetch("/api")
			.then((response) => response.json())
			.then((data) => {
				setBackendData(data);
			});
	}, []);

	return (
		<Box margin="10px">
			{backendData.courses.map((c) => {
				return <p>{c}</p>;
			})}
		</Box>
	);
}

export default CoursesPage;
