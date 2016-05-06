
var UpperBarView = React.createClass({
    render : function() {
        return (<header className="uppper-bar-view">
                    <h3 className="user-name">User : {this.props.user.name}</h3>
                    <a className="logout-button" onClick={this.logout}>Logout</a>
                </header>);
    },
    logout : function() {
        alert('Should logout');
    }
});

var CategoryView = React.createClass({
    render : function() {
        var that = this;
        return (
            <div className="category-view">
                <h4>{this.props.name}</h4>
                {
                    this.props.menus.map(function(menu) {
                      return <a className="menu-item" key={menu.name} onClick={that.props.onClickMenu(menu)}>{menu.name}</a>
                    })
                }
            </div>
            )
    }
});

var CategoriesListView = React.createClass({
    render : function() {var that = this;
        return (
                <div className="category-list-view">
                    {
                        this.props.categories.map(function(category) {
                          return <CategoryView key={category.name} name={category.name} menus={category.menus} onClickMenu={that.props.onClickMenu}/>
                        })
                    }
                </div>
            );
    }
});

var LayoutApp = React.createClass({

    render : function() {
        return (
                <div className="layout-container">
                    <UpperBarView user={this.props.user}/>
                    <CategoriesListView categories={this.props.categories} onClickMenu={this.props.onClickMenu}/>
                    {this.props.currentView}
                </div>

            )
    }
});

var GenericView = React.createClass({
    render: function() {
        return (
                  <div className="current-view">{this.props.name} - Dinamic content</div>
            );
    }
});

var AppView = React.createClass({
    getInitialState: function() {
        return {currentView : <GenericView name="default"/>};
    },
    render: function() {
        return (<LayoutApp currentView={this.state.currentView} categories={this.props.categories} onClickMenu={this.onClickMenu} user={this.props.user}/>);
    },
    onClickMenu : function(i) {
        return (function (e) {
            this.setState({ currentView : this.getView(i.name)});
        }.bind(this))
    },
    getView : function(name) {
        //should return another view, but it's just a test
        return <GenericView name={name}/>
    }
});


var user = {name : 'Carlos'}
var categories = [
                {name:'Messages',menus:[{name:'Send Message',key:'send-sms'},{name:'Sent Messages',key:'sent-sms'}, {name:'Files',key:'files'}]},
                {name:'Reports',menus:[{name:'Download Reports',key:'reports'}]},
                {name:'Account',menus:[{name:'Profile',key:'other'}]}
            ];

ReactDOM.render(<AppView categories={categories} user={user}/>, document.getElementById('container'));