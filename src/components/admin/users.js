import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import API_URL from '../../config';

// TODO допилить сброс пароля по action open modal window
// set password when create new user

const cellEditProp = {
    mode: 'click',
    clickToSelect: true,
    blurToSave: true,
    afterSaveCell: onAfterSaveCell
};

const options = {
    afterDeleteRow: handleDeletedRow,
    afterInsertRow: handleInsertedRow,
    noDataText: 'Нет данных'
};

const selectRow = {
    mode: 'checkbox' //radio or checkbox
};

function handleDeletedRow(rowKeys) {
    console.log(rowKeys);
    axios.post(`${API_URL}/admin/delUsers`, {
        _id: rowKeys
    }).then(response => {
        console.log("/admin/delUsers delete", response);
    }).catch((err) => {
        console.log("/admin/delUsers Err");
        console.log(err);
    });
}

function handleInsertedRow(row) {
    console.log(row);
    axios.post(`${API_URL}/admin/users`, {
        _id: row._id,
        email: row.email,
        fio: row.fio,
        isActivated: row.isActivated,
        role: row.role,
        password: row.password
    }).then(response => {
        console.log("/admin/users post", response);
    }).catch((err) => {
        console.log("/admin/users insert Err");
        console.log(err);
    });
}

function onAfterSaveCell(row, cellName, cellValue) {
    // run it only when row is dirty how to do it?
    // check value in beforesave cell

    // console.log(row.fio);
    // put row to db
    axios.put(`${API_URL}/admin/users`, {
        _id: row._id,
        email: row.email,
        fio: row.fio,
        isActivated: row.isActivated,
        role: row.role
    }).then(response => {
        console.log("/admin/users save success", response);
    }).catch((err) => {
        console.log("/admin/users onAfterSaveCell Err");
        console.log(err);
    });

}

// validator function pass the user input value and should return true|false.
function NameValidator(value) {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Необходимо ФИО';
        response.notification.title = 'Запрашиваемое значение';
    } else if (value.length < 1) {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Более 1 символа';
        response.notification.title = 'Неправильно значение';
    }
    return response;
}

function emailValidator(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
        return 'Здесь должна быть почта!';
    }
    return true;
}

// {
//     "_id" : ObjectId("58c25a74494d8a1fa0f26241"),
//     "email" : "anatoliy.ruchka@gmail.com",
//     "password" : "$2a$10$orG6gqxP1donaDanZIlfYeUbSkKmnrcLcL70dzpQTXz3iGJcCuCgy",
//     "__v" : 0,
//     "isActivated" : true,
//     "role" : "Админ шахты",
//     "fio" : "safasdf"
// }


class Users extends Component {
    componentWillMount() {
        this.props.fetch_users();
    }

    render() {
        let rolesTypes = ['Диспетчер', 'Админ обьединения', 'Админ шахты', "Супер Администратор"];

        return (
            <BootstrapTable data={this.props.users} cellEdit={cellEditProp}
                insertRow={true} hover selectRow={selectRow}
                deleteRow search searchPlaceholder='Поиск...' multiColumnSearch
                options={options}>
                <TableHeaderColumn dataField='_id' isKey width="10%" autoValue hiddenOnInsert hidden
                >ID</TableHeaderColumn>
                <TableHeaderColumn dataField='email' editable={{ validator: emailValidator }} dataAlign='center' width="30%"
                >Email</TableHeaderColumn>
                <TableHeaderColumn dataField='fio' editable={{ validator: NameValidator }} dataAlign='center' width="30%"
                >ФИО</TableHeaderColumn>
                <TableHeaderColumn dataField='role' editable={{ type: 'select', options: { values: rolesTypes } }} dataAlign='center' width="20%"
                >Права</TableHeaderColumn>
                <TableHeaderColumn dataField='isActivated' editable={{ type: 'checkbox' }} dataAlign='center' width="20%"
                >Активирован</TableHeaderColumn>
                <TableHeaderColumn dataField='password' editable={{ type: 'password' }} hidden dataAlign='center' width="20%"
                >Пароль</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps, actions)(Users);

// module.exports = Users;
