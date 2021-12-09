import Component from 'irbis/component';
import PlayerControl from '../player-control';

import './style.scss';

class AudioPlayer extends Component<{
    src: {
        url: string,
        type: string
    }[]
}, {
    time: number,
    volume: number,
    duration: number,
    loading: boolean,
    state: 'paused' | 'playing'
}> {
    audio?: HTMLAudioElement;

    constructor () {
        super();

        this.audio = null;

        this.state.time = 0;
        this.state.volume = 1;
        this.state.duration = 0;
        this.state.loading = true;

        this.state.state = 'paused';
    }

    defaultProps () {
        return {
            src: []
        };
    }

    onPlay () {
        this.state.state = 'playing';
    }

    onPause () {
        this.state.state = 'paused';
    }

    onTimeUpdate () {
        this.state.time = this.audio.currentTime;
    }

    onVolumeChange () {
        this.state.volume = this.audio.volume;
    }

    toggle () {
        if (this.attributes.state === 'playing') {
            this.pause();
        } else {
            this.play();
        }
    }

    play () {
        this.audio.play();
    }

    pause () {
        this.audio.pause();
    }

    render () {
        return (<div className="audio-player">
            <audio
                className="audio-player__audio-tag"
                onClick={() => {
                    this.toggle();
                }}
                onPlay={
                    () => {
                        this.onPlay();
                    }
                }
                onPlaying={
                    () => {
                        this.state.loading = false;
                    }
                }
                onPause={
                    () => {
                        this.onPause();
                    }
                }
                onLoadedData={
                    (e) => {
                        this.audio = e.target;
                        this.state.duration = this.audio.duration;
                        this.state.loading = false;
                    }
                }
                onDurationChange={
                    (e) => {
                        this.state.duration = e.target.duration;
                    }
                }
                onVolumeChange={
                    () => {
                        this.onVolumeChange();
                    }
                }
                onTimeUpdate={
                    () => {
                        this.onTimeUpdate();
                    }
                }
                onWaiting={
                    () => {
                        this.state.loading = true;
                    }
                }
                onCanPlayThrough={
                    () => {
                        this.state.loading = false;
                    }
                }
            >
                {
                    this.props.src.map((src, i) => (
                        <source
                            key={i}
                            src={src.url}
                            type={src.type} />
                    ))
                }
            </audio>

            <div className="audio-player__controls">
                <PlayerControl
                    time={this.state.time}
                    volume={this.state.volume}
                    duration={this.state.duration}
                    state={this.state.state}
                    canFullScreen={false}
                    onToggle={() => {
                        this.toggle();
                    }}
                    onSeek={(time) => {
                        this.audio.currentTime = time;
                        this.state.time = time;
                    }}
                    onToggleVolume={() => {
                        this.audio.muted = false;
                        if (this.state.volume < 0.05) {
                            this.audio.volume = 0.7;
                        } else {
                            this.audio.volume = 0;
                        }
                    }}
                    onSeekVolume={(volume) => {
                        this.audio.volume = volume;
                    }}
                />
            </div>
        </div>);
    }
}

export default AudioPlayer;
