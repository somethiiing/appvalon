Landing Page // page: landing
  - Action: Join Room // page: join_room
  - Action: Create Room // ROOM_SETUP

Create Room Page // ROOM_SETUP
  - Options:
    - Room owner
    - num of people
    - radio buttons: avalon vs thavalon
      - avalon:
        - base roles
          - pick roles
          - pick # of generic good
          - pick # of generic bad
        - base rules
        - lake
          - role
          - alignment
      - thavalon:
        - choose roles / maybe
        - hasReversals
        - don't choose roles
        - different roles
        - vote tracker difference
  - Generate room code
  - Room owner joins room
  - Action: CREATE_ROOM

Join Room Page // page: join_room
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
            - Action: ADD_PLAYER

Waiting for Players // WAITING_FOR_PLAYERS
  - Names of players who have joined so far
  - Number of players joined vs expected
  - Number of good and evil players in the game
  - Roles that will be in the game
  - When num players joined == expected
    - Action: GAME_START

Game Instantiation // Action: GAME_START
  - Assign Roles to People
  - Set King Order
  - Assign Lake
  - Deal out information
  - update status to TEAM_PROPOSAL

Team Proposal // TEAM_PROPOSAL
  - KING
    - see how many to choose
    - see list of players to choose from
    - choose players // Action: UPDATE_TEAM_MEMBERS
    - (skipping for now) submit for discussion // Action: SUBMIT_FOR_DISCUSSION
    - submit for vote // Action: SUBMIT_FOR_VOTE

  - NOT KING
    - see proposed players in real time // Action: UPDATE_TEAM_MEMBERS

Team Vote // TEAM_VOTE
  - EVERYONE
    - see who is on the mission
    - approve/reject buttons (onClick is submitted, maybe able to submit multiple) // Action: SUBMIT_TEAM_VOTE
    - see who/number of people has voted (but not what they voted) // Action: SUBMIT_TEAM_VOTE
  - KING
    - manual reveal vote button // Action: REVEAL_TEAM_VOTE
      - enabled when everyone has voted
  - ADMIN/HOST
    - force vote button // Action: FORCE_TEAM_VOTE

Display Team Vote // DISPLAY_TEAM_VOTE
  - EVERYONE
    - See who voted what
  - KING
    - next button // Action: DONE_VIEWING_TEAM_VOTE

- todo: finish statuses and actions
- todo: define base roles
- todo: define base rules
