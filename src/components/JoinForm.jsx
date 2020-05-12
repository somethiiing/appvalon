import React from 'react';
// import Button from './Button';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const apiUrl = ""
export default class JoinForm extends React.Component {
    /**
     *
     * {Join Room Page // page: join_room
  - Join as spectator
  - text box for room code
  - Action: ADD_SPECTATOR
- Form:
  - text box for room code
  - text box for your name
  - submit/join room button
    - onsubmit
      - check room code validity
        - check name for duplicate
          - player joins room
          - Action: ADD_PLAYER} props
     */
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            name: null,
            validity: false,
            dupe: true
        };
    }

    onChangeHandler = (e) => {
        let field = e.target.name;
        let val = e.target.value;
        this.setState({[field]: val});
    }

    onSubmitHandler = (e) => {
        const {name, room} = this.state;
        debugger;
        e.preventDefault();
        //TODO: add server communication logic here
        fetch(`${apiUrl}/joinRoom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, room: room}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={this.onChangeHandler}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="roomCode"
                    label="Room Code"
                    id="roomCode"
                    autoComplete="Room Code"
                    onChange={this.onChangeHandler}
                />
                {/*Not sure which style to do here but I'm gonna leave it as is*/}
                <Button type={"submit"} className={"Button"}>
                    Join Room
                </Button>
            </form>
        );
    }
}


