import React from 'react';

import * as ItemTypes from '../constants/ItemTypes';
import ItemNames from '../constants/ItemNames';
import ItemPrices from '../constants/ItemPrices';
import * as ToggleTypes from '../constants/ToggleTypes';

import * as PaymentTypes from "../constants/PaymentTypes";
import * as DiscountTypes from "../constants/DiscountTypes";
import DiscountNames from "../constants/DiscountNames";
import DiscountRates from "../constants/DiscountRates";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {resetToggle, init, initItem, selectCoupon, selectPayment} from '../actions';


const CASH_DISCOUNT_RATE = 5;

class SelectPaymentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
        this.showWait = this.showWait.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
    }

    showWait() {
        let self = this;

        let {
            props: {init},
        } = self;

        setTimeout(() => {
            init();
            self.setState({checked: false});
        }, 2000);

        return (
            <div className={'modal-content'}>
            <div className={'payment-ing'}>결제 진행 중 </div>
        </div>);
    }

    selectPayment() {
        let self = this;

        let {
            props: {items, discount: {type}, payment, resetToggle, selectPayment},
        } = self;
        let totalDiscount = 0;
        let totalPurePrice = 0;
        let hasCoupon = type !== DiscountTypes.NONE;
        let isCash = payment.type === PaymentTypes.CASH;


        let itemList = Object.keys(ItemTypes).map((item, idx) => {
            let number = items[item];
            let itemTotalPrice = number * ItemPrices[item];
            totalPurePrice += itemTotalPrice;

            if (hasCoupon) {
                let discountRate = (ItemTypes.AMERICANO_TAKEOUT !== item) ? DiscountRates[type] : 0;
                if (isCash) {
                    discountRate += CASH_DISCOUNT_RATE;
                }
                totalDiscount += itemTotalPrice * discountRate / 100;
            }

            return <Item
                key={"item_key_" + idx}
                name={item}
                number={number}
            />
        });
        return (
            <div className={'modal-content'}>

                <h1>Calculation</h1>
                <div className={'payment-table'}>

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
                            <td>적용된 쿠폰:</td>
                            <td>{` ${DiscountNames[type]}`}</td>

                            <td>결제 형태</td>
                            <td>{isCash? '현금' : '카드'}</td>
                        </tr>
                        <tr>
                            <td>합계</td>
                            <td> {`${totalPurePrice}원 `}</td>
                            <td>할인</td>
                            <td>{`${totalDiscount}원`}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>총 결제할 금액</td>
                            <td colSpan={2}>{`${totalPurePrice - totalDiscount} 원`}</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
                <div className={'payment-type'}>
                    <button
                        className={classNames({selected: !isCash})}
                        onClick={() => {
                            selectPayment(PaymentTypes.CARD);
                        }}>카드
                    </button>
                    <button
                        className={classNames({selected: isCash})}
                        onClick={() => {
                            selectPayment(PaymentTypes.CASH);
                        }}>현금
                    </button>
                </div>
                <div className={'payment-action'}>
                    <button
                        onClick={() => {
                            resetToggle(ToggleTypes.SHOW_PAYMENT)
                        }}>뒤로
                    </button>
                    <button
                        onClick={() => {
                            self.setState({checked: true});
                        }}>결제
                    </button>
                </div>
            </div>
        )
    }

    render() {
        let self = this;
        let {
            props: {show},
            state: {checked},
            showWait, selectPayment
        } = self;
        let content = (checked) ? showWait() : selectPayment();
        return (
            <div className={classNames('modal', {'non-visible': !show})}>
                {content}
            </div>
        );
    }
};


const mapStateToProps = (state, ownProps) => {
    const {items, discount, toggle, payment} = state;
    return {
        items, discount, payment, show: toggle[ToggleTypes.SHOW_PAYMENT]
    };
};

const mapDispatchToProps = ({
    resetToggle, initItem, selectCoupon,
    init, selectPayment
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPaymentDialog)


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