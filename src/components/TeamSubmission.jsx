import React from 'react';
import Player from "./Player";
import {Heading, Sub} from "./Text";
import Button from "./Button";

const api = 'http://localhost:5000'

let socket;

const in_progress = {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'WAITING_FOR_PLAYERS',
    createdAt: 0,
    playerCount: 5,
    lakeSettings: 'NONE',
    selectedRoles: ['merlin', 'percival', 'genericGood', 'mordred', 'morgana'],
    players: [{
        name: 'alex',
        isKing: true,
        isLake: false
    }, {
        name: 'wilson',
        isKing: false,
        isLake: false
    }, {
        name: 'bridget',
        isKing: false,
        isLake: true
    }],
    boardInfo: {
        playerCount: 5,
        numGood: 3,
        numEvil: 2,
        doubleFailRequired: false,
        missions: [{
            count: 1,
            size: 2,
            status: 'NOT_GONE'
        },
            {
                count: 2,
                size: 3,
                status: 'NOT_GONE'
            },
            {
                count: 3,
                size: 3,
                status: 'NOT_GONE'
            },
            {
                count: 4,
                size: 2,
                status: 'NOT_GONE'
            },
            {
                count: 5,
                size: 3,
                status: 'NOT_GONE'
            }
        ]
    },
    kingOrder: ['alex', 'bridget', 'chris', 'david', 'elliot'],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResults: null,
    missionVote: ['SUCCESS', 'FAIL', 'SUCCESS', 'SUCCESS']
}

export class TeamSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamProposalArray: '',
            teamVote: 'REJECT',
            missionVote: 'SUCCESS',
            roomList: [],
            roomState: in_progress
        }
    }

    //todo add validity for number of candidates
    // add highlight on click action
    // update and send action to server for vote

    render() {
        return (
            <div>
                {JSON.stringify(this.props.boardState)}
                <Heading>{this.props.name}, select candidates for your mission. </Heading>
                {this.state.roomState.players.map(player => {
                    return <Player name={player.name} selected={true} onClick={() => alert('hello')}/>
                })}
                <Button>Submit For Vote</Button>
            </div>
        );
    }
}

// import React from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
//
// let socket;
//
// export default class ControlPanel extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             players: '',
//             missionSize: '',
//             doubleFail: false,
//             reversalsAllowed: false,
//             voteTrack: 1,
//             voteStatus: 'BLANK',
//             voteCount: 0,
//             selectedMission: 1,
//             missionResult: 'SUCCESS',
//             showDisplay: true,
//             returnedState: {},
//             missionVote: {}
//         }
//
//         this.onInputChange = this.onInputChange.bind(this);
//         this.submitBoardChange = this.submitBoardChange.bind(this);
//         this.incrementMissionProposal = this.incrementMissionProposal.bind(this);
//         this.submitMissionVote = this.submitMissionVote.bind(this);
//         this.revealMissionVotes = this.revealMissionVotes.bind(this);
//         this.submitMissionVoteReset = this.submitMissionVoteReset.bind(this);
//         this.toggleDisplay = this.toggleDisplay.bind(this);
//     }
//
//     componentDidMount() {
//         socket = io('/');
//         socket.on('updateState', returnedState => this.setState({returnedState: returnedState}));
//     }
//
//     onInputChange(e, field, numOrBool) {
//         let temp = {};
//         if(numOrBool === 'num') {
//             temp[field] = Number(e.target.value);
//         } else if (numOrBool === 'bool') {
//             temp[field] = Boolean(e.target.value);
//         } else {
//             temp[field] = e.target.value
//         }
//         this.setState(temp);
//     }
//
//     getGameBoard(numPlayers) {
//         const gameBoards = {
//             5: {
//                 missionSizes: [2,3,2,3,3],
//                 doubleFail: false
//             },
//             6: {
//                 missionSizes: [2,3,4,3,4],
//                 doubleFail: false
//             },
//             7: {
//                 missionSizes: [2,3,3,4,4],
//                 doubleFail: true
//             },
//             8: {
//                 missionSizes: [3,4,4,5,5],
//                 doubleFail: true
//             },
//             9: {
//                 missionSizes: [3,4,4,5,5],
//                 doubleFail: true
//             },
//             10: {
//                 missionSizes: [3,4,4,5,5],
//                 doubleFail: true
//             },
//             11: {
//                 missionSizes: [3,4,4,5,5],
//                 doubleFail: true
//             },
//             12: {
//                 missionSizes: [3,4,4,5,5],
//                 doubleFail: true
//             }
//         }
//         return gameBoards[numPlayers];
//     }
//
//     submitBoardChange(e, form) {
//         e.preventDefault();
//         let data = {};
//         if(form === 'setPlayersList') {
//             data.changeType = 'SET_PLAYERS_LIST';
//             data.playersList = this.state.players.split(',');
//             const gameBoard = this.getGameBoard(data.playersList.length);
//             data.missionSize = gameBoard.missionSizes;
//             data.doubleFail = gameBoard.doubleFail;
//         }
//         if(form === 'setMissionSize') {
//             data.changeType = 'SET_MISSION_SIZE';
//             data.missionSize = this.state.missionSize.split(',');
//             data.doubleFail = this.state.doubleFail;
//         }
//         if(form === 'setSpecialOptions') {
//             data.changeType = 'SET_SPECIAL_OPTIONS';
//             data.reversalsAllowed = this.state.reversalsAllowed;
//         }
//         if(form === 'setVoteTrack') {
//             data.changeType = 'SET_VOTE_TRACK';
//             data.voteTrack = this.state.voteTrack;
//         }
//         if(form === 'setVoteStatus') {
//             data.changeType = 'SET_VOTE_STATUS';
//             data.voteStatus = this.state.voteStatus;
//         }
//         if(form === 'setMissionResult') {
//             data.changeType = 'SET_MISSION_RESULT';
//             data.selectedMission = this.state.selectedMission;
//             data.missionResult = this.state.missionResult;
//         }
//
//         axios.post('/submitBoardChange', data)
//             .then( res => this.setState({returnedState: res.data}));
//     }
//
//     incrementMissionProposal() {
//         let data = {};
//         const newVoteTrack = this.state.voteTrack + 1 > 5 ? 5 : this.state.voteTrack + 1;
//         data.changeType = 'NEXT_PROPOSAL';
//         data.voteTrack = newVoteTrack;
//         this.setState({voteTrack: newVoteTrack});
//         axios.post('/submitBoardChange', data)
//             .then( res => this.setState({returnedState: res.data}));
//     }
//
//     missionFinished(result) {
//         const nextMission = this.state.returnedState.missions.findIndex(m => m.missionResult === 'NOT_WENT') + 1;
//         let data = {};
//         data.changeType = 'MISSION_FINISHED';
//         data.voteTrack = 1;
//         data.selectedMission = nextMission;
//         data.missionResult = result;
//         this.setState({
//             voteTrack: 1,
//             missionResult: result
//         });//TODO sync up state with dropdowns or reference returnedState instead to increment
//         axios.post('/submitBoardChange', data)
//             .then( res => this.setState({returnedState: res.data}));
//     }
//
//     render() {
//         const voteCount = this.state.returnedState ? this.state.returnedState.voteCount: this.state.voteCount;
//         return (
//
//         );
//     }
// }

