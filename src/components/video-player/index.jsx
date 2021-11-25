import Component from '../basecomponent';
import Spinner from '../spinner';

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
        this.attributes.loading = true;

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

    renderTime (time) {
        time = Math.round(time);

        const s = time % 60;
        const m = Math.floor(time / 60);

        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    play () {
        this.video.play();
    }

    pause () {
        this.video.pause();
    }

    toggleFullScreen () {
        if (!document.fullscreenElement) {
            this.dom.dom.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    render () {
        return (<div className="video-player">
            {
                this.attributes.loading
                    ? <div className="video-player__spinner">
                        <Spinner color="#FFF" />
                    </div>
                    : ''
            }

            <video
                className="video-player__video-tag"
                poster={this.attributes.poster}
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
                        this.video = e.target;
                        this.attributes.duration = this.video.duration;
                        this.attributes.loading = false;
                    }
                }
                onDurationChange={
                    (e) => { this.attributes.duration = e.target.duration; }
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
                onSeeking={
                    () => { this.attributes.loading = true; }
                }
                onSeeked={
                    () => { this.attributes.loading = false; }
                }
            >
                {
                    this.attributes.src.map((src, i) => (
                        <source
                            key={i}
                            src={src.url}
                            type={src.type} />
                    ))
                }
            </video>

            <div className="video-player__controls">
                <div
                    className="video-player__controls__play"
                    onClick={() => { this.toggle(); }}
                >
                    {this.attributes.state}
                </div>

                <div
                    className="video-player__controls__time"
                >
                    {this.renderTime(this.attributes.time)}

                </div>

                <input
                    type="range"
                    value={this.attributes.time || '0'}
                    min="0"
                    max={this.attributes.duration}
                    step="0.01"
                    className="video-player__controls__time-slider"
                    onInput={
                        (e) => {
                            this.video.currentTime = e.target.value;
                            this.attributes.time = e.target.value;
                        }
                    }
                />

                <div
                    className="video-player__controls__fullscreen"
                    onClick={() => { this.toggleFullScreen(); }}
                >
                    FS
                </div>
            </div>
        </div>);
    }
}

export default VideoPlayer;
