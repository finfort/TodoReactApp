import React, { Component } from 'react';
import MinesTable from './MinesTable';
import { MINES } from './helpers/mines';

class HomePage extends Component {
    render() {
        return (
            <div>
                <MinesTable mines={MINES} />
            </div>
        );
    }
}



export default HomePage;