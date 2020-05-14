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
    - result: approved team
      - MISSION_VOTE
    - result: rejected team
      - TEAM_PROPOSAL
    - result: rejected team + vote track 5
      - EVIL_WIN

MISSION_VOTE
  ACTION: SUBMIT_MISSION_VOTE
    data: player, what they voted
  ACTION: REVEAL_MISSION_VOTE

DISPLAY_MISSION_VOTE
  ACTION: HANDLE_MISSION_VOTE_RESULT















WAITING_FOR_PLAYERS -> TEAM_PROPOSAL
ACTION: GAME_START
- change status to 'TEAM_PROPOSAL'
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

ACTION: SUBMIT_FOR_VOTE
- change status only to 'TEAM_VOTE'

ACTION: SUBMIT_TEAM_VOTE
desc: individual players submitting their vote
data: player: string, vote: boolean
- set associated player object's team vote to respective vote

ACTION: REVEAL_TEAM_VOTE
- change status only to 'DISPLAY_TEAM_VOTE'

HANDLE_TEAM_VOTE_RESULT:
- team vote approved:
  - greater than half of all players votes APPROVE
  -> change status to: MISSION_VOTE
- team vote rejected:
  - less than or equal to half of all players vote APPROVE
  -> change status to: TEAM_PROPOSAL
-IF VOTE TRACK === 5 AND TEAM VOTE REJECTED
  -> change status to: GAME_END


ACTION: HANDLE_TEAM_VOTE_RESULT
result: approved team
- update status to 'MISSION_VOTE'

ACTION: SUBMIT_MISSION_VOTE
desc: only people on the mission get ui to submit mission vote
- data: player, vote: SUCCESS/FAIL/REVERSE
- add vote to the MissionVote array

ACTION: HANDLE_MISSION_VOTE_RESULT
- set mission num's result to result
- check for 3 success or fail
result: 3 success
  - change status to ASSASSINATION
result: 3 fail
  - change status to EVIL_WIN
else:
- increment mission number
- reset vote track
- shift king
- change status to 'TEAM_PROPOSAL'

ACTION: HANDLE_TEAM_VOTE_RESULT
result: rejected team
- update status to 'TEAM_PROPOSAL'
- shift king
- increment vote track
- don't clear submitted team votes

ACTION: HANDLE_TEAM_VOTE_RESULT
result: rejected team + vote track 5
- change status only to GAME_END
- bad guys scenario

ACTION: SUBMIT_ASSASSINATION
data: target(s), role
result: correct
- change status to EVIL_WIN
result: incorrect
- change status to GOOD_WIN

ACTION: RECONFIGURE_GAME
- reset all game states
- take you back to configuration page



ACTION: FORCE_TEAM_VOTE
ACTION: FORCE_MISSION_VOTE