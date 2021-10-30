import Component from '../basecomponent';
import TabsPanel from '../tabs-panel';

class TabsContainer extends Component {
    constructor (
        {
            tabs = [],
            activeTab = null,
            onChange = () => { },
            noActive = <></>
        }
    ) {
        super();

        this.attributes.tabs = tabs;
        this.attributes.activeTab = activeTab;
        this.attributes.onChange = onChange;
        this.attributes.noActive = noActive;
    }

    changeTab (e, tab) {
        this.attributes.activeTab = tab.key;
    }

    render () {
        return <div className="tabs-container">
            <TabsPanel
                tabs={this.attributes.tabs}
                activeTab={this.attributes.activeTab}
                onChange={(e, tab) => { this.changeTab(e, tab); }}
            />

            {
                (tab => (
                    tab?.component || this.attributes.noActive
                ))(
                    this.attributes.tabs
                        .find(
                            tab => tab.key === this.attributes.activeTab
                        )
                )
            }
        </div>;
    }
}

export default TabsContainer;
