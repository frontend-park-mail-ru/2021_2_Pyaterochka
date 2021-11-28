import Component from 'irbis/component';
import TabsPanel from '../tabs-panel';

class TabsContainer extends Component {
    constructor (
        {
            tabs = [],
            activeTab = null,
            onChange = () => { },
            noActive = null
        }
    ) {
        super();

        this.attributes.tabs = tabs;
        this.attributes.activeTab = activeTab;
        this.attributes.onChange = onChange;
        this.attributes.noActive = noActive;
    }

    changeTab (e, tab) {
        if (this.attributes.activeTab === tab.key) return;
        this.attributes.activeTab = null;
        this.attributes.activeTab = tab.key;

        this.attributes.onChange(tab);
    }

    render () {
        return (<div className="tabs-container">
            <TabsPanel
                activeTab={this.attributes.activeTab}
                onChange={(e, tab) => { this.changeTab(e, tab); }}
                tabs={this.attributes.tabs}
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
                            {(new View()).renderReactive()}
                        </div>);
                    })

            }
        </div>);
    }
}

export default TabsContainer;
