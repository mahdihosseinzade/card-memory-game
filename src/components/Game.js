import React from "react";
import Card from "./Card";

import { cardsData } from "../cards";
import { useState } from "react";

function Game() {

  const [cards,setCards]=useState(cardsData);
  const [CardFlip,setCardFlip]=useState([]);
  const [CardFlips,setCardFlips]=useState([]);
  const [lock,setLock]=useState(false);
  
  
  const handelClick=(id)=>{
    
    if(lock)return;

    const CardId = cards.map(card => card.id).indexOf(id);
    
    if (cards[CardId]){
      cards[CardId].isFlipped = true;
    }
    else return
    setCards([...cards]);


    if(CardFlips.find(Id=>Id===CardId)!==undefined){
      return
    }

    CardFlip.push(CardId);
    setCardFlip([...CardFlip]);

    if(CardFlip.length%2===0){

      const lastItem = CardFlip.length-1;

      if (cards[CardFlip[lastItem - 1]].name !== cards[CardFlip[lastItem]].name || cards[CardFlip[lastItem - 1]].id === cards[CardFlip[lastItem]].id ){

        setLock(true);
      
        setTimeout(()=>{
          cards[CardFlip[lastItem-1]].isFlipped = false;
          cards[CardFlip[lastItem]].isFlipped = false;
          setCards([...cards]);
          setLock(false);
        },1500);

      }else{
        CardFlips.push(CardFlip[lastItem-1]);
        CardFlips.push(CardFlip[lastItem]);
        setCardFlips([...CardFlips]);

      }
      setCardFlip([]);
    }

  }

  return (
    <section className="memory-game">
      {
        cards.map(card => <Card key={card.id} id={card.id} card={card} onClick={()=>handelClick(card.id)} />)
      }
    </section>
  );
}

export default Game;
