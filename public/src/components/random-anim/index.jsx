import Component from '../basecomponent';
import Button from '../button';
import './style.css';

/**
 * Компонент Рандом перемешки
 */
class RandomAnim extends Component {
    constructor () {
        super();
        this.attributes.list = [];
        for (let i = 0; i < 5 * 5; i++) {
            this.attributes.list.push(i + 1);
        }
    }

    shuffle () {
        this.attributes.list = this.attributes.list.sort(() => Math.random() - 0.5);
    }

    swapRandom () {
        const n = this.attributes.list.length;
        const i = parseInt(Math.random() * n);
        const j = parseInt(Math.random() * (n - i));

        const k = this.attributes.list[i];
        this.attributes.list[i] = this.attributes.list[j];
        this.attributes.list[j] = k;
    }

    deleteRandom () {
        const n = this.attributes.list.length;
        const i = parseInt(Math.random() * n);

        this.attributes.list.splice(i, 1);
    }

    add () {
        this.attributes.list.push(Math.round(Math.random() * 10000));
    }

    addRandom () {
        const random = Math.round(Math.random() * 10000);
        const n = this.attributes.list.length;
        const i = Math.round(Math.random() * n);

        this.attributes.list.splice(i, 0, random);
    }

    render () {
        return (
            <div>
                <Button text="Перемешать" onClick={
                    () => { this.shuffle(); }
                } />
                <Button text="SwapRandom" onClick={
                    () => { this.swapRandom(); }
                } />
                <Button text="add" onClick={
                    () => { this.add(); }
                } />

                <Button text="addRandom" onClick={
                    () => { this.addRandom(); }
                } />

                <Button text="deleteRandom" onClick={
                    () => { this.deleteRandom(); }
                } />

                <br />
                <div className="container-shuffler">
                    {
                        this.attributes.list.map(i => (
                            <div key={i} className="random-shuffler">
                                {i}
                            </div>
                        ))
                    }
                </div>

            </div>
        );
    }
}
export default RandomAnim;
