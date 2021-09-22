import user from "../storage/user.js";
import Component from "./basecomponent.js";

class Navbar extends Component {
  constructor({ user = null } = {}) {
    super();
    this.attributes.user = user;
    this.attributes.isOpen = false;
  }

  render() {
    return (
      <div class="navbar">
        <a href="#" class="navbar-brand" router-go="/">
          Patreon
        </a>
        {this.attributes.user ? (
          <div class="navbar-profile">
            <img src={this.attributes.user.avatar} />
            <div class="navbar-profile__name">
              {this.attributes.user.username}
            </div>
            <div class="navbar-popup">
              <a router-go="/profile">Профиль</a>
              <br />
              <a
                onclick={() => {
                  console.log("logout");
                  user.logout();
                }}
              >
                Выйти
              </a>
            </div>
          </div>
        ) : (
          <div>
            <a router-go="/signup" class="navbar-link">
              Регистрация
            </a>
            <a router-go="/signin" class="navbar-link">
              Войти
            </a>
          </div>
        )}
      </div>
    );
  }
}
export default Navbar;

const styles = `
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
    padding: 14px 10px;
    border-radius:10px;
    transition: background-color .3s ease-in;
}

.navbar-profile:hover, .navbar-link:hover {
    background: rgba(255,255,255, 0.3);
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
.navbar-profile::after {
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

.navbar-popup {
    position: absolute;
    right: 0;
    top: 52px;
    background: var(--color-primary);
    padding: 20px;
    border-radius: 5px;
    min-width:200px;
    text-align:center;
    display:none;
}

.navbar-profile:hover .navbar-popup {
    display:block;
}

`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
