import React, {useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import VkAuth from 'react-vk-auth';
import GoogleLogin from 'react-google-login';

import './App.css';


function App() {
  const [session, setSession] = useState();

  let handleVkResponse = (data) => {
    if(data.status === "connected")
    {
        setSession(data.session)
    }
  }
  const responseGoogle = (response) => {
    console.log(response);
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
        {
            !session && <>
                <VkAuth apiId="7995678" callback={handleVkResponse} />
                <GoogleLogin 
                    clientId="516879760228-3uue835hocpo9ce8qae791e0kqt36h24.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </>
        }
        {
            session && <>
                <p>{session.user.first_name} {session.user.last_name}</p>
            </>
        }
        </Row>
        
      </Container>
  );
}

export default App;
