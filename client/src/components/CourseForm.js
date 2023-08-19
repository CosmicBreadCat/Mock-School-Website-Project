import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	FormControl,
	FormLabel,
	Input,
	Menu,
	MenuButton,
	MenuList,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function CourseForm(props) {
	const [name, setName] = useState();
	const [desc, setDesc] = useState();
	const [teachers, setTeachers] = useState();
	return (
		<FormControl>
			<VStack>
				<FormLabel>Name</FormLabel>
				<Input
					key="name"
					onChange={(e) => {
						setName(e.target.value);
					}}
				></Input>
				<FormLabel>Description</FormLabel>
				<Input
					key="desc"
					onChange={(e) => {
						setDesc(e.target.value);
					}}
				></Input>
				<FormLabel>Other Teachers</FormLabel>
				<Menu placement="bottom">
					<MenuButton width="100%" as={Button}>
						Choose Teachers
					</MenuButton>
					<MenuList>
						<Box marginX="4" marginY="2">
							<CheckboxGroup
								colorScheme="green"
								onChange={(e) => {
									setTeachers(e);
								}}
							>
								<Stack spacing={[1, 5]} direction={["column", "row"]}>
									{props.accData
										.filter((account) => {
											return account.type.toLowerCase().includes("teacher");
										})
										.map((acc) => {
											return (
												<Checkbox value={acc.id}>
													{acc.firstname + " " + acc.lastname}
												</Checkbox>
											);
										})}
								</Stack>
							</CheckboxGroup>
						</Box>
					</MenuList>
				</Menu>
				<Button type="submit">Submit</Button>
			</VStack>
		</FormControl>
	);
}

export default CourseForm;
