import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const mapStateToProps = (state, ownProps) => ({
  stateObject: state
}) 

const MainProfile = (props) => {

  const dataUser = props.stateObject.user !== 'undefined' ? props.stateObject.user : {}

  return (
    <div>
        <Form>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="4">
              <Form.Control readOnly defaultValue={dataUser.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="4">
              <Form.Control readOnly defaultValue={dataUser.username} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="4">
              <Form.Control readOnly defaultValue={dataUser.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2 justify-content-center" controlId="formPlaintextEmail">
            <Col sm="2">
              <Link href="/about">
                <Button className="mt-2" variant="primary" size="md">Update Data</Button>  
              </Link>
            </Col>
          </Form.Group>
        </Form>
    </div>
  );
};

export default connect(mapStateToProps)(MainProfile);