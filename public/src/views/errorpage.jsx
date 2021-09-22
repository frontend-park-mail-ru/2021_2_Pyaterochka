import Component from "../components/basecomponent.js";
import Button from "../components/button.jsx";
import { router } from "../index.js";

class ErrorPage extends Component {
  constructor(err = 404, desc = "Страница не найдена") {
    super();
    this.attributes.error = err;
    this.attributes.message = desc;
  }

  render() {
    return (
      <div class="error-block">
        <h1>{this.attributes.message}</h1>

        <img src="/imgs/error_page.svg" />
        <Button
          text="Перейти на главную"
          color="primary"
          rounded={true}
          onclick={() => {
            router.go("/");
          }}
        />
      </div>
    );
  }
}

export default ErrorPage;

const styles = `
.error-block {
    display: flex;
    flex-direction: column;
    align-items:center;
    background: radial-gradient(50% 50% at 50% 50%, #000000 0%, #363636 100%);
    margin-bottom: -50px;
    color:#fff;
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    text-align:center;
    padding-bottom:50px;
}
.error-block h1{ 
    margin-bottom: 50px;
}

.error-block img{
    width:600px;
    max-width: 100%;
    margin-bottom: 30px;
}

.error-block .btn {
    width:400px;
    max-width: 100%;
}

`;
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);