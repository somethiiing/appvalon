class JoinForm extends React.Component {
    /**
     * 
     * @param {Join Room Page // page: join_room
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
        roomCode: '',
        name: null,
        validity:false,
        dupe: true
      };
    }
    onChangeHandler = (e) => {
      let field = e.target.name;
      let val = e.target.value;
      this.setState({[field]: val});
    }
    render() {
      return (
     
      );
    }
  }