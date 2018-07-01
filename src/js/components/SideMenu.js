import React from 'react';
import {connect} from 'react-redux';
import {selectCoupon, resetToggle, setToggle, init} from '../actions';

import CouponContainer from '../components/CouponContainer';
import * as ToggleTypes from '../constants/ToggleTypes';


class SideMenu extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let self = this;
        let {props: {discount, items, selectCoupon,  setToggle, init}} = self;
        return (
            <div className={'side-menu'}>
                <CouponContainer
                    discount={discount}
                    selectCoupon={selectCoupon}/>
                <button onClick={() => {
                    let cnt = Object.keys(items).reduce((prev, key, idx) => prev + items[key], 0);
                    if (cnt < 1) {
                        return;
                    }
                    setToggle(ToggleTypes.SHOW_PAYMENT);
                }}>결제</button>
                <button onClick={()=>{
                    init();
                }}>선택 취소</button>
            </div>
        )
    }
};


const mapStateToProps = (state, ownProps) => {
    const {discount, items} = state;
    return {
        discount, items
    };
};

const mapDispatchToProps = ({
    selectCoupon, resetToggle, setToggle, init
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu)

