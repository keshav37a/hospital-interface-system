import React from 'react';
import '../styles/App.scss'
import SignIn from './SignIn';

class App extends React.Component{

  componentDidMount(){
  }

  render(){
    return(
      <div>
        <div><SignIn/></div>
      </div>
    )
  }

}

export default App;
