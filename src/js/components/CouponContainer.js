import React from 'react';
import classNames from 'classnames';
import * as DiscountTypes from "../constants/DiscountTypes";
import DiscountNames from "../constants/DiscountNames";

export default class CouponContainer extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let self = this;
        let {props: {discount:{type}, selectCoupon}} = self;

        console.log(type);
        let couponList = Object.keys(DiscountTypes).map((item, idx) => {
            return <Coupon
                key={"coupon_key_" + idx}
                name={item}
                selected={type === item}
                selectCoupon={() => {
                    selectCoupon(item);
                }}
            />
        });
        return (
            <div className={'coupon-menu'}>
                <h1>Coupon</h1>
                {couponList}
            </div>
        )
    }
}
const Coupon = (props) => {
    const {name, selected, selectCoupon} = props;

    return (
        <button
            onClick={selectCoupon}
            className={classNames('', {'selected-coupon':selected})}>
            {DiscountNames[name]}
        </button>
    );
};