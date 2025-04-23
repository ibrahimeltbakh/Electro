import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="mx-auto h-24 w-24 text-red-500 mb-4">
              <FaExclamationTriangle className="h-full w-full" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-gray-900">
              Something went wrong
            </h2>
            
            <p className="mt-2 text-gray-600">
              We're sorry, but we encountered an error while loading this page.
            </p>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Error details:
              </h3>
              <div className="bg-red-50 p-4 rounded-md text-left text-sm text-red-800 mb-4 overflow-auto max-h-48">
                <p>{this.state.error && this.state.error.toString()}</p>
                <div className="mt-2">
                  {this.state.errorInfo && this.state.errorInfo.componentStack.toString()}
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try Again
                </button>
                
                <Link
                  to="/"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                >
                  <FaHome className="mr-2" />
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 