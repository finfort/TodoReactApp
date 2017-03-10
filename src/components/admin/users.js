import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fio: '',
            role: '',
            isActivated: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.fetch_users();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted: ' + this.state.email, this.state.fio, this.state.role, this.state.isActivated);
        // post data here to server
        // or change it like sign in form
        debugger;
    }

    renderUser(user) {
        return (
            <div key={user._id}>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label >Email
                        <Input type="email"
                                name="email"
                                defaultValue={user.email}
                                placeholder="with a placeholder"
                                onChange={handleEmail.bind(this)}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label >ФИО
                        <Input type="text"
                                name="fio"
                                placeholder=""
                                defaultValue={user.fio}
                                onChange={handleFio.bind(this)} />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label >Уровень доступа
                        <Input type="select"
                                name="select"
                                onChange={handleRole.bind(this)}>
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
                                onChange={handleActivated.bind(this)} />
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
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};
function handleEmail(event) {
    const target = event.target;
    const value = target.type === 'email' ? target.value : "";
    console.log(value);
    this.setState({ email: value });
    //change state of email
}

function handleFio(event) {
    const target = event.target;
    const value = target.type === 'text' ? target.value : "";
    this.setState({ fio: value });
    // console.log(value);
}

function handleRole(event) {
    const target = event.target;
    const value = target.type === 'select-one' ? target.value : "";
    this.setState({ role: value });
    // console.log(value);
}
function handleActivated(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ isActivated: value });
    // console.log(value);
}

export default connect(mapStateToProps, actions)(Users);