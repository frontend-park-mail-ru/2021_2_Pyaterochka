import Component from 'irbis/component';
import PlayerControl from '../player-control';
import Spinner from '../spinner';

import './style.scss';

class VideoPlayer extends Component<{
    src: {
        url: string,
        type: string
    }[],
    poster?: string,
}, {
    time: number,
    volume: number,
    duration: number,
    loading: boolean,
    state: 'paused' | 'playing'
}> {
    video: HTMLVideoElement;

    defaultProps () {
        return {
            src: [],
            poster: ''
        };
    }

    constructor () {
        super();

        this.video = null;

        this.state.time = 0;
        this.state.volume = 1;
        this.state.duration = 0;
        this.state.loading = true;

        this.state.state = 'paused';
    }

    onPlay () {
        this.state.state = 'playing';
    }

    onPause () {
        this.state.state = 'paused';
    }

    onTimeUpdate () {
        this.state.time = this.video.currentTime;
    }

    onVolumeChange () {
        this.state.volume = this.video.volume;
    }

    toggle () {
        if (this.state.state === 'playing') {
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
            if ('requestFullscreen' in this.vdom.dom) {
                this.vdom.dom.requestFullscreen();
            }
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
                        this.video = e.target;
                        this.state.duration = this.video.duration;
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
                onSeeking={
                    () => {
                        this.state.loading = true;
                    }
                }
                onSeeked={
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
            </video>

            <div className="video-player__controls">

                <PlayerControl
                    time={this.state.time}
                    volume={this.state.volume}
                    duration={this.state.duration}
                    state={this.state.state}
                    canFullScreen
                    onToggle={() => {
                        this.toggle();
                    }}
                    onSeek={(time) => {
                        this.video.currentTime = time;
                        this.state.time = time;
                    }}
                    onToggleVolume={() => {
                        this.video.muted = false;
                        if (this.state.volume < 0.05) {
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
