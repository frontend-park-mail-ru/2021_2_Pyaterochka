import Component from 'irbis/component';
import PlayerControl from '../player-control';
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
        this.attributes.volume = 1;
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

    onVolumeChange () {
        this.attributes.volume = this.video.volume;
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

    toggleFullScreen () {
        if (!document.fullscreenElement) {
            this.vdom.dom.requestFullscreen();
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
                onVolumeChange={
                    () => { this.onVolumeChange(); }
                }
                onTimeUpdate={
                    () => { this.onTimeUpdate(); }
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

                <PlayerControl
                    time={this.attributes.time}
                    volume={this.attributes.volume}
                    duration={this.attributes.duration}
                    state={this.attributes.state}
                    canFullScreen
                    onToggle={() => {
                        this.toggle();
                    }}
                    onSeek={(time) => {
                        this.video.currentTime = time;
                        this.attributes.time = time;
                    }}
                    onToggleVolume={() => {
                        this.video.muted = false;
                        if (this.attributes.volume < 0.05) {
                            this.video.volume = 0.7;
                        } else {
                            this.video.volume = 0;
                        }
                    }}
                    onSeekVolume={(volume) => {
                        this.video.volume = volume;
                    }}
                    onToggleFullScreen={() => {
                        this.toggleFullScreen();
                    }}
                />
            </div>
        </div>);
    }
}

export default VideoPlayer;
