import React from 'react';
import {P, Sub} from './Text';
import Button from './Button';
import Player from './Player';
import {dispatchHandleTeamVoteResult} from "../ApiUtils";

function TeamVoteResultView(props) {
    const {currentMission, missionVote, kingOrder, roomName, voteTrack, teamVoteResult, players} = props.boardState;

    const onClick = () => {
        // enable this when backend doesn't crash
        // dispatchHandleTeamVoteResult(roomName, kingOrder[0]);
    }

    const renderPlayers = () => {
        const playersComponents = [];
        Object.keys(players).map((key, index) => {
            const player = players[key];
            const {isKing, isHammer, teamVote, name, hue} = player;
            playersComponents.push(
                <Player name={name} king={isKing} hammer={isHammer} teamVote={teamVote} hue={hue}/>
            );
        });

        return playersComponents;
    }

    return (
        <div className="Vote-Result">
            <Sub>Vote Results for Mission #{currentMission}, Proposal #{voteTrack}</Sub>
            <P>{teamVoteResult === 'APPROVE' ? 'This proposed mission was approved.' : 'This proposed mission was rejected.'}</P>
            <div className='Player-list'>
                {renderPlayers()}
            </div>
            {(props.name === kingOrder[0]) &&
            <Button onClick={onClick}>Continue</Button>
            }
        </div>
    );
}

export default TeamVoteResultView;