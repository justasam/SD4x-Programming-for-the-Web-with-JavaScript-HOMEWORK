class FontChooser extends React.Component {

  constructor(props) {
  	super(props);
    let { min, max, size } = this.props;
    min = parseInt(min), max = parseInt(max), size = parseInt(size);
    min = min > 0 ? min : 1;
    if (min > max) [ min, max ] = [ max, min ];
    size = size < min ? min : (size > max ? max : size);
    let def = size;
    let color = size === min || size === max ? 'red' : 'black'

    this.state = {bold: this.props.bold == 'true', size, def, hidden: true, min, max, color};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key, add) {
    if (key === 'size') {
      let curVal = this.state[key];
      let { min, max, def } = this.state;
      let color = 'black';
      const numToAdd = parseInt(add);
      curVal = numToAdd === 0 ? def : (curVal + numToAdd > max ? max : (curVal + numToAdd < min ? min : curVal + numToAdd));
      if (curVal === min || curVal === max) color = 'red';
      this.setState({[key]: curVal, color});
    }
    else this.setState({[key]: !this.state[key]});
  }

  render() {
    const { bold, size, hidden, color } = this.state;
    const fontWeight = bold ? 'bold' : 'normal';
    const fontSize = size + 'px';

  	return(
      <div>
  	       <input type="checkbox" id="boldCheckbox" onChange={() => this.handleClick('bold')} checked={bold} hidden={hidden}/>
  	       <button id="decreaseButton" onClick={() => this.handleClick('size', '-1')} hidden={hidden}>-</button>
  	       <span id="fontSizeSpan" hidden={hidden} onDoubleClick={() => this.handleClick('size', '0')} style={{color}}>{size}</span>
  	       <button id="increaseButton" onClick={() => this.handleClick('size', '1')} hidden={hidden}>+</button>
  	       <span id="textSpan" onClick={() => this.handleClick('hidden')} style={{fontSize, fontWeight}}>{this.props.text}</span>
  	       </div>
  	);
  }
}
