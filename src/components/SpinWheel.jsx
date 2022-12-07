import React from "react";

import "./spinwheel.css";
export class SpinWheel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem() {
        if (this.state.selectedItem === null) {
            const selectedItem = Math.floor(Math.random() * this.props.items.length);
            this.props.onChange(selectedItem);
            if (this.props.onSelectItem) {
                this.props.onSelectItem(selectedItem);
            }
            this.setState({ selectedItem });
        } else {
            this.setState({ selectedItem: null });
            setTimeout(this.selectItem, 500);
        }
    }

    render() {
        const { selectedItem } = this.state;
        const { items } = this.props;

        const wheelVars = {
            "--nb-item": items.length,
            "--selected-item": selectedItem,
        };
        const spinning = selectedItem !== null ? "spinning" : "";

        let cssProperties = {};

        cssProperties["--wheel-color"] = 'rgb(24, 37, 90)';

        return (
            <div style={cssProperties}>
                <h1 className="text">Spin the wheel for a Surprise offer</h1>
                <div className="wheel-container">
                    <div
                        lg={true}
                        className={`wheel ${spinning}`}
                        style={wheelVars}
                        onClick={this.selectItem}
                    >
                        {items.map((item, index) => (
                            <div
                                className="wheel-item"
                                key={index}
                                style={{ "--item-nb": index }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

SpinWheel.defaultProps = {
    items: [
        "Flat 20% off",
        "Blanc 50ml 499",
        "Flat $50 off",
        "EDT Noir $99",
        "$500 Voucher",
        "Free Gift Box",
    ],
};