import Button from '../button';
import Component from 'irbis/component';
import ImageUploader from '../image-uploader';
import InputField from '../input-field';
import LevelCard from '../level-card';
import ValidationError from '../validation-error';

import './style.scss';

export type EditLevelExportType = {
    name: string,
    cover: string,
    benefits: string[],
    price: number,
    color: string
};

type PropsType = {
    level?: EditLevelExportType
    title: string,
    onSave: (level: EditLevelExportType, file?: File) => unknown,
    onDelete?: (level: EditLevelExportType, file?: File) => unknown
};

class EditLevelComponent extends Component<PropsType, {
    level: EditLevelExportType,
    error: string
}> {
    coverFile?: File;

    defaultProps () {
        return {
            title: '',
            onSave: () => {
            },
            onDelete: null
        };
    }

    constructor (
        {
            level = {
                name: '',
                cover: '',
                benefits: [''],
                price: 0,
                color: 'primary'
            }
        }: PropsType
    ) {
        super();

        this.state.level = level;
        this.state.error = '';
    }

    loadCover (file: File) {
        this.coverFile = file;

        this.state.level.cover = URL.createObjectURL(this.coverFile);
    }

    save () {
        this.state.error = '';

        if (!this.state.level.name ||
            this.state.level.price <= 0 ||
            this.state.level.benefits.reduce((acc, val) => acc || !val, false)
        ) {
            this.state.error = 'Проверьте правильность заполнения полей';
            return;
        }

        this.props.onSave(this.state.level, this.coverFile);
    }

    delete () {
        this.props.onDelete(this.state.level, this.coverFile);
    }

    render () {
        return (<div className="edit-level">
            <div className="edit-level__fields">
                <p className="edit-level__title">
                    {this.props.title}
                </p>

                <InputField
                    onInput={(e) => {
                        this.state.level.name = e.target.value;
                    }}
                    placeholder="Название уровня"
                    value={this.state.level.name}
                    validation={[
                        (value) => {
                            return value !== '' ? null : 'Поле не должно быть пустым';
                        }
                    ]}
                    validateAlways={!!this.state.error}
                />

                <ImageUploader
                    image={this.state.level.cover}
                    imageName="обложку"
                    isCircle={false}
                    onChange={(file) => {
                        this.loadCover(file);
                    }}
                />

                <p className="profile-edit__subtitle">
                    Преимущества
                </p>

                {
                    this.state.level.benefits.map((benefit, i) => {
                        return (<div
                            className="input-field--delete-able"
                            key={i}
                        >
                            <InputField
                                onInput={(e) => {
                                    this.state.level.benefits[i] = e.target.value;
                                    this.update();
                                }}
                                placeholder="Название преимущества"
                                value={benefit}
                                validation={[
                                    (value) => {
                                        return value !== '' ? null : this.state.level.benefits.length !== 1 ? 'Заполните преимущество или удалите его' : 'Заполните хотя бы одно преимущество';
                                    }
                                ]}
                                validateAlways={!!this.state.error}
                            />

                            {this.state.level.benefits.length > 1
                                ? <div
                                    className="input-field--delete-able__btn"
                                    onClick={
                                        () => {
                                            this.state.level.benefits.splice(i, 1);
                                            this.update();
                                        }
                                    }>
                                    &times;
                                </div>
                                : ''}
                        </div>);
                    })
                }

                <div className="add-benefit">
                    <Button
                        color="warning"
                        onClick={
                            () => {
                                this.state.level.benefits.push('');
                                this.update();
                            }
                        }
                        text="Добавить преимущество"
                    />

                    <br />
                </div>

                <InputField
                    onInput={(e) => {
                        this.state.level.price = e.target.value;
                    }}
                    placeholder="Стоимость подписки в месяц, рубли"
                    type="number"
                    value={this.state.level.price}
                    validation={[
                        (value) => {
                            return value !== '' ? null : 'Поле не должно быть пустым';
                        },
                        (value) => {
                            return value === String(parseInt(value)) ? null : 'Поле должно быть целым числом';
                        },

                        (value) => {
                            return parseInt(value) > 1 ? null : 'Стоимость подписки в месяц должна быть больше 1 рубля';
                        },
                        (value) => {
                            return parseInt(value) <= 5000 ? null : 'Стоимость подписки в месяц должна быть меньше или равна 5000 рублям';
                        }
                    ]}
                    validateAlways={!!this.state.error}
                />

                <br />

                <Button
                    color="success"
                    onClick={
                        () => {
                            this.save();
                        }
                    }
                    text="Сохранить"
                />

                {this.state.error ? <ValidationError value={this.state.error} /> : ''}

                {
                    this.attributes.onDelete
                        ? <Button
                            color="primary"
                            text="Удалить"
                            onClick={() => {
                                this.delete();
                            }}
                        />
                        : ''
                }

            </div>

            <div className="edit-level__preview">
                <p className="edit-level__title">
                    Предпросмотр карточки
                </p>

                <LevelCard
                    benefits={this.state.level.benefits.map(b => b || 'Преимущество')}
                    color={this.state.level.color}
                    cover={this.state.level.cover}
                    name={this.state.level.name || 'Название'}
                    price={(this.state.level.price || 0) + ' ₽'}
                />
            </div>
        </div>);
    }
}

export default EditLevelComponent;
