import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import logo from './assests/logo.svg';
import dollar from './assests/icon-dollar.svg';
import person from './assests/icon-person.svg';


function App() {
  const initialTipPercentage ={
    '5':true,
    '10':true,
    '15':true,
    '20':true,
    '25':true
  }
  const [billAmount, setBillAmount] = useState('');
  const [noOfPeople, setNoOfPeople] = useState(1);
  const [Tip,setTip] = useState(0);
  const [TipPercentage, setTipPercentage] = useState(initialTipPercentage);
  const [customTipPercentage, setCustomTipPercentage] = useState('');
  const [tipPerHead, setTipPerHead] = useState('');
  const [amountPerHead, setAmountPerHead] = useState('')



  const addingTipPercentage=async(id)=>{
    setCustomTipPercentage('');
    const newTipPercentage = {...initialTipPercentage};
    newTipPercentage[id]=!TipPercentage[id];
    setTipPercentage(newTipPercentage);
  }

  const tipAmountCaluculation = () =>{
    const demoVariable = Object.keys(TipPercentage).filter((id)=>{
      return !TipPercentage[id]
    })
    if(demoVariable.length===1 && noOfPeople){
      const newtip=billAmount*demoVariable[0]/100;
      setTip(+newtip);
      console.log(newtip);
    }
    if(customTipPercentage && noOfPeople){
      const newtip=billAmount*customTipPercentage/100;
      setTip(+newtip);
    }
  }

  const reset = () =>{
    setTipPercentage(initialTipPercentage);
    setNoOfPeople('');
    setTip('');
    setBillAmount('');
    setCustomTipPercentage('');
    setTipPerHead('')
    setAmountPerHead('')
  }

  const setCustomPercentage = (e) =>{
    setTipPercentage(initialTipPercentage);
    setCustomTipPercentage(e.target.value);
  }

  const perHeadCount = () =>{
    if(Tip&&noOfPeople){
      setTipPerHead(Math.floor(Tip/noOfPeople));
    }
  }

  useEffect(() => {
    tipAmountCaluculation();
    perHeadCount();
    if(Tip&&noOfPeople){
      setAmountPerHead(Math.floor((Tip+billAmount)/ noOfPeople));
    }
    console.log(Tip,billAmount,noOfPeople);
  }, [billAmount,customTipPercentage,noOfPeople,Tip,tipPerHead,TipPercentage])

  return (
    <>
      <div class="container">
        <div class="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div class="bill-area">
          <div class="input">
            <div class="bill">
              Bill
              <div class="bill-input">
                <input type="text" value={billAmount} onChange={(e)=>{setBillAmount(+(e.target.value))}}/>
                <img src={dollar} alt="icon-dollar" />
              </div>
            </div>
            <div class="select-tip">
              Select Tip %
              <div class="btn-wrapper">
                <button class={TipPercentage[5]?'percent-btn':'selected'} onClick={()=>addingTipPercentage(5)}>5%</button>
                <button class={TipPercentage[10]?'percent-btn':'selected'} onClick={()=>addingTipPercentage(10)}>10%</button>
                <button class={TipPercentage[15]?'percent-btn':'selected'} onClick={()=>addingTipPercentage(15)}>15%</button>
                <button class={TipPercentage[20]?'percent-btn':'selected'} onClick={()=>addingTipPercentage(20)}>20%</button>
                <button class={TipPercentage[25]?'percent-btn':'selected'} onClick={()=>addingTipPercentage(25)}>25%</button>
                <input type="text" class='percent-input' value={customTipPercentage} onChange={setCustomPercentage} placeholder="Custom" />
              </div>
            </div>
            <div class="bill">
              Number of People
              <label style={noOfPeople?{visibility:"hidden"}:{visibility:"visible"}} className ="error-message">Can't be zero</label>
              <div class="people-input">
                <input class={noOfPeople?'noOfPeople-input':'noOfPeople-input-error'} value={noOfPeople} onChange={(e)=>{setNoOfPeople(+(e.target.value))}} type="text" />
                <img src={person} alt="icon-person" />
              </div>
            </div>
          </div>
          <div class="output">
            <div class="tip-amount">
              <div class="output-tip">
                Tip Amount
                <br />
                <label class="tip-per-person">/person</label>
              </div>
              <div class="tip">{tipPerHead}</div>
            </div>
            <div class="tip-amount">
              <div class="output-tip">
                Total Amount
                <br />
                <label class="tip-per-person">/person</label>
              </div>
              <div class="tip">{amountPerHead}</div>
            </div>
            <button class="btn-reset" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
