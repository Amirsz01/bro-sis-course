import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import VkAuth from 'react-vk-auth';
import './App.css';


function App() {
  let handleVkResponse = (data) => {
    console.warn(data)
    console.log(data)
  }
  return (
      <Container className="container-md" style={{width: 800, height: 600}}>
        <Row className="align-items-md-center h-50 justify-content-md-center">
          <Row className="justify-content-md-center h4">Stats</Row>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="2">
              1000 Sis!
            </Col>
            <Col className="text-center" lg="2">
              1000 Bro!
            </Col>
          </Row>
        </Row>
        <Row className="align-items-md-center h-50 justify-content-md-center" style={{backgroundColor: "#FF0"}}>

        </Row>
        <VkAuth apiId="7995678" callback={handleVkResponse} />
      </Container>
  );
}

export default App;
