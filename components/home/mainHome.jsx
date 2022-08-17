import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  stateObject: state
}) 

const MainHome = (props) => {
  const dataUser = props.stateObject.user !== 'undefined' ? props.stateObject.user : {}
  return (
    <div>
        {dataUser ? 
          (
            <div className="text-center">
              <h3 className="sr-only">Welcome {dataUser.username}</h3>
              <h5>Binar Academy Fullstack Web Batch 20 Chapter 10</h5>
            </div>
          )
        : 
          (
            <div className="text-center">
              <h3>Binar Academy Fullstack Web Batch 20 Chapter 10</h3>
            </div>
          )
        }
    </div>
  );
};

export default connect(mapStateToProps)(MainHome);