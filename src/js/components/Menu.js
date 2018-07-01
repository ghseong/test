import React from 'react';
import * as ItemTypes from '../constants/ItemTypes';
import ItemNames from '../constants/ItemNames';
import ItemPrices from '../constants/ItemPrices';
import {connect} from 'react-redux';
import {increaseItem, decreaseItem} from '../actions';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        let {props: {items, increaseItem, decreaseItem}} = self;

        let itemList = Object.keys(ItemTypes).map((item, idx) => {
            return <Item
                key={"item_key_" + idx}
                name={item}
                number={items[item]}
                increaseItem={() => {
                    increaseItem(item);
                }}
                decreaseItem={() => {
                    decreaseItem(item);
                }}
            />
        });
        return (
            <div className={'menu'}>
                <h1>Menu</h1>
                {itemList}
            </div>
        )
    }
};


const mapStateToProps = (state, ownProps) => {
    const {items} = state;
    return {
        items
    };
};

const mapDispatchToProps = ({
    increaseItem, decreaseItem
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)


const wonFormat = (num) => {
    let str = typeof num !== "string" ? num + '' : num;
    return str.replace(/\d{1,3}(?=(\d{3})+)/g, '$&,') + '원 ';
};

class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let self = this;
        const {name, number, increaseItem, decreaseItem} = self.props;
        return (<div className={'menu-item'}>
            <span>{ItemNames[name]}</span>
            <div className={'spacer'}/>
            <span>{wonFormat(ItemPrices[name])}</span>
            <button onClick={decreaseItem}>-</button>
            <span>{number}</span>
            <button onClick={increaseItem}>+</button>
        </div>)
    }
}