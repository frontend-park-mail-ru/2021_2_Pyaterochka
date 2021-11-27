import Component from '../basecomponent';
import IconComponent from '../icon';

import './style.scss';
class PlayerControl extends Component {
    constructor ({
        time = 0,
        volume = 1,
        duration = 0,
        state = 'paused',
        canFullScreen = true,
        onToggle = () => { },
        onSeek = () => { },
        onToggleVolume = () => { },
        onSeekVolume = () => { },
        onToggleFullScreen = () => { }
    }) {
        super();

        this.attributes.canFullScreen = canFullScreen;
        this.attributes.time = time;
        this.attributes.volume = volume;
        this.attributes.duration = duration;
        this.attributes.state = state;

        this.attributes.onToggle = onToggle;
        this.attributes.onSeek = onSeek;

        this.attributes.onToggleVolume = onToggleVolume;
        this.attributes.onSeekVolume = onSeekVolume;
        this.attributes.onToggleFullScreen = onToggleFullScreen;
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
                onClick={() => { this.attributes.onToggle(); }}
            >
                {
                    this.attributes.state === 'paused'
                        ? <IconComponent
                            url="/imgs/icons/play_28.svg"
                            color="#fff"
                            colorHover="#fff" />
                        : null
                }

                {
                    this.attributes.state === 'playing'
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
                {this.renderTime(this.attributes.time)}

                {' '}

                /
                {this.renderTime(this.attributes.duration)}

            </div>

            <input
                type="range"
                value={this.attributes.time || '0'}
                min="0"
                max={this.attributes.duration}
                step="0.01"
                className="player-control__slider"
                onInput={
                    (e) => {
                        this.attributes.onSeek(e.target.value);
                    }
                }
            />

            {this.attributes.volume > 0.05
                ? <IconComponent
                    key="volume_24"
                    url="/imgs/icons/volume_24.svg"
                    color="#fff"
                    colorHover="#fff"
                    onClick={
                        () => { this.attributes.onToggleVolume(); }
                    } />
                : <IconComponent
                    key="mute_24"
                    url="/imgs/icons/mute_24.svg"
                    color="#fff"
                    colorHover="#fff"
                    onClick={
                        () => { this.attributes.onToggleVolume(); }
                    } />}

            <input
                type="range"
                value={this.attributes.volume || '0'}
                min="0"
                max="1"
                step="0.001"
                className="player-control__slider player-control__slider--audio"
                onInput={
                    (e) => {
                        this.attributes.onSeekVolume(e.target.value);
                    }
                }
            />

            {
                this.attributes.canFullScreen
                    ? <div
                        className="player-control__fullscreen"
                        onClick={() => { this.attributes.onToggleFullScreen(); }}
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
