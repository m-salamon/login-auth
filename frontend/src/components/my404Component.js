import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class My404Component extends React.Component {
     constructor(props) {
          super(props);
          this.state = {

          }
     }


     render() {
          return (
               <div>
                    Ooooops page not found!
            </div>
          )

     }
}
export default My404Component