import React from 'react';
import {connect} from 'react-redux';

import * as ItemTypes from '../constants/ItemTypes';
import ItemNames from '../constants/ItemNames';
import ItemPrices from '../constants/ItemPrices';

import * as DiscountTypes from "../constants/DiscountTypes";
import DiscountNames from "../constants/DiscountNames";
import DiscountRates from "../constants/DiscountRates";
import '../../css/preview.css';

class CalculationPreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        let {props: {items, discount:{type}}} = self;
        let totalDiscount  = 0;
        let totalPurePrice = 0;
        let hasCoupon = type !== DiscountTypes.NONE;


        let itemList = Object.keys(ItemTypes).map((item, idx) => {
            let number = items[item];
            let itemTotalPrice = number * ItemPrices[item];
            totalPurePrice += itemTotalPrice;
            if (hasCoupon && ItemTypes.AMERICANO_TAKEOUT !== item) {
                totalDiscount += itemTotalPrice * DiscountRates[type] / 100;
            }
            return <Item
                key={"item_key_" + idx}
                name={item}
                number={number}
            />
        });
        return (
            <div className={'preview'}>
                <h1>Preview Calculation</h1>
                <div>
                <table className={'coffee-table'}>
                    <tbody>
                    <tr>
                        <th>항목</th>
                        <th>개수</th>
                        <th>가격</th>
                    </tr>
                    {itemList}
                    </tbody>
                </table>

                <table className={'total-table'}>
                    <tbody>
                    <tr>
                        <td>합계</td><td> {`${totalPurePrice}원 `}</td>
                        <td>할인</td><td>{`${totalDiscount}원`}</td>
                    </tr>
                    <tr >
                        <td>적용된 쿠폰:</td><td>{` ${DiscountNames[type]}`}</td>
                        <td>할인 적용된 가격 </td><td>{`${totalPurePrice - totalDiscount} 원`}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state, ownProps) => {
    const {items, discount} = state;
    return {
        items, discount
    };
};

const mapDispatchToProps = ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalculationPreview)


class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let self = this;
        const {name, number} = self.props;
        return (
            <tr className={''}>
                <td>{ItemNames[name]}</td>
                <td>{number + ' 개 '}</td>
                <td>{` 총 ${number * ItemPrices[name]} 원 `}</td>
            </tr>)
    }
}