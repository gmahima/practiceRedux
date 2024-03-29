import * as PlayerActionTypes from "../actiontypes/player";

const initialState = {
  players: [
    {
      name: "Jim Hoskins",
      score: 31,
      created: "11/8/2016",
      updated: "11/9/2016"
    },
    {
      name: "Andrew Chalkley",
      score: 20,
      created: "11/9/2016",
      updated: "11/10/2016"
    },
    {
      name: "Alena Holligan",
      score: 50,
      created: "11/11/2016",
      updated: "11/12/2016"
    }
  ],
  selectedPlayerIndex: -1
};

export default function Player(state = initialState, action) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER: {
      const addPlayerList = [
        ...state.players,
        {
          name: action.name,
          score: 0,
          created: `${day}/${month}/${year}`
        }
      ];
      return [...state, addPlayerList];
    }

    case PlayerActionTypes.REMOVE_PLAYER: {
      const removePlayerList = [
        ...state.players.slice(0, action.index),
        ...state.players.slice(action.index + 1)
      ];

      return [...state, removePlayerList];
    }

    case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
      const updatePlayerList = [
        state.players.map((player, index) => {
          if (index === action.index) {
            return {
              ...player,
              score: player.score + action.score,
              updated: `${day}/${month}/${year}`
            };
          }
          return player;
        })
      ];
      return [...state, updatePlayerList];
    }
    case PlayerActionTypes.SELECT_PLAYER: {
      return {
        ...state,
        selectedPlayerIndex: action.index
      };
    }

    default:
      return state.players;
  }
}
