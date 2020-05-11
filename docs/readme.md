Landing Page
  - Join Room
  - Create Room

Create Room Page // ROOM_SETUP
  - Options:
    - Room owner
    - # of people
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

Join Room Page // WAITING_FOR_PLAYERS
  - Join as spectator
    - text box for room code
  - Form:
    - text box for room code
    - text box for your name
    - submit/join room button
      - onsubmit
        - check room code validity
          - check name for duplicate
            - player joins room

Game Instantiation
  - Assign Roles to People
  - Set King Order
  - Assign Lake
  - Deal out information

Team Proposal
  - KING
    - see how many to choose
    - see list of players to choose from
    - submit for discussion
    - submit for vote

  - NOT KING
    - see proposed players in real time

Team Vote
  - EVERYONE
    - see who is on the mission
    - approve/reject buttons (onClick is submitted, maybe able to submit multiple)
    - see who/number of people has voted (but not what they voted)
  - KING
    - manual reveal vote button
      - enabled when everyone has voted
  - ADMIN/HOST
    - force vote button

Display Team Vote
  - EVERYONE
    - See who voted what
  - KING
    - next button


- todo: define base roles
- todo: define base rules



