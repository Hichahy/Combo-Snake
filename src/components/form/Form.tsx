import React, { useEffect } from "react";
import firebaseAxios from "../../firebaseAxios";
import { ISnake } from "../../types/types";

const Form = ({
  nickname,
  showError,
  errors,
  snakeDots,
  submitSend,
  setNickname,
  handleOpenForm,
  handleFormErrors,
  handleValidation,
  handleSubmitSend,
  handleShowError,
  handleGameOver,
}: ISnake) => {
  let errorTime: NodeJS.Timer;

  const sendRecord = () => {
    const Data = {
      record: {
        name: nickname,
        score: snakeDots.length - 2,
      },
    };
    firebaseAxios.post("/records.json", Data).then((response) => {
      console.log(response);
      handleGameOver();
    });
  };

  const handleNickname = (e: any) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const handleSubmit = () => {
    handleFormErrors(handleValidation());
    handleSubmitSend(true);
    handleShowError(true);
  };

  //ERROR SHOW AND HIDE TIME
  useEffect(() => {
    if (errors.nickname) {
      errorTime = setTimeout(() => {
        handleShowError(false);
      }, 5000);
    }
    return () => clearTimeout(errorTime);
  }, [errors]);

  //SEND DATA TO FIREBASE IF NO ERRORS
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitSend) {
      handleOpenForm(false);
      handleSubmitSend(false);
      setNickname("");
      sendRecord();
    }
  }, [errors, submitSend]);

  return (
    <div className="overlay">
      {errors.nickname && (
        <span className={`${showError ? "error" : "error-hidden"}`}>
          {errors.nickname}
        </span>
      )}
      <input
        type="text"
        value={nickname}
        placeholder="nickname"
        onChange={handleNickname}
      />
      <button className="button-50" onClick={() => handleSubmit()}>
        send
      </button>
      <button className="button-50" onClick={() => handleOpenForm(false)}>
        back
      </button>
    </div>
  );
};

export default Form;
