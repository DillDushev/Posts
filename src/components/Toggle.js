import * as React from 'react';

const {useState, useEffect, useContext, createContext} = React;

const ToggleContext = createContext();

function Switch(props) {
  return ( 
    <label className='switch'>
      <input type='checkbox' onClick={props.onClick} />
      <span className='slider round'></span>
    </label>
  );
}

function Toggle (props) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(oldOn => !oldOn);

  useEffect(() => {
    props.onToggle(on);
  }, [on]);

  return (
    <ToggleContext.Provider value = {{on, toggle}}>
      {props.children}
    </ToggleContext.Provider>
  );
};

const On = ({children}) => {
  const {on} = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.On = On;

const Off = ({children}) => {
  const {on} = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Off = Off;

const Button = props => {
  const {on, toggle} = useContext(ToggleContext);
  return <Switch on = {on} onClick = {toggle} {...props} />
};

Toggle.Button = Button;

export default function Usage({onToggle = (...args) => console.log('onToggle', ...args)}) {

  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is On</Toggle.On>
      <Toggle.Off>The button is Off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  );
}