import * as React from 'react';
import './css/basic.css';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;
interface State {
  num1: number;
  num2: number;
  answer: string;
}

class CustomInput extends React.Component<IComponentProps> {

  // inititial state
  state = {
    // genereate random numbers
    num1: this.genRnad(),
    num2: this.genRnad(),
    answer: '?',
  };
  constructor(props: IComponentProps) {
    super(props);
    this.setRandomNumber = this.setRandomNumber.bind(this);
    // bind events
    this.genRnad = this.genRnad.bind(this);
    this.calc = this.calc.bind(this);
  }

  // set state of numbers
  setRandomNumber() {
    this.setState({
      num1: this.genRnad(),
      num2: this.genRnad(),
      answer: '?',
    });
  }

  // get random number using JS
  genRnad() {
    return Math.floor(Math.random() * 11);
  }

  // cal two numbers and save the value of the result to component content Value.
  calc() {
    this.setState({
      answer: this.state.num1 + this.state.num2,
    });
    const id = this.props.id;
    const flowKey = this.props.flowKey;
    const componentFunction = this;
    // Boomi Flow JS APIs for saving content value to component variable. You can use this value in boomi flow.
    const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
    manywho.state.setComponent(id, { contentValue: this.state.num1 + this.state.num2 }, flowKey, true);
    manywho.component.handleEvent(componentFunction, model, flowKey, () => { });
  }

  // You can use this to capture onChange events of input elements
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }
  // You can use this to capture onChange events of input elements
  onBlur = () => {
    this.props.onEvent();
  }
  // default componentDidMount method. I am doing nothing here today :)
  componentDidMount() {

  }
  // Component Render method.
  render() {
    return (
      <div>
        <div className="jumbotron text-center">

          <h1 className="display-4">Random numbers calculator</h1>
        </div>
        <div id="wrapper">
          <div id="q">
            <span ref="num1"><h1 className="display-4">{this.state.num1}</h1></span>
            <span style={{ minWidth: '40px' }}><h1 className="display-4">+</h1></span>
            <span ref="num2"><h1 className="display-4">{this.state.num2}</h1></span>
            <button onClick={this.calc} className="btn btn-primary btn-lg">=</button>
            <span id="answer"><h1 className="display-4">{this.state.answer}</h1></span>
          </div>
          <div>
            <button onClick={this.setRandomNumber} className="btn btn-primary btn-lg" id="reset">
              &#8635; reset
                </button>
          </div>
        </div>
      </div>
    );
  }
}
// register componet with the flow you can use this component name to use in Boomi flow.
manywho.component.register('custom-input', component(CustomInput));

export default CustomInput;
