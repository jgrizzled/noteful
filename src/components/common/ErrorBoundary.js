import React from 'react';
import ErrorMessage from 'components/common/ErrorMessage';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorMessage>Something went wrong.</ErrorMessage>;
    }
    return this.props.children;
  }
}
