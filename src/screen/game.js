import React from "react";

import "./game.css";

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderValue: 0,
			grid: Array(9).fill(null),
			score: 0,
			counterIncrement: 1
		};
	}

	componentDidMount() {
		//Set Grid to 0
		let grid = this.state.grid;
		grid[0] = true;
		this.setState({ grid: grid });

		//Start Slider
		this.startAnimation();
	}

	startAnimation() {
		this.interval = setInterval(this.animationTimer, 10);
	}

	//Clear Timer on exit
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	animationTimer = () => {
		let count = this.state.sliderValue + this.state.counterIncrement;
		if (count === 0 || count === 100) {
			this.setState({ counterIncrement: -this.state.counterIncrement });
		}
		this.setState({ sliderValue: count });
	};

	sliderOnChange = e => {
		const value = e.target.value;
		this.setState({ sliderValue: value });
	};

	calculate() {
		let { score, sliderValue, grid } = this.state;

		//Marks will be given if slider is between 40 & 60
		if (sliderValue > 40 && sliderValue < 60) {
			score += 10;
			const currentPosition = grid.findIndex(value => value === true);

			if (currentPosition === 8) {
				//game over
			} else {
				//Move the player to next box
				grid = Array(9).fill(null);
				grid[currentPosition + 1] = true;
			}
			this.setState({ score: score, grid: grid });
		} else {
			//Else reset the player to first box
			grid = Array(9).fill(null);
			grid[0] = true;
			this.setState({ grid: grid });
		}
	}

	render() {
		return (
			<div className="container">
				<input
					type="range"
					onChange={this.sliderOnChange}
					min="1"
					max="100"
					value={this.state.sliderValue}
					className="slider"
				/>
				<div className="grid-container">
					{this.state.grid.map((item, index) => {
						return (
							<div className="grid-item" key={index}>
								<div className="grid-item-inner">
									<div>{index}</div>
									{item === true && (
										<div>
											<img
												src={require("../assets/marker.png")}
												className="im-here"
												alt="I'm here"
											/>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>

				<div className="score">Score: {this.state.score}</div>

				<button onClick={() => this.calculate()} className="button">
					GO !
				</button>
			</div>
		);
	}
}

export default Game;
