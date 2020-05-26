import React from 'react';
import Player from "../../../Base/Player";
import {Heading} from "../../../Base/Text";
import {MdInfoOutline} from "react-icons/md";


function NonKingProposalView(props) {
    const teamProposalArray = props.roomState.proposedTeam;
    const kingOrder = props.roomState.kingOrder;
    const players = props.roomState.players
    return (
        <div className='PlayerGroup PlayerGroup--PlayerView'>
            {kingOrder.filter(name => teamProposalArray.includes(name)).map(name => {
                return <Player key={name} name={name} selected={true}
                               hue={players[name].hue}/>
            })}
        </div>
    );
}

export default NonKingProposalView
