import React, { useState } from "react";
import style from "../MailList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MailAction } from "../../Redux/Index";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function MailList({ item, onFetch, onShowMail }) {
    const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [Deleting, setDeleting] = useState(false);

  const HandleDelete = async (key) => {
    setDeleting(true);
    try {
      const res = await fetch(
        `https://mailbox-8e799-default-rtdb.firebaseio.com/${Auth.userName}/inbox/${key}.json`,
        { method: "DELETE" }
      );
      if (res.error) {
        throw new Error(res.error);
      } else {
        onFetch();
      }
    } catch (error) {
      alert(error.message);
    }
    setDeleting(false);
  };

  const ShowMail =() => {
  dispatch(MailAction.setCurrentMail(item));
    onShowMail();
  }

  return (
    <div className={style.list}>
     <div className={style.dot}>{!item.readstatus && <FiberManualRecordIcon />}</div>
      <li onClick={ShowMail} className={style.li}>
        <span>{item.from}</span>
        <b>{item.subject}</b>
        <i>{item.emailcontaint}</i>
      </li>
        <button onClick={HandleDelete.bind(null, item.key)}>
          {Deleting ? "Deleting" : "Delete"}
        </button>
    </div>
  );
}

export default MailList;
