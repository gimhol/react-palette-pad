import React, { Component } from 'react';
const styles = {
  canvas:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    width:'100%',
    height:'100%'
  }
}

export default class CanvasComponentBase extends Component{

  componentDidMount(){
    window.addEventListener('mouseup',this.onMouseUp.bind(this));
    window.addEventListener('mousemove',this.onMouseMove.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.resetCanvasSize();
    this.drawCanvas();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mouseup',this.onMouseUp.bind(this));
    window.removeEventListener('mousemove',this.onMouseMove.bind(this));
  }

  componentDidUpdate(){
    this.drawCanvas()
  }

  resetCanvasSize(){
    let canvas =  this.refs.canvas;
    let bbox = canvas.getBoundingClientRect();
    canvas.width = bbox.width;
    canvas.height = bbox.height;
  }

  drawCanvas(){

  }

  onWindowResize(){
    this.resetCanvasSize();
    this.drawCanvas();
  }

  onMouseDown(e){
    this.isMouseDown = true;
    this.onChange(e);
  }

  onMouseMove(e){
    this.isMouseDown && this.onChange(e);
  }

  onMouseUp(e){
    this.isMouseDown = false;
  }

  render(style){
    return (
      <div style={style}>
        <canvas
          ref={'canvas'}
          style={styles.canvas}
          onMouseDown={this.onMouseDown.bind(this)}/>
      </div>
    )
  }
}
