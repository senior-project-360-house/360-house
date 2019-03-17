import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

import { withFirebase } from '../../server/Firebase/index';

const SignOutButton = ({ firebase }) => (

  
  // <button type="button" onClick={firebase.doSignOut}>
  //   Sign Out
  // </button>
<ButtonToolbar >
  <ButtonGroup aria-label="Toolbar with button groups"> 
  <Button variant="danger" type="button">
    Help
  </Button>
  </ButtonGroup>


<ButtonGroup>
<Button variant="outline-light" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
  </ButtonGroup>
  </ButtonToolbar>

);
export default withFirebase(SignOutButton);
