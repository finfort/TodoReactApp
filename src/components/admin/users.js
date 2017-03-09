import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Users extends Component {
    constructor(props) {
        super(props);
        this.handleRole = this.handleRole.bind(this);
        // this.handleActivated = this.handleActivated.bind(this);
    }

    componentWillMount() {
        this.props.fetch_users();
    }

    handleActivated() {
        console.log("ok");
    }

    handleRole(event) {
        // const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        console.log("role");
    }

    renderUser(user) {
        return (
            <div key={user._id}>
                <Form inline>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail"
                            placeholder="with a placeholder" value={user.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fio">ФИО</Label>
                        <Input type="text" name="fio" id="fio" placeholder="" value={user.fio} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Уровень доступа</Label>
                        <Input type="select" name="select" id="exampleSelect"
                            onChange={this.handleRole()}>
                            <option>Админ шахты</option>
                            <option>Админ обьединения</option>
                            <option>Диспетчер</option>
                            <option>Администратор</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label check for="isActivated">
                            Активирован
                        </Label>
                        <Input id="isActivated" type="checkbox" checked={user.isActivated}
                            onChange={this.handleActivated.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="link">Удалить?</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button size="sm" color="success">Сохранить</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div >
                <div className="user-list">{this.props.users.map(this.renderUser)}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps, actions)(Users);