STATUS: What the UI should be showing for the room
ACTIONS: Server functions and transitions between STATUSES

ROOM_SETUP
  ACTION: CREATE_ROOM
    data: see readme

WAITING_FOR_PLAYERS
  When correct number of players reached:
    ACTION: GAME_START

TEAM_PROPOSAL
  ACTION: UPDATE_TEAM_MEMBERS
    data: array of team members
  <!-- ACTION: SUBMIT_FOR_DISCUSSION -->
  ACTION: SUBMIT_FOR_VOTE

TEAM_VOTE
  ACTION: SUBMIT_TEAM_VOTE
    data: player, what they voted
  ACTION: REVEAL_TEAM_VOTE

DISPLAY_TEAM_VOTE
  ACTION: HANDLE_TEAM_VOTE_RESULT

WAITING_FOR_PLAYERS -> TEAM_PROPOSAL
ACTION: GAME_START
- change status
- set board
  - mission sizes
  - all missions to "NOT_GONE"
  - double fail required
  - set vote track sizes
- set mission num to 1
- set vote tracker to first
- randomize player order
- assign roles
- first person in player order === king
- if lake, last player in player order === lake

TEAM_PROPOSAL -> TEAM_VOTE
ACTION: SUBMIT_FOR_VOTE
- change status only

TEAM_VOTE -> DISPLAY_TEAM_VOTE
ACTION: REVEAL_TEAM_VOTE
- change status only

HANDLE_TEAM_VOTE_RESULT:
- team vote approved:
  - greater than half of all players votes APPROVE
  -> change status to: MISSION_VOTE
- team vote rejected:
  - less than or equal to half of all players vote APPROVE
  -> change status to: TEAM_PROPOSAL
-IF VOTE TRACK === 5 AND TEAM VOTE REJECTED
  -> change status to: GAME_END

DISPLAY_TEAM_VOTE -> MISSION_VOTE
ACTION: HANDLE_TEAM_VOTE_RESULT
- update status

DISPLAY_TEAM_VOTE -> TEAM_PROPOSAL
ACTION: HANDLE_TEAM_VOTE_RESULT
- update status
- shift king
- increment vote track
- don't clear submitted team votes

DISPLAY_TEAM_VOTE -> GAME_END
ACTION: HANDLE_TEAM_VOTE_RESULT
- change status only
- bad guys scenario

TODO: STATUS and ACTIONS from MISSION_VOTE on
