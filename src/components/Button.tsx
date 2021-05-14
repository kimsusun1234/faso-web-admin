import { Button, ButtonProps } from "antd";
import React from "react";

const withButton = (WrappedComponent: any) => {
  class NailButton extends React.Component<ButtonProps> {
    render() {
      return <WrappedComponent {...this.props} style={{...this.props.style, ...styles}}/>
    }
  }
  return NailButton;
}

const styles = {
  height: '50px',
  width: '100%'
}

export default withButton(Button);