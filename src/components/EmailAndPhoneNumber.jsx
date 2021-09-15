import React, { Component } from 'react';
import { Form, Input, Button, Progress } from 'antd';
import Axios from "axios";

import CommonComponents from './CommonComponents';
import { Link, withRouter } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
class S2EmailAndPhoneNumber extends Component {
	formRef = React.createRef();
	state = {
		error: '',
		loading: false,
		response: ''
	  }

	onFinish = (values) => {
		this.props.setBusinessPhone(values.phone_home);

		let phone = document.getElementById('phoneNumber').value;

		document.getElementById('tele').value = phone;

		this.props.setBusinessEmail(values.email_address);
		console.log('Success:', values);
		this.setState({
			loading: true 
		  }, this.PostDataOfBusinessInsurance(this.props.postData));
		  this.props.history.push("/thank-you-commercial")
		// this.props.nextStep();
	};
	PostDataOfBusinessInsurance = (postData) => {
		console.log(postData);
	
		Axios.post("https://quotehound.leadspediatrack.com/post.do", null, {
		  params: postData,
		})
	
		.then((res) => {
		  console.log(res)
	
		  console.log("Successfully posted, : ", postData)
	
		  if (res.status === 200) {
			this.setState({
			  loading: false, 
			},() =>{
						
			});
		  }
		})
	
		.catch((err) => {
		  if(err) throw err;
		});
	  };
	
	
	  onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	  };

	render() {

		return (
			<div className='card shadow-lg' style={{ borderRadius: '25px' }}>
				<Progress percent={99} status='active' showInfo={true} className='pbar' />
				<CommonComponents currentStep={this.props.currentStep} totalSteps={this.props.totalSteps} previousStep={this.props.previousStep} />
				<div className='p-2'>
					<Link to='/step9'>
						<Button type='primary' shape='circle'>
							<ArrowLeftOutlined className='anticon' />
						</Button>
					</Link>
				</div>

				<div className='d-flex' style={{ minHeight: '50vh' }}>
					<div className='card-body d-xl-flex justify-content-center align-items-center' align='center'>
						<Form
							name='basic'
							ref={this.formRef}
							className='mywidth'
							onFinish={this.onFinish}
							initialValues={{
								phone_home: this.props.phone_home,
								email_address: this.props.email_address,
							}}
							onFinishFailed={this.onFinishFailed}>
							<h3>Personal Info</h3>
							<br />
							<h5>Phone Number</h5>
							<Form.Item
								name='phone_home'
								hasFeedback
								rules={[
									{ required: true, message: 'Please Enter Phone Number ' },
									{ max: 14, message: 'Please Enter Valid Phone Number ' },
									{ pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})/, message: 'Please Enter Valid Phone Number ' },
								]}>
								<Input
									onChange={(e) => {
										let value = e.target.value;
										const reg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})/;
										value = value.replace(reg, '($1) $2-$3');
										if (reg.test(value)) {
											this.formRef.current.setFieldsValue({
												phone_home: value,
											});
											console.log(value);
										}
									}}
									defaultValue={this.props.Primary_Phone}
									type='text'
									maxLength='14'
									size='large'
									placeholder='1234567890'
									id="phoneNumber"
								/>
							</Form.Item>
							<h5>Email</h5>
							<Form.Item
								value={this.props.Email}
								name='email_address'
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please Enter Your Email Address!',
									},
									{
										type: 'email',
										message: 'Email Is Not Correct',
									},
								]}>
								<Input defaultValue={this.props.Email} size='large' placeholder='abc@email.com' />
							</Form.Item>
							<p className='tcpa'>
								{' '}
								By hitting submit below, I provide my express written consent to the following. Telemarketing calls, text messages, emails, and postal mail from this Web site, our
								<a href='https://www.quotehound.com/partners'>marketing and re-marketing </a> network, and up to eight insurance companies or their affiliates or representatives at the phone number (including wireless number), email address, and postal address provided by me.
								Telemarketing calls, text messages, emails, and postal mail (including wireless number), email address, and postal address provided by me. Calls and text messages transmitting insurance quotes, or seeking related additional information from me, using an Automated
								Telephone Dialing System or prerecorded or artificial voices. Electronic video monitoring and recordation of my activities on this Site; and I acknowledge that I may revoke my consent at any time by Calling
								<a href='tel:1883161350'>1 888-316-1350 </a> or emailing “STOP” to
								<a href='mailto:optout@quotehound.com'> optout@quotehound.com </a>{' '}
							</p>
							<Form.Item>
								<Button type='primary' htmlType='submit' block size='large'>
									Get My Free Quote
								</Button>
							</Form.Item>
							{/* </Link> */}
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(S2EmailAndPhoneNumber);
