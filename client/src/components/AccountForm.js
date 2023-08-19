import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	VStack,
} from "@chakra-ui/react";

function AccountForm() {
	return (
		<FormControl>
			<VStack>
				<FormLabel>First Name</FormLabel>
				<Input></Input>
				<FormLabel>Last Name</FormLabel>
				<Input></Input>
				<FormLabel>Age</FormLabel>
				<Input></Input>
				<FormLabel>Phone</FormLabel>
				<Input></Input>
				<FormLabel>Email</FormLabel>
				<Input></Input>
				<FormLabel>Account Type</FormLabel>
				<Select key="type" placeholder="Select account type">
					<option>Admin</option>
					<option>Student</option>
					<option>Teacher</option>
				</Select>
				<Button type="submit">Submit</Button>
			</VStack>
		</FormControl>
	);
}

export default AccountForm;
