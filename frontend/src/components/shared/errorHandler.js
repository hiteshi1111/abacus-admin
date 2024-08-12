import React, { Component } from "react";

class ErrorHandler extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, errorInfo) {
		console.log("Error caught by ErrorBoundary:", error, errorInfo);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return (
                <div className="w-full text-center pt-[100px]">
                    <h4>Please check your Internet Connection!</h4>
                    <button 
                        onClick={windowReload}
                        className="flex justify-center items-center h-[50px] text-[16px] font-semibold px-[10px] w-full max-w-[200px] mx-auto text-white bg-[#000244]"
                    >Refresh Page</button>
                </div>
            )
		}
		return this.props.children;
	}
}

function windowReload() {
    window.location.reload();
}

export default ErrorHandler;