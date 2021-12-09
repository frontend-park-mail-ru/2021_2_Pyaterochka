import Component, { ComponentConstructor } from 'irbis/component';
import TabsPanel from '../tabs-panel';

type TabType = {
    title: string,
    key: string,
    component: ComponentConstructor
};

type PropsType = {
    tabs?: TabType[],
    activeTab?: string,
    onChange?: (tab: TabType) => unknown,
    noActive?: null
}

class TabsContainer extends Component<PropsType, {
    activeTab: string
}> {
    defaultProps () {
        return {
            tabs: [],
            activeTab: null,
            onChange: () => {
            },
            noActive: null
        };
    }

    constructor (
        {
            tabs,
            activeTab = null
        }: PropsType
    ) {
        super();

        this.props.tabs = tabs;
        this.state.activeTab = activeTab;
    }

    changeTab (e, tab:TabType) {
        if (this.state.activeTab === tab.key) return;
        this.state.activeTab = null;
        this.state.activeTab = tab.key;

        this.props.onChange(tab);
    }

    render () {
        return (<div className="tabs-container">
            <TabsPanel
                activeTab={this.state.activeTab}
                onChange={(e, tab) => {
                    this.changeTab(e, tab);
                }}
                tabs={this.props.tabs}
            />

            {
                this.attributes.tabs
                    .filter(
                        tab => tab.key === this.attributes.activeTab
                    ).map(tab => {
                        const View = tab.component;
                        return (<div
                            className="tabs-container__wrapper"
                            key={'wrapper_' + tab.key}
                        >
                            {(new View({})).renderReactive()}
                        </div>);
                    })

            }
        </div>);
    }
}

export default TabsContainer;
