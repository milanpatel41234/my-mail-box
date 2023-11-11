import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";


function ComposeMail(props) {
    const Auth = useSelector(state=> state.Auth);
  const [EmailValue, setEmailValue] = useState("");
  const [SubjectValue, setSubjectValue] = useState("");
  const [EmailContent, setEmailContent] = useState("");
  const [FormIsValid, setFormIsValid] = useState(false);
  const [EmailSanding, setEmailSanding] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setEmailSanding(true);
    const removeSpecialCharacters = (email) => {
      email = email.replace(/@/g, "");
      email = email.replace(/\./g, "");
      return email;
    };
    const cleanedEmail = removeSpecialCharacters(EmailValue);
    try {
      const res = await fetch(
        `https://mailbox-8e799-default-rtdb.firebaseio.com/${cleanedEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            to: EmailValue,
            subject: SubjectValue,
            emailcontaint: EmailContent,
            from: Auth.userEmail,
            readstatus: false,
          }),
        }
      );
      if (res.error) {
        throw new Error(res.error);
      } else {
        try {
            const result = await fetch(
                `https://mailbox-8e799-default-rtdb.firebaseio.com/${Auth.userName}/sentbox.json`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    to: EmailValue,
                    subject: SubjectValue,
                    emailcontaint: EmailContent,
                    from: Auth.userEmail,
                  }),
                }
              );

              if (result.error) {
                throw new Error(res.error);
              } else{props.onFetch()}
        } catch (error) {
            alert(error.message)
        }
        setEmailContent("");
        setEmailValue("");
        setSubjectValue("");
        alert("Email sent successfully");
      }
    } catch (error) {
      alert(error);
    }
    setEmailSanding(false);
  };
  useEffect(() => {
    setFormIsValid(
      EmailValue.includes("@") &&
        SubjectValue.trim().length > 1 &&
        EmailContent.trim().length > 1
    );
  }, [EmailValue, SubjectValue, EmailContent]);
  return (
    <form onSubmit={HandleSubmit}>
      <h1>Send Emails</h1>
      <Input
        id="Reciever's Email"
        type="text"
        onChange={(e) => setEmailValue(e.target.value)}
        value={EmailValue}
      />
      <Input
        id="Subject"
        type="text"
        onChange={(e) => setSubjectValue(e.target.value)}
        value={SubjectValue}
      />
      <textarea
        type="text"
        placeholder="Mail"
        onChange={(e) => setEmailContent(e.target.value)}
        value={EmailContent}
      />
      <div >
        <Button type="Submit" disabled={!FormIsValid || EmailSanding}>
         {EmailSanding ? 'Sending...' : 'Send'} 
        </Button>
      </div>
    </form>
  );
}

export default ComposeMail;
