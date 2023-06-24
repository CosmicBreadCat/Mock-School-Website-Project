import { HStack, Box, Spacer, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <Box background="#2f6690" height="50px">
            <nav>
                <HStack fontSize="18" height="50px" spacing='35px' marginX="15px" textColor="white">
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/about">About</Link>
                    
                    <Spacer />
                    <Box>
                        <Avatar size="sm"></Avatar>
                    </Box>
                </HStack>
            </nav>
        </Box>
    );
}

export default NavBar;