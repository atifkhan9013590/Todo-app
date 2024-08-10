import {createContext, useReducer } from "react";



export const TodoContext = createContext();

    

    const reducer = (state, action) => {
      switch (action.type) {
        case "ADD_TASK":
          return {
            ...state,
            Task: [...state.Task, { task: action.payload, complete: false }],
          };
        case "DELETE_TASK":
          return {
            ...state,
            Task: state.Task.filter((_, index) => index !== action.payload),
          };
        case "UPDATE_TASK":
          return {
            ...state,
            Task: state.Task.map((tsk, index) =>
              index === action.payload.index
                ? { ...tsk, task: action.payload.newTask }
                : tsk
            ),
          };
        case "COMPLETE_TASK":
          return {
            ...state,
            Task: state.Task.map((tsk, index) =>
              index === action.payload
                ? { ...tsk, complete: !tsk.complete }
                : tsk
            ),
          };
        case "MOVE_TASK_UP":
          if (action.payload > 0) {
            const newTasks = [...state.Task];
             const temp = newTasks[action.payload];

            newTasks[action.payload]=newTasks[action.payload-1]
            newTasks[action.payload-1]=temp
            return {
              ...state,
              Task: newTasks,
            };
          }
          return state;
        case "MOVE_TASK_DOWN":
          if (action.payload < state.Task.length - 1) {
            const newTasks = [...state.Task];
           const temp = newTasks[action.payload];

          newTasks[action.payload]= newTasks[action.payload+1]
          newTasks[action.payload+1]=temp
            
            return {
              ...state,
              Task: newTasks,
            };
          }
          return state;
        default:
          return state;
      }
    };

    const intialstate = {
      Task: [{ task: "Coding Challenge", complete: false }],
    };

    export const TodoProvider = ({ children }) => {
      const [state, dispatch] = useReducer(reducer, intialstate);

      return (
        <TodoContext.Provider value={{ state, dispatch }}>
          {children}
        </TodoContext.Provider>
      );
    };
