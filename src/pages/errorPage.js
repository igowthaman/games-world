import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <>
          <h1 style={{margin:0, paddingTop:50, color:"white"}}>Something went wrong</h1>
          <h3 style={{margin:0, padding:10, color:"white"}}>please refresh your page</h3>
        </>
      }
      return this.props.children; 
    }
}

export default ErrorBoundary;