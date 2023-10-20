import { LitElement, html, css } from "lit";

class WhishListInput extends LitElement{

    static get styles(){
        return css `
        .input-text{
        width: 90%;
        height: 50px;
        font-size: 20px;
        }
        div{
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }
        `;
    }

    static get properties(){
        return{
        valor: {type: String}
        }
    }

    constructor(){
        super();
        this.valor = '';
    }


    render(){
        return html`
            <input type="text" id="entrada" class="input-text" @input=${this.inputKeyDown} .value="${this.valor}">
        `;
    }

    inputKeyDown(e){
        this.valor = e.target.value;
        this.dispatchEvent(new CustomEvent('keydown', {
            detail: this.target
        }));
    }

}
customElements.define('wish-list-input', WhishListInput);