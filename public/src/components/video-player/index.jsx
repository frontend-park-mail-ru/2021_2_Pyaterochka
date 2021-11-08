import Component from '../basecomponent';

import './style.scss';
class VideoPlayer extends Component {
    constructor ({
        src = [],
        poster = ''
    }) {
        super();

        this.video = null;

        this.attributes.time = 0;
        this.attributes.duration = 0;

        this.attributes.state = 'paused';
        this.attributes.src = src;
        this.attributes.poster = poster;
    }

    onPlay () {
        this.attributes.state = 'playing';
    }

    onPause () {
        this.attributes.state = 'paused';
    }

    onTimeUpdate () {
        this.attributes.time = this.video.currentTime;
    }

    toggle () {
        if (this.attributes.state === 'playing') {
            this.pause();
        } else {
            this.play();
        }
    }

    play () {
        this.video.play();
    }

    pause () {
        this.video.pause();
    }

    render () {
        return <div className="video-player">
            <video
                className="video-player__video-tag"
                poster={this.attributes.poster}
                onPlay={
                    () => { this.onPlay(); }
                }
                onPause={
                    () => { this.onPause(); }
                }
                onLoadedData={
                    (e) => { this.video = e.target; this.attributes.duration = this.video.duration; }
                }
                onDurationChange={
                    (e) => { this.attributes.duration = e.target.duration; }
                }
                onTimeUpdate={
                    (e) => { this.onTimeUpdate(); }
                }
            >
                {
                    this.attributes.src.map((src, i) => (
                        <source key={i} src={src.url} type={src.type} />
                    ))
                }
            </video>

            <div className="video-player__controls">
                {Math.round(this.attributes.time)}
                <div
                    className="video-player__controls__play"
                    onClick={() => { this.toggle(); }}
                >
                    {this.attributes.state}
                </div>

                <input
                    type="range"
                    value={this.attributes.time || '0'}
                    min="0"
                    max={this.attributes.duration}
                    step="0.01"
                    className="video-player__controls__time-slider"
                    onChange={
                        (e) => {
                            this.video.currentTime = e.target.value;
                        }
                    }
                />

                <div className="video-player__controls__fullscreen">

                </div>
            </div>
        </div>;
    }
}

export default VideoPlayer;
