import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  stateObject: state
}) 

const MainAbout = (props) => {
  const dataUser = props.stateObject.user !== 'undefined' ? props.stateObject.user : {}
  
  return (
    <div>
        {dataUser ? 
            (
              <div className="text-center">
                <h3 className="sr-only">Hai {dataUser.username}</h3>
                <h5>Challenge Binar Academy</h5>
                <h5>Membuat website menggunakan react js dan redux</h5>
              </div>
            )
          : 
            (
              <div className="text-center">
                <h3>Challenge Binar Academy</h3>
                <h5>Membuat website menggunakan react js dan redux</h5>
              </div>
            )
          }
    </div>
  );
};

export default connect(mapStateToProps)(MainAbout);