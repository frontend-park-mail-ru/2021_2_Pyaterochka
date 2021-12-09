import Component, { ComponentConstructor } from 'irbis/component';
import './style.scss';

type TabType = {
    title: string,
    key: string,
    component: ComponentConstructor
};

type PropsType = {
    tabs?: TabType[],
    activeTab?: string,
    onChange?: (e?:Event, tab?: TabType) => unknown
}

class TabsPanel extends Component<PropsType> {
    defaultProps () {
        return {
            tabs: [],
            activeTab: null,
            onChange: () => { }
        };
    }

    changeTab (e:Event, tab:TabType) {
        this.props.onChange(e, tab);
    }

    render () {
        return (<div className="tabs-panel">
            {
                this.props.tabs.map((tab) => (
                    <div
                        className={
                            [
                                'tabs-panel__tab',
                                tab.key === this.attributes.activeTab
                                    ? 'tabs-panel__tab--active'
                                    : ''
                            ]
                        }
                        key={tab.key}
                        onClick={(e) => { this.changeTab(e, tab); }}
                    >
                        {tab.title}
                    </div>
                ))
            }
        </div>);
    }
}

export default TabsPanel;
