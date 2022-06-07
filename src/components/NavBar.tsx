import { Navbar, Container } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Task Board Management</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar
