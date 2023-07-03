import { ChakraProvider } from "@chakra-ui/react";

import LoginPage from "./components/LoginPage.js";

function App() {
	return (
		<ChakraProvider>
			<LoginPage />
		</ChakraProvider>
	);
}

export default App;
