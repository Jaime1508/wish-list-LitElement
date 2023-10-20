import { LitElement, html, css } from 'lit';
import './wish-list-input';

export class WhishList extends LitElement {

  static get styles(){
    return css `
    .main-container {
      margin: 50px auto;
      width: 500px;
      border-radius: 10px;
      background-color: #EAFCFF;
      justify-content: center;
      max-height: 600px;
      overflow: scroll;
    }
    .title {
      text-align: center;
      color: #68B9C7;
    }
    .input-text{
      width: 300px;
    }
    .task-container {
      justify-content: start;
      display: flex;
      align-items: center;

    }
    .item{
    margin-left: 20px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    text-align: start;
    }
      
      .btn-delete{
        width: 200px;
        height: 35px;
        font-family: 'Courier New', Courier, monospace;
        background-color: #E6F7FF;
        border-radius: 10px;
        cursor: pointer;

      }
      .btn-delete:hover{
        background-color: #68B9C7;
      }
      .btn-delete:active{
        box-shadow: 0 2px #666;
        transform: translateY(4px);
      }
      .btn-container{
        padding:20px;
        text-align: right;
      }

      .label{
        transition: background-color 1s ease;
        font-size: 20px;
        width: 100%;
      }
      .item, .label{
        vertical-align: middle;
      }
    `;
  }

  static get properties() {
    return {
      deseos: { type: Array },
      dato: {type: String},
      counter: {type: Number}
    }
  }

  constructor(){
    super();
    this.deseos = [];
    this.dato = '';
    this.timers = [];
  }

  render(){
    var arrayDeseos = [];
    this.deseos = this.deseos.filter(Boolean);
    this.deseos.forEach((deseo, index) =>{
      arrayDeseos = arrayDeseos.filter(Boolean);
      arrayDeseos.push(html`
        <div id="todo"><input id="inpCheck" class="item" type="checkbox" @change=${(event) =>{this.setTimer(event, index)}}>
        <label class="label" id="colorear">${deseo}</label></div>
        ${this.crearTimers(index)}
      `);
    });
    
    return html`
      <div class="main-container">
        <h1 class="title">My wishlist</h1>
        <wish-list-input id="input" @keydown="${this.recuperarDeseo}" class="input-text" valor="${this.dato}"></wish-list-input>
        <div id="taskContainer">
          ${arrayDeseos}
        </div>
        <div class="btn-container">
          <button class="btn-delete" @click=${this.removeCheckbox}>Remove wishes</button>
        </div>
      </div>
    `;
  }

  recuperarDeseo(e){
    if(e.key === 'Enter'){
      this.deseo = e.target.valor;
      this.deseos = [...this.deseos, this.deseo];
      this.limpiarDato();
    }
  }

  limpiarDato(){
    let texto = this.shadowRoot.querySelector("#input");
    texto.valor = "";
  }

  crearTimers(index){
    if(index === this.deseos.length -1){
      this.timers[index] = {
        timeout1: setTimeout(() => {
          this.colors(index, 'yellow');
        }, 2000),
        timeout2: setTimeout(() =>{
          this.colors(index, 'blue');
        }, 5000),
        timeout3: setTimeout(() =>{
          this.colors(index, 'red');
        }, 8000)
      }
    }
  }

  colors(index, color){
    const label = this.shadowRoot.querySelectorAll("#colorear");
    label[index].style.backgroundColor = color;
  }

  setTimer(event, index){
    const label = this.shadowRoot.querySelectorAll("#colorear");
    const checkbox = event.target;

    if(checkbox.checked){
      label[index].style.color = 'black';
      label[index].style.textDecoration = 'line-through';
      //label[index].style.backgroundColor = '';
      //clearTimeout(this.timers[index].timeout1);
      //clearTimeout(this.timers[index].timeout2);
      //clearTimeout(this.timers[index].timeout3);
    }
  }

  removeCheckbox(){
    const labels = this.shadowRoot.querySelectorAll("#colorear");
    const inputs = this.shadowRoot.querySelectorAll("#inpCheck");

    labels.forEach((label, index) => {
      if(label.style.textDecoration === 'line-through'){
        this.deseos[index] = null;
      }
    });
    this.deseos = this.deseos.filter(Boolean);
    inputs.forEach(input => {
      input.checked = false;
    });
    labels.forEach(label => {
      label.style.textDecoration = '';
    });
  }

}

customElements.define('whish-list', WhishList);