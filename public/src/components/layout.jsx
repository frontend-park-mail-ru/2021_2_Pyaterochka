import Component from "./basecomponent.js";
import Navbar from "./navbar.jsx";
import user from "../storage/user.js";
import Footer from "./footer.jsx";

class Layout extends Component {
  constructor(slot = null) {
    super();
    this.slot = slot;
  }

  render() {
    return (
      <div>
        <Navbar user={user.user} />
        {this.slot ? this.slot : ""}
        <Footer />
      </div>
    );
  }
}

export default Layout;
