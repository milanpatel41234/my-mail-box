import React, {useState} from "react";
import style from "../MailList.module.css";
import MailList from "./MailList";
import ShowCurrentMail from "./ShowCurrentMail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function Sentbox({ items, onFetch }) {
  const [ShowFullMail, setShowFullMail] = useState(false);

  

  return (
    <>
      {ShowFullMail && <button onClick={()=>setShowFullMail(false)} className={style.button}><ArrowBackIcon/></button>}
      <h2>Sentbox</h2>
      {ShowFullMail ? (
        <ShowCurrentMail />
      ) : (
        items.map((item) => (
          <MailList
            onShowMail={() => setShowFullMail(true)}
            key={item.key}
            item={item}
            onFetch={onFetch}
          />
        ))
      )}
      {items.length === 0 && <h3>No mails available</h3>}
    </>
  );
}

export default Sentbox;
