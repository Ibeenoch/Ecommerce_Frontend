import React, { ErrorInfo, Component } from 'react'

interface ErrorBoundaryProps {
    children: React.ReactNode;
}
interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps){
        super(props);
        this.state = { hasError: false };
    }
//    render(): React.ReactNode
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Error occured: ", error, errorInfo);
        this.setState({ hasError: true })
    }
    render() {
        if(this.state.hasError){
            return(
                <div>
                    <h1>Something went wrong.</h1>
                </div>
            )
        }

        return this.props.children;
    }


}

export default ErrorBoundary;
