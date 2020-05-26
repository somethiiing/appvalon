import React from 'react';
import {IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from 'react-icons/io';
import {GiJeweledChalice} from 'react-icons/gi';
import {P} from './Text';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        if (!this.props.disabled) {
            this.props.onClick();
        }
    }

    render() {
        let cardIcon;
        switch (this.props.type) {
            case 'approve':
                cardIcon = <IoIosCheckmarkCircleOutline size={92} color='#00d673'/>;
                break;
            case 'reject':
                cardIcon = <IoIosCloseCircleOutline size={92} color='#d10146'/>;
                break;
            case 'success':
                cardIcon = <GiJeweledChalice size={92} color='#ffbb01'/>;
                break;
            case 'fail':
                cardIcon = <GiJeweledChalice size={92} color='#212121'/>;
                break;
            default:
                break;
        }
        return (
            <div className='CardWrapper' onClick={this.handleOnClick}>
                  <input disabled={this.props.disabled} className={`${this.props.type}`} name={this.props.inputName} type={this.props.inputType}></input>
                  <div className={`Card ${this.props.type}`}>
                      {cardIcon}
                      <P>{this.props.type}</P>
                  </div>
            </div>
        );
    }
}

export default Card;
