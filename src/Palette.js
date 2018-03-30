import React, { Component } from 'react';
import LightZone from './LightZone'
import HuesBar from './HuesBar'
import OpacityBar from './OpacityBar'
import InputField from './InputField'
import { RGBA } from 'react-color-class'
const styles = {
  root: {
    backgroundColor:'#ededed',
    display:'flex',
    paddingLeft: 5,
    paddingTop:5,
    flexDirection:'column',
    alignItems:'stretch',
    userSelect: 'none'
  },
  mainZone: {
    display:'flex',
    alignItems:'stretch',
    marginBottom: 5,
  },
  bottomZone: {
    display:'flex',
    marginBottom: 5,
  },
  input:{
    flex:1,
    minWidth:0
  },
  colorDisplayer:{
    height: 24,
    width: 60,
    marginRight: 5,
  }
}
export default class Palette extends Component {

  constructor(props){
    super(props);
    this.colorHSV = this.props.colorRGBA.toHSV();
    this.colorHexStr = this.props.colorRGBA.toHex();
  }

  onChanged = ()=>{
    this.colorHexStr = this.props.colorRGBA.toHex();
    this.forceUpdate();
    this.props.onChange && this.props.onChange();
  }

  onHSVChanged = ()=>{
    this.props.colorRGBA.setRGB(this.colorHSV.toRGB());
    this.onChanged();
  }

  onRGBChanged = ()=>{
    this.colorHSV = this.props.colorRGBA.toHSV(this.colorHSV.h);
    this.colorHexStr = this.props.colorRGBA.toHex();
    this.onChanged();
  }

  onAlphaChanged = ()=>{
    this.colorHexStr = this.props.colorRGBA.toHex();
    this.onChanged();
  }

  onChangeR = (value)=>{
    this.props.colorRGBA.setR(value);
    this.onRGBChanged();
  }

  onChangeG = (value)=>{
    this.props.colorRGBA.setG(value);
    this.onRGBChanged();
  }

  onChangeB = (value)=>{
    this.props.colorRGBA.setB(value);
    this.onRGBChanged();
  }

  onChangeH = (value)=>{
    this.colorHSV.setH(value);
    this.onHSVChanged();
  }

  onChangeS = (value)=>{
    this.colorHSV.setS(value);
    this.onHSVChanged();
  }

  onChangeV = (value)=>{
    this.colorHSV.setV(value);
    this.onHSVChanged();
  }

  onChangeHex = (str)=>{
    this.colorHexStr = str;
    this.forceUpdate();
  }

  onBlurHex = ()=>{
    let color = RGBA.fromHex(this.colorHexStr);
    if( color ){
      this.props.colorRGBA.setR(color.r);
      this.props.colorRGBA.setG(color.g);
      this.props.colorRGBA.setB(color.b);
      this.props.colorRGBA.setA(color.a);
    }
    this.onRGBChanged();
  }

  render(){
    return (
      <div style={styles.root}>

        <div style={styles.mainZone}>
          <OpacityBar
            colorRGBA={this.props.colorRGBA}
            onChange={this.onAlphaChanged}/>
          <LightZone
            colorHSV={this.colorHSV}
            onChange={this.onHSVChanged}/>
          <HuesBar
            colorHSV={this.colorHSV}
            onChange={this.onHSVChanged}/>
        </div>

        <div style={styles.bottomZone}>
          <InputField fieldName="A" type="number" min="0" max="255" value={this.props.colorRGBA.getA()} onChange={this.onChangeA}/>
          <InputField fieldName="R" type="number" min="0" max="255" value={this.props.colorRGBA.getR()} onChange={this.onChangeR}/>
          <InputField fieldName="G" type="number" min="0" max="255" value={this.props.colorRGBA.getG()} onChange={this.onChangeG}/>
          <InputField fieldName="B" type="number" min="0" max="255" value={this.props.colorRGBA.getB()} onChange={this.onChangeB}/>
        </div>

        <div style={styles.bottomZone}>
          <InputField fieldName="H" type="number" min="0" max="360" value={this.colorHSV.getH()} onChange={this.onChangeH}/>
          <InputField fieldName="S" type="number" min="0" max="1" value={this.colorHSV.getS()} onChange={this.onChangeS}/>
          <InputField fieldName="V" type="number" min="0" max="1" value={this.colorHSV.getB()} onChange={this.onChangeV}/>
          <InputField value={this.colorHexStr.toUpperCase()} onChange={this.onChangeHex} onBlur={this.onBlurHex}/>
        </div>
      </div>
    )
  }
}
