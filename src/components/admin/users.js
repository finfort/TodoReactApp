import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API_URL from '../../config';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fio: '',
            role: '',
            isActivated: ''
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFio = this.handleFio.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleActivated = this.handleActivated.bind(this);
    }

    componentWillMount() {
        this.props.fetch_users();
    }

    handleSubmit(itemId, event) {
        event.preventDefault();
        console.log('submitted: ' + itemId, this.state.email, this.state.fio, this.state.role, this.state.isActivated);
        // post data here to server
        // or change it like sign in form
        axios.post(`${API_URL}/admin/users`, {
            _id: itemId,
            email: this.state.email,
            fio: this.state.fio,
            role: this.state.role,
            isActivated: this.state.isActivated,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // debugger;
    }

    renderUser(user) {
        return (
            <div key={user._id}>
                <Form inline onSubmit={this.handleSubmit.bind(this, user._id)}>
                    <FormGroup>
                        <Label >Email
                        <Input type="email"
                                name="email"
                                defaultValue={user.email}
                                placeholder="with a placeholder"
                                onChange={this.handleEmail}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label >ФИО
                        <Input type="text"
                                name="fio"
                                placeholder=""
                                defaultValue={user.fio}
                                onChange={this.handleFio} />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label >Уровень доступа
                        <Input type="select"
                                name="select"
                                onChange={this.handleRole}>
                                <option>Админ шахты</option>
                                <option>Админ обьединения</option>
                                <option>Диспетчер</option>
                                <option>Администратор</option>
                            </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            Активирован
                            <Input
                                type="checkbox"
                                checked={user.isActivated}
                                onChange={this.handleActivated} />
                        </Label>

                    </FormGroup>
                    <FormGroup>
                        <Button color="link">Удалить?</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button size="sm" color="success" type="submit">Сохранить</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div >
                <div className="user-list">{this.props.users.map((user) => this.renderUser(user))}</div>
            </div>
        );
    }
    handleEmail(event) {
        const target = event.target;
        const value = target.type === 'email' ? target.value : "";
        console.log(value);
        this.setState({ email: value });
        //change state of email
    }
    handleFio(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        this.setState({ fio: value });
        // console.log(value);
    }

    handleRole(event) {
        const target = event.target;
        const value = target.type === 'select-one' ? target.value : "";
        this.setState({ role: value });
        // console.log(value);
    }
    handleActivated(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ isActivated: value });
        // console.log(value);
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps, actions)(Users);