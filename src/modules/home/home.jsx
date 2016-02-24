"use strict";

var React = require('react'),
	Server = require('../../libs/remote-device/server.js'),
	$ = require('jquery'),
	styles = {
		wrapper: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			height: '100%',
			width: '100%',
			zIndex: 1,
			overflow: 'hidden',
			textAlign: 'center'
		},
		modal: {
			display: 'inline-block',
			textAlign: 'center',
			height: '90%',
			width: '90%',
			margin: '10% auto',
			backgroundColor: '#FFF',
			border: '1px solid #040F1A',
			boxSizing: 'border-box',
			overflow: 'hidden',
			position: 'relative'
		},
		spinner: {
			image: {
				height: 25
			},
			wrapper: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '90%'
			}
		},
		controls: {
			wrapper: {
				height: '100%',
				width: '100%',
				boxSizing: 'border-box',
				padding: 20
			},
			buttons: {
				wrapper: {
					boxSizing: 'border-box',
					padding: 20,
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 120
				},
				wrappers: {
					display: 'inline-block',
					verticalAlign: 'top',
					width: '50%',
					height: 80,
					boxSizing: 'border-box'
				},
				random: {
					backgroundImage: 'url(./modules/home/img/random.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundSize: 'contain',
					width: '75%',
					height: 70,
					margin: '5px auto',
					border: '2px solid red',
					borderRadius: 5,
					boxShadow: '0 0 2px 2px #CCC'
				},
				zero: {
					backgroundImage: 'url(./modules/home/img/zero.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundSize: 'contain',
					width: '75%',
					height: '90%',
					margin: '5px auto',
					border: '2px solid red',
					borderRadius: 5,
					boxShadow: '0 0 2px 2px #CCC'
				}
			},
			slider: {
				wrapper: {
					position: 'absolute',
					top: 140,
					left: 0,
					right: 0,
					bottom: 20
				},
				input: {
					height: '100%',
					WebkitAppearance: 'slider-vertical'
				}
			}
		},
		link: {
			wrapper: {
				padding: 20,
				wordBreak: 'break-all'
			}
		}
	},
	HOST = 'http://localhost:8081/dist/#/';

var Controls = React.createClass({
	displayName: 'Controls',
	//
	_onRandom: function () {
		this._sendValue(Math.random());
	},
	_onSlide: function (e) {
		this._sendValue(e.currentTarget.value);
	},
	_onZero: function () {
		this._sendValue(0);
	},
	_sendValue: function (value) {
		Server.send({value: value});
	},
	//
	render: function () {
		return (
			<div style={styles.controls.wrapper}>
				<div style={styles.controls.buttons.wrapper}>
					<div onClick={this._onRandom} style={styles.controls.buttons.wrappers}>
						<div style={styles.controls.buttons.random}></div>
					</div>
					<div onClick={this._onZero} style={styles.controls.buttons.wrappers}>
						<div style={styles.controls.buttons.zero}></div>
					</div>
				</div>
				<div style={styles.controls.slider.wrapper}>
					<input style={styles.controls.slider.input} type="range" min="0" max="1" step=".001" defaultValue="0" onChange={this._onSlide} />
				</div>
			</div>
		);
	}
});

var Home = React.createClass({
	displayName : 'Home',
	//
	componentDidMount: function () {
		var that = this;
		//
		Server
			.start(
				function () {
					that.setState({
						theater: true
					});
				}, function () {
					that.setState({
						theater: false
					});
				}
			)
			.then(function (id) {
				console.log('Server started (id: ' + id + ')');
				//
				that.setState({
					connectionId: id,
					url: HOST + id
				});
			});
	},
	getInitialState: function () {
		return {
			theater: null,
			connectionId: null,
			url: ''
		};
	},
	//
	render: function () {
		var content = (
			<div style={styles.spinner.wrapper}>
				<img style={styles.spinner.image} src="./modules/home/img/spinner.gif" />
			</div>
		);
		//
		if (this.state.connectionId) {
			content = (
				<div style={styles.link.wrapper}>
					<div style={styles.link.url}>{this.state.url}</div>
				</div>
			);
		}
		//
		if (this.state.theater) {
			content = <Controls />;
		}
		//
		return (
			<div style={styles.wrapper}>
				<div style={styles.modal}>
					{content}
				</div>
			</div>
		);
	}
});

module.exports = Home;
