import { Input, InputProps } from "antd";
import React, { createRef, LegacyRef } from "react";

interface IProps extends InputProps {}

const withInput = (WrappedComponent: any) => {
  class NailInput extends React.Component<InputProps> {
    render() {
      return <WrappedComponent ref={this.inputRef} {...this.props} style={{...this.props.style, ...styles}}/>
    }
    inputRef = createRef<HTMLInputElement>()
    focus() {
      if (this.inputRef) {
        this.inputRef.current?.focus()
      }
    }
  }
  return NailInput;
}

const styles = {
  height: '50px',
  margin: '0 0 16px 0'
}

export default withInput(Input);