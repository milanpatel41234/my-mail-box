import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import style from "./Page.module.css";
import Button from "../UI/Button/Button";
import { useSelector } from "react-redux";
import Inbox from "../MailList/InboxMails/Inbox";
import ComposeMail from "../MailList/ComposeMail";
import Sentbox from "../MailList/SentboxMails/Sentbox";

const MailBox = () => {
  const Auth = useSelector((state) => state.Auth);
  const [SentboxMails, setSentboxMails] = useState([]);
  const [ItemToShow, setItemToShow] = useState('INBOX');
  const [FetchingState , setFetchingState] = useState(<h3>No mails available</h3>)


  const FetchSentboxMails = async () => {
    setFetchingState(<h3>Loading...</h3>)
    try {
      const res = await fetch(
        `https://mailbox-8e799-default-rtdb.firebaseio.com/${Auth.userName}/sentbox.json`
      );
      const data = await res.json();
      if (data && data.error) {
        throw new Error(data.error);
      } else {
        const Mails = [];
        for (const key in data) {
          const item = {
            ...data[key],
            key: key,
          };
          Mails.push(item);
        }
        setSentboxMails([...Mails]);
      }
      setFetchingState(<h3>No mails available</h3>)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    FetchSentboxMails();
  }, []);

const HandleInbox =()=>{
  setItemToShow('INBOX');
}
const HandleSentbox =()=>{
  setItemToShow('SENTBOX');
}
const HandleCompose =()=>{
  setItemToShow('COMPOSE');
}


  return (
    <div className={style.box}>
      <div className={style.navigationbutton}>
        <Button onClick={HandleCompose} >Compose</Button>
        <Button onClick={HandleInbox}>Inbox</Button>
        <Button onClick={HandleSentbox}>Sentbox</Button>
      </div>
      <Card className={style.container}>
       {ItemToShow==='INBOX' && <Inbox />}
        {ItemToShow==='SENTBOX' && <Sentbox items={SentboxMails} onFetch={FetchSentboxMails} State={FetchingState} />}
        {ItemToShow==='COMPOSE' && <ComposeMail onFetch={FetchSentboxMails} />}
      </Card>
    </div>
  );
};
export default MailBox;
