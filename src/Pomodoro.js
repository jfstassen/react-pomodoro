import React, { Component } from "react";

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 25 * 60,
            running: false,
            delay: 1000
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
    }
    handlePlay() {
        this.interval = setInterval(() => {
            this.setState(st => ({ timer: st.timer - 1, running: true }));
            if (this.state.timer === 0) {
                this.handleStop();
            }
        }, this.state.delay);
    }
    handleStop() {
        this.setState({ running: false });
        clearInterval(this.interval);
    }
    handleReset() {
        this.setState(st => ({ timer: (st.timer = 25 * 60) }));
    }
    handlePlus() {
        this.setState(st => ({ timer: st.timer + 60 }));
    }
    handleMinus() {
        this.setState(st => ({ timer: st.timer - 60 }));
    }
    render() {
        let playBtn = (
            <button id="play" onClick={this.handlePlay}>
                PLAY
            </button>
        );
        let stopBtn = (
            <button id="stop" onClick={this.handleStop}>
                STOP
            </button>
        );
        let resetBtn = (
            <button id="reset" onClick={this.handleReset}>
                RESET
            </button>
        );
        let plusBtn = (
            <button id="plus" onClick={this.handlePlus}>
                <ion-icon name="add"></ion-icon>
            </button>
        );
        let minusBtn = (
            <button id="minus" onClick={this.handleMinus}>
                <ion-icon name="remove"></ion-icon>
            </button>
        );
        let secs = String(this.state.timer % 60);
        let mins = String(Math.floor(this.state.timer / 60));
        return (
            <div className="container">
                <div className="grid">
                    <h1 id="pomo">Pomo</h1>
                    <h1 id="doro">doro</h1>
                </div>

                <div className="cadre">
                    <div className="innerFunction">
                        <div className="timer">
                            {mins.padStart(2, "0")}:{secs.padStart(2, "0")}
                        </div>

                        <div className="groupBtn">
                            {!this.state.running && plusBtn}
                            {this.state.running
                                ? stopBtn
                                : this.state.timer === 0
                                ? resetBtn
                                : playBtn}
                            {!this.state.running && minusBtn}
                        </div>
                    </div>
                    <div className="blurred"></div>
                </div>
            </div>
        );
    }
}

export default Pomodoro;
