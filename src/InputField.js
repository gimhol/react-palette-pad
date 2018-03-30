import React, { Component } from 'react';

var styles = {
  root: {
    display:'flex',
    flexDirection:'row',
    flex:1,
    marginRight:5,
    alignItems:'stretch',
  },
  titleWraper:{
    marginRight:2
  },
  inputWraper:{
    display:'flex',
    position:'relative',
    flex:1,
    backgroundColor:'black'
  },
  input:{
    paddingTop:0,
    paddingBottom:0,
    marginTop:0,
    marginBottom:0,
    borderWidth:0,
    position:'absolute',
    left:0,
    top:0,
    width:'100%',
    height:'100%'
  }
}

export default class InputField extends Component {
  componentDidMount(){

  }
  onChange = (e)=>{
    this.props.onChange && this.props.onChange(this.refs.input.value)
  }

  onKeyPress = (e)=>{
    if(e.keyCode === 13){
      this.refs.input.blur();
    }
  }

  onFocus = (e)=>{
    this.isFocusOnMe = true;
    window.addEventListener('keypress', this.onKeyPress)
  }

  onBlur = (e)=>{
    this.isFocusOnMe = false;
    window.removeEventListener('keypress', this.onKeyPress)
    this.props.onBlur && this.props.onBlur(this.refs.input.value)
  }

  render(){
    return (
      <div style={styles.root}>
        <div style={styles.titleWraper}>
          {this.props.fieldName}
        </div>
        <div style={styles.inputWraper}>
          <input
            ref={'input'}
            type={this.props.type}
            style={styles.input}
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}/>
        </div>
      </div>
    )
  }

}
