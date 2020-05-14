import React from 'react';
import Player from "./Player";
import {Heading} from "./Text";
import {MdInfoOutline} from "react-icons/md";


function NonKingProposalView(props) {
    const teamProposalArray = props.roomState.proposedTeam;
    const kingOrder = props.roomState.kingOrder;
    return (
        <div>
            {kingOrder.map(name => {
                return <Player key={name} name={name} selected={teamProposalArray.includes(name)}/>
            })}
        </div>
    );
}

export default NonKingProposalView