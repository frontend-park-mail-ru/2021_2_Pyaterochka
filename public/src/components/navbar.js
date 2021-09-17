import Component from './basecomponent.js'

class Navbar extends Component {
    constructor ({ user }) {
        super()
        this.attributes.user = user
    }

    render () {
        const element = document.createElement('div')
        element.innerHTML = `
            <div class="navbar">
                <a href="#" class="navbar-brand" router-go="/">Patreon</a>
                ${
    this.attributes.user
        ? `
                    <a class="navbar-profile">
                        <img src="${this.attributes.user.avatar}"></img>
                        <div class="navbar-profile__name"> ${this.attributes.user.name} </div>
                    </a>
                    `
        : `
                    <div>
                        <a router-go="/signup" class="navbar-link">Регистрация</a>
                        <a router-go="/signin" class="navbar-link">Войти</a>
                    </div>
                    `
}
                
            </div>
            <style>

                .navbar {
                    color:#fff;
                    font-size:20px;
                    padding:0 20px;
                    background: var(--color-navbar);
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    display:flex;
                    justify-content: space-between;
                }
                .navbar-brand, .navbar-link {
                    display:block;
                    padding: 14px 5px;
                }
                .navbar a {
                    color:#fff;
                    text-decoration: none;
                }
                .navbar-brand {
                    font-family: "Montserrat", sans-serif;
                    font-weight: 900;
                }
                .navbar-link {
                    float:right;
                    margin: 0 10px;
                }
                .navbar-profile {
                    float:right;
                    display:flex;
                    position:relative;
                    padding: 0 10px;
                    padding-right:40px;
                    cursor:pointer;
                    align-items: center;
                    border-radius:10px;
                }
                .navbar-profile:hover {
                    background: rgba(255,255,255, 0.3);
                }
                .navbar-profile ::after {
                    content: '';
                    border: 10px solid transparent;
                    border-top: 10px solid #fff;
                    position: absolute;
                    top: 22px;
                    right:10px;
                }
                .navbar-profile img {
                    margin-top:-5px;
                    width: 34px;
                    height: 34px;
                    border-radius: 100%;
                    background: #ccc;
                }
                .navbar-profile__name {
                    margin-left: 10px;
                }
            </style>
        `

        return element
    }
}
export default Navbar
