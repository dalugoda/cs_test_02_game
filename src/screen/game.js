import React from "react";

import "./game.css";

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderValue: 0,
			grid: Array(9).fill(null),
			score: 0,
			counterIncrement: 1,
			won: true
		};
	}

	componentDidMount() {
		//Set Grid to 0
		this.resetGrid();

		//Start Slider
		this.startAnimation();
	}

	resetGrid() {
		let grid = Array(9).fill(null);
		grid[0] = true;
		this.setState({ grid: grid });
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
		if (sliderValue > 20 && sliderValue < 80) {
			score += 10;
			const currentPosition = grid.findIndex(value => value === true);

			//Move the player to next box
			grid = Array(9).fill(null);
			grid[currentPosition + 1] = true;

			this.setState({ score: score, grid: grid });

			if (currentPosition === 7) {
				alert("You Won !!!");

				setTimeout(() => {
					this.resetGrid();
					this.setState({ score: 0 });
				}, 3000);
			}
		} else {
			//Else reset the player to first box
			this.resetGrid();
		}
	}

	render() {
		return (
			<div className="container">
				<div className="slider-container">
					<div className="slider-divider"></div>
					<input
						type="range"
						min="1"
						max="100"
						value={this.state.sliderValue}
						className="slider"
						readOnly
					/>
				</div>
				<div className="grid-container">
					{this.state.grid.map((item, index) => {
						return (
							<div className="grid-item" key={index}>
								<div className="grid-item-inner">
									<div className="box-number">{index}</div>
									{item === true && (
										<div className="im-here">
											<img
												src={require("../assets/marker.png")}
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
