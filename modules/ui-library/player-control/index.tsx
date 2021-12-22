import Component from 'irbis/component';
import IconComponent from '../icon';

import './style.scss';

class PlayerControl extends Component<{
    time?: number,
    volume?: number,
    duration?: number,
    state: 'paused' | 'playing',
    canFullScreen?: boolean,
    onToggle: () => unknown,
    onSeek: (n?: number) => unknown,
    onToggleVolume: () => unknown,
    onSeekVolume: (n?: number) => unknown,
    onToggleFullScreen: () => unknown
}> {
    // @todo: check this props
    defaultProps () {
        return {
            time: 0,
            volume: 1,
            duration: 0,
            state: 'paused',
            canFullScreen: true,
            onToggle: () => {
            },
            onSeek: () => {
            },
            onToggleVolume: () => {
            },
            onSeekVolume: () => {
            },
            onToggleFullScreen: () => {
            }
        };
    }

    renderTime (time) {
        time = Math.round(time);

        const s = time % 60;
        const m = Math.floor(time / 60);

        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    render () {
        return (<div className="player-control">
            <div
                className="player-control__play"
                onClick={() => {
                    this.props.onToggle();
                }}
            >
                {
                    this.props.state === 'paused'
                        ? <IconComponent
                            url="/imgs/icons/play_28.svg"
                            color="#fff"
                            colorHover="#fff" />
                        : null
                }

                {
                    this.props.state === 'playing'
                        ? <IconComponent
                            url="/imgs/icons/pause_28.svg"
                            color="#fff"
                            colorHover="#fff" />
                        : null
                }
            </div>

            <div
                className="player-control__time"
            >
                {this.renderTime(this.props.time)}

                {' '}

                /
                {this.renderTime(this.props.duration)}

            </div>

            <input
                type="range"
                value={this.props.time || '0'}
                min="0"
                max={this.props.duration}
                step="0.01"
                className="player-control__slider"
                onInput={
                    (e) => {
                        this.props.onSeek(e.target.value);
                    }
                }
            />

            {this.props.volume > 0.05
                ? <IconComponent
                    key="volume_24"
                    url="/imgs/icons/volume_24.svg"
                    color="#fff"
                    colorHover="#fff"
                    onClick={
                        () => {
                            this.props.onToggleVolume();
                        }
                    } />
                : <IconComponent
                    key="mute_24"
                    url="/imgs/icons/mute_24.svg"
                    color="#fff"
                    colorHover="#fff"
                    onClick={
                        () => {
                            this.props.onToggleVolume();
                        }
                    } />}

            <input
                type="range"
                value={this.props.volume || '0'}
                min="0"
                max="1"
                step="0.001"
                className="player-control__slider player-control__slider--audio"
                onInput={
                    (e) => {
                        this.props.onSeekVolume(e.target.value);
                    }
                }
            />

            {
                this.props.canFullScreen
                    ? <div
                        className="player-control__fullscreen"
                        onClick={() => {
                            this.props.onToggleFullScreen();
                        }}
                    >
                        <IconComponent
                            url="/imgs/icons/fullscreen_24.svg"
                            color="#fff"
                            colorHover="#fff" />
                    </div>
                    : null
            }

        </div>);
    }
}

export default PlayerControl;
