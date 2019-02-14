import React from 'react';

const withAuthorization = () => Component => {
  class withAuthorization extends React.Component {
    render() {
      return <Component {... this.props} />;
    }
  }
}
