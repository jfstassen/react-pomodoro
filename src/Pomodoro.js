import React, { Component } from "react";

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 2,
            secs: 0,
            // finished: true,
            running: false,
            delay: 1000
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        // this.handleUnPause = this.handleUnPause.bind(this);
        // this.handleReset = this.handleReset.bind(this);
    }
    handlePlay() {
        const id = setInterval(() => {
            this.setState(st => ({ secs: st.secs - 1, running: true }));
            if (this.state.secs < 0) {
                return this.setState(st => ({
                    finished : false,
                    minutes: st.minutes - 1,
                    secs: (st.secs = 59)
                }));
            }
            if (this.state.minutes <= 0 && this.state.secs <= 0) {
                clearInterval(id);
                // this.setState({ finished: true, running: false });
            }
        },this.state.delay);
    }
    // handleReset() {
    //     this.setState({ minutes: 2, secs: 0 });
    // }
    handlePause() {
        this.setState({ delay: 0, running: false });
    }
    // handleUnPause() {
    //     this.setState({ delay: 1000, running: true });
    // }

    render() {
        let padToTwo = number =>
            number <= 99 ? `0${number}`.slice(-2) : number;
        let playBtn = (
            <button id="play" onClick={this.handlePlay}>
                PLAY
            </button>
        );
        let pauseBtn = (
            <button id="pause" onClick={this.handlePause}>
                PAUSE
            </button>
        );
        // let unpauseBtn = (
        //     <button id="pause" onClick={this.handleUnPause}>
        //         UNPAUSE
        //     </button>
        // );

        return (
            <div>
                <h1>Pomodoro</h1>
                <div className="cadre">
                    <div className="innerFunction">
                        <div className="timer">
                            {this.state.minutes} : {padToTwo(this.state.secs)}
                        </div>

                        <div className="groupBtn">
                            {!this.state.running && (
                                <button id="plus" onClick="">
                                    +
                                </button>
                            )}


                            {this.state.running ? pauseBtn: playBtn}


                            {/* <button id="reset" onClick={this.handleReset}>
                                RESET
                            </button> */}
                            {!this.state.running && (
                                <button id="less" onClick="">
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="modal js-modal">
                    <div className="modal-image">
                        <svg viewBox="0 0 32 32" style={{ fill: "#48DB71" }}>
                            <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path>
                        </svg>
                    </div>
                    <h1>Nice job!</h1>
                    <p>To dismiss click the button below</p>
                    <button className="js-close">Dismiss</button>
                </div>
            </div>
        );
    }
}

export default Pomodoro;
