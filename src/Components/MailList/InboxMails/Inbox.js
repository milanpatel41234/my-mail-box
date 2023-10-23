import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MailList from "./MailList";
import ShowCurrentMail from "./ShowCurrentMail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from '../MailList.module.css'

function Inbox() {
  const Auth = useSelector((state) => state.Auth);
  const [InboxMails, setInboxMails] = useState([]);
  const [ShowFullMail, setShowFullMail] = useState(false);
  const [FetchinState , setFetchinState] = useState(<h3>No mails available</h3>)

  const FetchInboxMails = async () => {
    setFetchinState(<h3>Loading...</h3>)
    try {
      const res = await fetch(
        `https://mailbox-8e799-default-rtdb.firebaseio.com/${Auth.userName}/inbox.json`
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
        setInboxMails([...Mails]);
      }
      setFetchinState(<h3>No mails available</h3>)
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    FetchInboxMails();
  }, []);

  return (
    <>
      {ShowFullMail && <button onClick={()=>setShowFullMail(false)} className={style.button}><ArrowBackIcon/></button>}
      <h2>Inbox</h2>
      {ShowFullMail ? (
        <ShowCurrentMail  onFetch={FetchInboxMails}/>
      ) : (
        InboxMails.map((item) => (
          <MailList
            onShowMail={() => setShowFullMail(true)}
            key={item.key}
            item={item}
            onFetch={FetchInboxMails}
          />
        ))
      )}
      {InboxMails.length === 0 && FetchinState}
    </>
  );
}

export default Inbox;
