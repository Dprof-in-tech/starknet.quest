import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../../styles/quests.module.css";
import {
  CheckCircle as CheckCircleIcon,
  ErrorRounded as ErrorRoundedIcon,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "../UI/button";
import { CircularProgress, Skeleton } from "@mui/material";

const Task: FunctionComponent<Task> = ({
  name,
  description,
  href,
  cta = "open app",
  verifyEndpoint,
  refreshRewards,
  wasVerified,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isVerified, setIsVerified] = useState(wasVerified);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // a verify function that setIsVerified(true) and stoppropagation
  const verify = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    fetch(verifyEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.res) {
          setIsVerified(true);
          refreshRewards();
        } else {
          setError(data.error_msg);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={styles.task}>
      <div
        className={styles.taskTitle}
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="flex">
          {isClicked ? (
            <KeyboardArrowDownIcon width={25} color="secondary" />
          ) : (
            <KeyboardArrowRightIcon width={25} color="secondary" />
          )}
          <p className="ml-2 mr-2">{name}</p>
        </div>
        {isVerified ? (
          <div className="flex">
            Done
            <CheckCircleIcon className="ml-2" width={25} color="primary" />
          </div>
        ) : isLoading ? (
          <div className="w-20 flex justify-center items-center">
            <>
              <CircularProgress size={30} color="primary" />
            </>
          </div>
        ) : error ? (
          <div className="flex">
            {error}
            <ErrorRoundedIcon className="ml-2" width={25} color="error" />
          </div>
        ) : (
          <div onClick={(e) => verify(e)} className={styles.verifyButton}>
            <p>Verify</p>
          </div>
        )}
      </div>
      <div
        className={`${styles.taskDescription}  ${
          isClicked ? styles.visible : null
        }`}
      >
        <p className="mb-3">{description}</p>
        <div className="flex w-full justify-center items-center">
          <div className="w-2/3">
            <Button onClick={() => window.open(href)}>{cta}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;