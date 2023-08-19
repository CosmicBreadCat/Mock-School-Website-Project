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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccountForm from "./AccountForm.js";

function AccountsPage(props) {
	const [backendData, setBackendData] = useState();
	const [searchField, setSearchField] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (props.resData.found) {
			fetch("/api/accounts")
				.then((response) => response.json())
				.then((data) => {
					setBackendData(data);
				});
		}
	}, [props.resData.found]);

	const handleChange = (e) => {
		setSearchField(e.target.value);
	};

	const deleteAccount = (e) => {
		fetch("/api/deleteAccount", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: e }),
		}).then((response) =>
			response.json().then((data) => {
				console.log(data);
			})
		);
	};
	return (
		<>
			<Center margin="10px">
				<VStack marginTop="10" width="40%" spacing="5">
					<Button onClick={onOpen}>Create New Account</Button>
					<Input
						type="search"
						placeholder="Search Accounts"
						onChange={handleChange}
					/>
					{"list of accounts"}
					<Box style={{ overflowY: "scroll" }} width="100%" height="500">
						{typeof backendData == "undefined" ? (
							<Center>
								<p>Loading....</p>
							</Center>
						) : (
							backendData.data
								.filter((account) => {
									return account.firstname
										.toLowerCase()
										.includes(searchField.toLowerCase());
								})

								.map((account) => {
									return (
										<Card border="2px" borderColor="black" marginBottom="2">
											<CardHeader borderBottom="2px" borderColor="black">
												<Text>
													{account.firstname + " " + account.lastname}
												</Text>
											</CardHeader>
											<CardBody borderBottom="2px" borderColor="black">
												<Text>{account.type}</Text>
											</CardBody>
											<CardFooter>
												<Button
													key={account.id}
													onClick={() => {
														deleteAccount(account.id);
													}}
												>
													Delete
												</Button>
											</CardFooter>
										</Card>
									);
								})
						)}
					</Box>
				</VStack>
			</Center>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Account Creation Form</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<AccountForm />
					</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AccountsPage;
