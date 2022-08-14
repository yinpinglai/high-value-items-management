import * as React from "react";
import { ToastContainer } from "react-toastify";
import { NavMenu } from '../components/shared/NavMenu';
import Footer from '../components/shared/Footer';
import "./BaseLayout.css";

export default class BaseLayout extends React.Component {
    render() {
        return <div id="baseLayout" className="layout">
                <div className="container container-content">
                    <NavMenu />
                    {this.props.children}
                </div>
                <ToastContainer />
                <Footer />
            </div>;
    }
}
