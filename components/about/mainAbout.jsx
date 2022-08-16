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
              <div>
                <h1 className="sr-only">Hai {dataUser.username}</h1>
              </div>
            )
          : 
            (
              <div>
                <h1 className="sr-only">Page About</h1>
              </div>
            )
          }
    </div>
  );
};

export default connect(mapStateToProps)(MainAbout);