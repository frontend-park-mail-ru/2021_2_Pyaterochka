import Component from '../basecomponent';
import Button from '../button';
import ImageUploader from '../image-uploader';
import InputField from '../input-field';
import LevelCard from '../level-card';

import './style.scss';

class EditLevelComponent extends Component {
    constructor (
        {
            level = null,
            title = '',
            onSave = () => { },
            onDelete = null
        }
    ) {
        super();

        this.attributes.level = level || {
            name: '',
            cover: '',
            benefits: [''],
            price: 0,
            color: 'primary'
        };

        this.coverFile = null;
        this.attributes.title = title;
        this.attributes.onSave = onSave;
        this.attributes.onDelete = onDelete;

        this.attributes.error = '';
    }

    loadCover (file) {
        this.coverFile = file;

        this.attributes.level.cover = URL.createObjectURL(this.coverFile);
    }

    save () {
        this.attributes.error = '';

        if (!this.attributes.level.name ||
            this.attributes.level.price <= 0 ||
            this.attributes.level.benefits.reduce((acc, val) => acc || !val, false)
        ) {
            this.attributes.error = 'Проверьте правильность заполнения полей';
            return;
        }

        this.attributes.onSave(this.attributes.level, this.coverFile);
    }

    delete () {
        this.attributes.onDelete(this.attributes.level, this.coverFile);
    }

    render () {
        return <div className="edit-level">
            <div className="edit-level__fields">
                <p className="edit-level__title">
                    {this.attributes.title}
                </p>
                <InputField
                    placeholder="Название уровня"
                    value={this.attributes.level.name}
                    onInput={(e) => {
                        this.attributes.level.name = e.target.value;
                    }}
                />
                <ImageUploader
                    image={this.attributes.level.cover}
                    isCircle={false}
                    imageName="обложку"
                    onChange={(file) => { this.loadCover(file); }}
                />
                <p className="profile-edit__subtitle">
                    Преимущества
                </p>
                {
                    this.attributes.level.benefits.map((benefit, i) => {
                        return <div className="input-field--delete-able" key={i}>
                            <InputField
                                placeholder="Название преимущества"
                                value={benefit}
                                onInput={(e) => {
                                    this.attributes.level.benefits[i] = e.target.value;
                                    this.update();
                                }}
                            />
                            {!benefit && this.attributes.level.benefits.length > 1
                                ? <Button
                                    color="primary"
                                    text="&times;"
                                    onClick={
                                        () => {
                                            this.attributes.level.benefits.splice(i, 1);
                                            this.update();
                                        }}

                                />
                                : ''}
                        </div>;
                    })
                }
                <div className="add-benefit">
                    <Button
                        color="warning"
                        text="Добавить преимущество"
                        onClick={
                            () => {
                                this.attributes.level.benefits.push('');
                                this.update();
                            }
                        }
                    />
                    <br />
                </div>

                <InputField
                    placeholder="Стоимость подписки в месяц"
                    value={this.attributes.level.price}
                    onInput={(e) => {
                        this.attributes.level.price = e.target.value;
                    }}
                    type="number"
                />

                <br />
                <Button
                    color="success"
                    text="Сохранить"
                    onClick={
                        () => {
                            this.save();
                        }
                    }
                />
                {this.attributes.error}
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
                    name={this.attributes.level.name || 'Название'}
                    cover={this.attributes.level.cover}
                    benefits={this.attributes.level.benefits.map(b => b || 'Преимущество')}
                    price={(this.attributes.level.price || 0) + ' ₽'}
                    color={this.attributes.level.color}
                />
            </div>
        </div>;
    }
}

export default EditLevelComponent;
