import React from 'react';
import {P, Sub} from '../../../Base/Text';
import Button from '../../../Base/Button';
import {dispatchHandleTeamVoteResult} from "../../../../ApiUtils";

function TeamVoteResultView(props) {
    const { room, name, roomState } = props;
    const {currentMission, kingOrder, voteTrack, players} = roomState;
    const numApproved = kingOrder.filter((player) => {
      return players[player].teamVote === 'APPROVE'
    }).length;
    const numRejected = kingOrder.filter((player) => {
      return players[player].teamVote === 'REJECT'
    }).length;
    const teamApproved = numApproved > numRejected;

    return (
        <div className="Vote-Result">
            <Sub>Vote Results for Mission #{currentMission}, Proposal #{voteTrack}</Sub>
            <P>{teamApproved ? 'This proposed mission was approved.' : 'This proposed mission was rejected.'}</P>
            {(props.name === kingOrder[0]) &&
              <Button onClick={() => dispatchHandleTeamVoteResult({room, name})}>Continue</Button>
            }
        </div>
    );
}

export default TeamVoteResultView;
