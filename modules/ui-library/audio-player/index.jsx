import Component from 'irbis/component';
import PlayerControl from '../player-control';

import './style.scss';
class AudioPlayer extends Component {
    constructor () {
        super();

        this.audio = null;

        this.attributes.time = 0;
        this.attributes.volume = 1;
        this.attributes.duration = 0;
        this.attributes.loading = true;

        this.attributes.state = 'paused';
    }

    defaultProps () {
        return {
            src: []
        };
    }

    onPlay () {
        this.attributes.state = 'playing';
    }

    onPause () {
        this.attributes.state = 'paused';
    }

    onTimeUpdate () {
        this.attributes.time = this.audio.currentTime;
    }

    onVolumeChange () {
        this.attributes.volume = this.audio.volume;
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
                onClick={() => { this.toggle(); }}
                onPlay={
                    () => { this.onPlay(); }
                }
                onPlaying={
                    () => { this.attributes.loading = false; }
                }
                onPause={
                    () => { this.onPause(); }
                }
                onLoadedData={
                    (e) => {
                        this.audio = e.target;
                        this.attributes.duration = this.audio.duration;
                        this.attributes.loading = false;
                    }
                }
                onDurationChange={
                    (e) => { this.attributes.duration = e.target.duration; }
                }
                onVolumeChange={
                    () => { this.onVolumeChange(); }
                }
                onTimeUpdate={
                    (e) => { this.onTimeUpdate(); }
                }
                onWaiting={
                    () => { this.attributes.loading = true; }
                }
                onCanPlayThrough={
                    () => { this.attributes.loading = false; }
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
                    time={this.attributes.time}
                    volume={this.attributes.volume}
                    duration={this.attributes.duration}
                    state={this.attributes.state}
                    canFullScreen={false}
                    onToggle={(e) => {
                        this.toggle();
                    }}
                    onSeek={(time) => {
                        this.audio.currentTime = time;
                        this.attributes.time = time;
                    }}
                    onToggleVolume={() => {
                        this.audio.muted = false;
                        if (this.attributes.volume < 0.05) {
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
