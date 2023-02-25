import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export default (reducer, callbacks, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundCallbacks = {};

    for (const key in callbacks) {
      boundCallbacks[key] = callbacks[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundCallbacks }}>
        {children}
      </Context.Provider>
    );
  };

  Provider.propTypes = {
    children: PropTypes.any
  };

  return { Context, Provider };
};
