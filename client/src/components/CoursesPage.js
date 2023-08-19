import {
	Box,
	Card,
	CardHeader,
	CardBody,
	Text,
	VStack,
	Input,
	Center,
	CardFooter,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	AlertDialog,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CourseForm from "./CourseForm";

function CoursesPage(props) {
	const [courseData, setCourseData] = useState();
	const [accountData, setAccountData] = useState({ data: [] });
	const [searchField, setSearchField] = useState("");
	const { isModalOpen, onModalOpen, onModalClose } = useDisclosure();
	const { isAlertOpen, onAlertOpen, onAlertClose } = useDisclosure();
	const cancelRef = useRef();

	useEffect(() => {
		if (props.resData.found) {
			fetch("/api/courses")
				.then((response) => response.json())
				.then((data) => {
					setCourseData(data);
				});
		}
	}, [props.resData.found]);

	useEffect(() => {
		if (props.resData.found) {
			fetch("/api/accounts")
				.then((response) => response.json())
				.then((data) => {
					setAccountData(data);
				});
		}
	}, [props.resData.found]);

	const handleChange = (e) => {
		setSearchField(e.target.value);
	};

	const handleClick = (e) => {
		switch (props.resData.type) {
			case "student":
				break;

			case "admin":
				break;

			case "teacher":
				break;

			default:
				break;
		}
	};

	return (
		<>
			<Center margin="10px">
				<VStack marginTop="10" width="40%" spacing="5">
					{props.resData.type === "teacher" ? (
						<Button onClick={onModalOpen}>Create New Course</Button>
					) : (
						<p></p>
					)}
					<Input
						type="search"
						placeholder="Search Courses"
						onChange={handleChange}
					/>
					{"list of courses"}
					<Box style={{ overflowY: "scroll" }} width="100%" height="500">
						{typeof courseData == "undefined" ? (
							<Center>
								<p>Loading....</p>
							</Center>
						) : (
							courseData.data
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
											<CardBody borderBottom="2px" borderColor="black">
												<Text>{course.desc}</Text>
											</CardBody>
											<CardFooter>
												<Button onClick={handleClick}>
													{props.resData.type === "student" ? (
														<p>Enroll</p>
													) : (
														<p>Edit</p>
													)}
												</Button>
											</CardFooter>
										</Card>
									);
								})
						)}
					</Box>
				</VStack>
			</Center>

			<Modal isOpen={isModalOpen} onClose={onModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Account Creation Form</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CourseForm accData={accountData.data} />
					</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>

			<AlertDialog
				isOpen={isAlertOpen}
				leastDestructiveRef={cancelRef}
				onClose={onAlertClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Enroll
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onAlertClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={onAlertClose} ml={3}>
								Enroll
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default CoursesPage;
