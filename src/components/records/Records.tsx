import React, { useState, useEffect } from "react";
import axios from "axios";
import { ISnake } from "../../types/types";

const Records = ({ submitSend, openRecords, handleOpenRecords }: ISnake) => {
  const [records, setRecords] = useState<any>([]);
  const [recordsNoobs, setRecordsNoobs] = useState<any>([]);
  const [loadingRecords, setLodingRecords] = useState(true);

  const url: any = process.env.REACT_APP_FIREBASE_DATABASE_URL_GET;

  //FILTER RECORDS FROM HIGH SCORE
  records.sort(
    (a: { record: { score: number } }, b: { record: { score: number } }) =>
      b.record.score - a.record.score
  );

  // GET DATA AXIOS
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const records = [];
        for (const key in res.data) {
          records.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log("loading reocrds complete 200");
        setRecords(records);
        setRecordsNoobs(records.splice(3));
        setLodingRecords(false);
      })
      .catch(() => {
        setLodingRecords(false);
      });
  }, [openRecords, submitSend]);

  return (
    <div className="records">
      {loadingRecords ? (
        <div className="loading-box">
          <p>loading...</p>
        </div>
      ) : (
        <div className="records-box">
          <ol>
            <li>
              <img src="/images/trophy/trophy1.png" alt="trophy image"></img>
              <p>{records[0].record.name}</p>
              <p>{records[0].record.score}</p>
            </li>
            <li>
              <img src="/images/trophy/trophy2.png" alt="trophy image"></img>
              <p>{records[1].record.name}</p>
              <p>{records[1].record.score}</p>
            </li>
            <li>
              <img src="/images/trophy/trophy3.png" alt="trophy image"></img>
              <p>{records[2].record.name}</p>
              <p>{records[2].record.score}</p>
            </li>
            {recordsNoobs.map((i: any) => (
              <li key={i.id}>
                <p>{i.record.name}</p>
                <p>{i.record.score}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <button
        className="button-50"
        onClick={() => handleOpenRecords(openRecords)}
      >
        back
      </button>
    </div>
  );
};

export default Records;
