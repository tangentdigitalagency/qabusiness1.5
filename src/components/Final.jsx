import React, { Component } from "react";
import UncontrolledLottie from './UncontrolledLottie';

import ConnectStreams from './ConnectMe';




class S9Final extends Component {
	

	state = {
		username: "",
	};
 
	UNSAFE_componentWillReceiveProps = (newProps) => {
		this.setState({ username: newProps.username });
	};

	render() {        const phone = document.getElementById('tele').value;

		return (
			
			
			<div className="container pt-0 main-content-container">
				<h1 className="center"> You Are On Your Way To Saving on Your <b>Business</b> Insurance</h1>
				<br></br>
				<p> 
  If now isn't a good time to talk to an Agent about getting the best price on insrance for your business, you can call us at <a href="tel+18553361823"><b>(855) 336-1823</b> </a>at your convenience. We look foward to helping you save.
</p>

<ConnectStreams moduleId="1617" phoneNumber={phone} />
				<div id="container" />


                <div id="target"> 
				</div>
            </div>
		);
	}
}

export default S9Final;
