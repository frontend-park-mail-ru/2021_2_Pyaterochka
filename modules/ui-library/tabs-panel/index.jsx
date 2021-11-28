import Component from 'irbis/component';
import './style.scss';

class TabsPanel extends Component {
    defaultProps () {
        return {
            tabs: [],
            activeTab: null,
            onChange: () => { }
        };
    }

    changeTab (e, tab) {
        this.attributes.onChange(e, tab);
    }

    render () {
        return (<div className="tabs-panel">
            {
                this.attributes.tabs.map((tab) => (
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
