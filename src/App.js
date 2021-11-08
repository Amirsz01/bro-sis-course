import React, {useState} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import VkAuth from 'react-vk-auth';
import GoogleLogin from 'react-google-login';

import './App.css';


function App() {
    const [session, setSession] = useState();
    const [countBro, setBro] = useState(0);
    const [countSis, setSis] = useState(0);
    const [message, setMessage] = useState({});

    const UpdateCounters = (countId)=>{
        !countId ? setBro((count)=>++count) : setSis((count)=>++count);
        setMessage({
            Id: countId,
            ...session,
            time: Date().toLocaleString()
        })
    }
    const handleVkResponse = (data) => {
        if(data.status === "connected")
        {
            setSession({
                name: data.session.user.first_name,
                last_name: data.session.user.last_name,
            })
        }
    }
    const responseGoogle = (data) => {
        setSession({
            name: data.profileObj.givenName,
            last_name: data.profileObj.familyName,
        })
    }
    const logoutUser = () => {
        setSession(null)
    }
  return (
      <Container className="container-md" style={{width: 800, height: 600}}>
        <Row className="align-items-md-center h-50 justify-content-md-center">
          <Row className="justify-content-md-center h4">Stats</Row>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="2">
              {countSis} Sis!
            </Col>
            <Col className="text-center" lg="2">
              {countBro} Bro!
            </Col>
          </Row>
        </Row>
        <Row className="align-items-md-center h-50 justify-content-md-center" style={{backgroundColor: "#FF0"}}>
        {
            !session && <>
                <Col className="align-items-md-center justify-content-md-center">
                    <VkAuth apiId="7995678" callback={handleVkResponse} containerStyle={styleContainer} style={vkButton}>
                    <div style={{marginRight: 10, background: "rgb(255, 255, 255)", padding: 10, borderRadius: 2}}>
                    <svg style={{ width: 18,height: 18}}
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="VK" role="img"
                        viewBox="0 0 512 512"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#5281b8"
                        />
                        <path fill="#fff" d="M274 363c5-1 14-3 14-15 0 0-1-30 13-34s32 29 51 42c14 9 25 8 25 8l51-1s26-2 14-23c-1-2-9-15-39-42-31-30-26-25 11-76 23-31 33-50 30-57-4-7-20-6-20-6h-57c-6 0-9 1-12 6 0 0-9 25-21 45-25 43-35 45-40 42-9-5-7-24-7-37 0-45 7-61-13-65-13-2-59-4-73 3-7 4-11 11-8 12 3 0 12 1 17 7 8 13 9 75-2 81-15 11-53-62-62-86-2-6-5-7-12-9H79c-6 0-15 1-11 13 27 56 83 193 184 192z"/></svg>
                    </div>
                    <span style={{padding: "10px 10px 10px 0", fontWeight: 500}}>
                            VK
                    </span>
                    </VkAuth>
                </Col>
                <Col className="align-items-md-center justify-content-md-center">
                    <span style={styleContainer}>
                        <GoogleLogin 
                            style={styleContainer}
                            clientId="516879760228-cr8qbmr5blm12215rlg2cvsntjrohc6o.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </span>
                </Col>
            </>
        }
        {
            session && <>
                {
                message && <>
                    <span>
                        {!message.Id ? "BRO!" : "SIS!"}
                        <span>
                            {message.name} at {message.time}
                        </span>
                    </span >
                </>
                }
                <Col className="align-items-md-center justify-content-md-center">
                    <span style={styleContainer}>
                        <Button onClick={()=>{UpdateCounters(0)}}>Bro!</Button>
                    </span>
                </Col>
                <Col className="align-items-md-center justify-content-md-center">
                    <span style={styleContainer}>
                        <Button onClick={()=>{UpdateCounters(1)}}>Sis!</Button>
                    </span>
                </Col>
                <Button onClick={logoutUser} >Logout</Button>
            </>
        }
        </Row>
        
      </Container>
  );
}


let styleContainer = {
    width:"100%", 
    justifyContent: "center", 
    display: "flex"
};

let vkButton = {
    justifyContent: "center", 
    display: "flex",
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgba(0, 0, 0, 0.54)",
    borderRadius: 2,
    border: "1px solid transparent",
    boxShadow: "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
    padding: 0,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Roboto, sans-serif",
}

export default App;
