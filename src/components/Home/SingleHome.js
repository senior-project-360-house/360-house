import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {withFirebase} from '../../server/Firebase/index';

class SingleHome extends React.Component{
  componentDidMount(){

  }

  function filldescriptionlist(){
    const data =
  }

  fuction fillfeatures(){

  }
  render (){

    return (
      <div>
        <Container>
        <Row>
        <Col><ul><li>Coffee</li>
                <li>Tea</li>
                <li>Milk</li></ul>
        <ul><li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li></ul>
        </Col>
        <Col>

        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}
 export default withfirebase {SingleHome};
