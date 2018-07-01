import React from 'react';
import Menu from "../components/Menu";
import SideMenu from "../components/SideMenu";
import CalculationPreview from "../components/CalculationPreview";
import SelectPaymentDialog from "../components/SelectPaymentDialog";

import '../../css/layout.css';
import '../../css/modal.css';
import '../../css/menu.css';
import '../../css/sidemenu.css';

export default class App extends React.Component {
    render() {
        return (
            <div className={'content-container'}>
                <SelectPaymentDialog/>
                <div className={'menu-container'}>
                    <Menu/>
                    <SideMenu/>
                </div>
                <CalculationPreview/>
            </div>
        )
    }
};