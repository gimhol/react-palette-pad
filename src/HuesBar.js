import CanvasComponentBase from './CanvasComponentBase'
import {RGB, RGBA} from 'react-color-class'

const styles = {
  root: {
    display:'flex',
    position:'relative',
    minWidth: 20,
    marginRight: 3
  }
}

const colorList =[
  new RGB(255,0,0),
  new RGB(255,255,0),
  new RGB(0,255,0),
  new RGB(0,255,255),
  new RGB(0,0,255),
  new RGB(255,0,255),
  new RGB(255,0,0)
];

export default class HuesBar extends CanvasComponentBase {

  drawCanvas(){
    let {width, height} = this.refs.canvas;
    let ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0,width,height);

    let grad = ctx.createLinearGradient(0,0,0,height);
    colorList.map((color,idx,list)=>grad.addColorStop(idx/(list.length-1),color.toString()));
    ctx.fillStyle = grad;
    ctx.fillRect(4,4,width-8,height-8);

    let y = 4 + this.props.colorHSV.getH()*(height-8)/360;
    ctx.strokeStyle = RGBA.Black;
    ctx.strokeWidth = 1;
    ctx.strokeRect(0,y-1.5,width,3);

    ctx.strokeRect(4,4,width-8,height-8);
  }

  onChange(e){
    let canvas =  this.refs.canvas;
    let bbox = canvas.getBoundingClientRect();
    this.props.colorHSV.setH(359*(e.clientY-bbox.top)/(canvas.height-8));
    this.props.onChange && this.props.onChange();
  }

  render(){
    return super.render(styles.root);
  }

}
