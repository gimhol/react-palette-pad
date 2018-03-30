import CanvasComponentBase from './CanvasComponentBase'
import { RGBA } from 'react-color-class'

const styles = {
  root: {
    display: 'flex',
    position:'relative',
    flex:1,
    minWidth: 200,
    minHeight: 150,
  }
}

export default class LightZone extends CanvasComponentBase {

  drawCanvas(){
    let {width, height} = this.refs.canvas;
    let ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0,width,height);

    let grad = ctx.createLinearGradient(0,0,width,0);
    grad.addColorStop(0,'transparent');
    grad.addColorStop(1,this.props.colorHSV.stripSB().toRGB().toString());
    ctx.fillStyle = grad;
    ctx.fillRect(4,4,width-8,height-8);

    grad = ctx.createLinearGradient(0,0,0,height)
    grad.addColorStop(0,'transparent');
    grad.addColorStop(1,'black');
    ctx.fillStyle = grad;
    ctx.fillRect(4,4,width-8,height-8);

    let x = 4 + this.props.colorHSV.getS() * (width-8)
    let y = 4 + (1-this.props.colorHSV.getB()) * (height-8)

    ctx.beginPath();
    ctx.strokeStyle = RGBA.White.toString();
    ctx.strokeWidth = 1;
    ctx.arc(x,y, 2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = RGBA.Black.toString();
    ctx.strokeWidth = 1;
    ctx.arc(x,y,3,0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeRect(4,4,width-8,height-8);
  }

  onChange(e){
    let canvas = this.refs.canvas;
    let bbox = canvas.getBoundingClientRect();
    this.props.colorHSV.setS((e.clientX-bbox.left)/(canvas.width-8));
    this.props.colorHSV.setB(1-(e.clientY-bbox.top)/(canvas.height-8));
    this.props.onChange && this.props.onChange();
  }

  render(){
    return super.render(styles.root);
  }

}
