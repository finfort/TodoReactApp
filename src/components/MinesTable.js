import React, { Component } from 'react';
import { Link } from 'react-router';

class MinesTable extends Component {
  render() {
    var rows = [];
    var lastAsosc = null;
    this.props.mines.forEach((mine) => {

      if (mine.association !== lastAsosc) {
        rows.push(<MineAssociationRow association={mine.association} key={mine.mineName} />);
      }
      rows.push(<MineRow mine={mine} key={mine.id} />);
      lastAsosc = mine.association;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Предприятия</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default MinesTable;

class MineAssociationRow extends Component {
  render() {
    return (<tr><th colSpan="1">{this.props.association}</th></tr>);
  }
}

class MineRow extends Component {
  render() {
  let mine = this.props.mine;    
    return (
      <tr>
         <td><Link to={`/mine/${mine.id}`}>{mine.mineName}</Link></td>
      </tr>
    );
  }
}
