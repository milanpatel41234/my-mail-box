import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ShowCurrentMail({onFetch}) {
  const Auth = useSelector((state) => state.Auth);
  const Mail = useSelector((state) => state.Mail.item);

  useEffect(() => {
    if (!Mail.readstatus) {
      const ChangeReadStatus = async () => {
        try {
          const res = await fetch(
            `https://mailbox-8e799-default-rtdb.firebaseio.com/${Auth.userName}/inbox/${Mail.key}.json`,
            {
              method: "PATCH",
              body: JSON.stringify({
                readstatus: true,
              }),
            }
          );
          if (res.error) {
            throw new Error(res.error);
          }else{onFetch()}
        } catch (error) {
          alert(error.message);
        }
      };
      ChangeReadStatus();
    }
  }, []);

  return (
    <div style={{ color: "black" }}>
      <h4>{Mail.from}</h4>
      <b>{Mail.subject}</b>
      <p>{Mail.emailcontaint}</p>
    </div>
  );
}

export default ShowCurrentMail;
