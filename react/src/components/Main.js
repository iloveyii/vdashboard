import React from 'react';


class Main extends React.Component {

    render() {

        return (
            <section id="dashboard" className="dashboard">
                {this.props.children}
            </section>
        )
    }
}

export default Main;
