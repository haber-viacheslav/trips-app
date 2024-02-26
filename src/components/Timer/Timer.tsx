import React, { useState, useEffect } from 'react';
import {
  TimerStyledValue,
  TimerStyledWrp,
  TimerStyledField,
  TimerStyledLabel,
  StyledTimerMessage,
} from './Timer.styled';
import { getTimeForTimer } from '../../helpers/getTimeForTimer';

interface TimerProps {
  tripTime: Date;
}

export const Timer: React.FC<TimerProps> = ({ tripTime }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(getTimeForTimer(tripTime));
  const [isTripStarted, setIsTripStarted] = useState<boolean>(false);
  const { days, hours, minutes, seconds } = timeLeft;
  const isNotTime: boolean = !days && !hours && !minutes && !seconds;

  useEffect(() => {
    if (!isNotTime) {
      setIsTripStarted(false);
    } else {
      setIsTripStarted(true);
    }
  }, [isNotTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeForTimer(tripTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [tripTime]);

  return (
    <>
      {isTripStarted ? (
        <StyledTimerMessage>Your trip has started</StyledTimerMessage>
      ) : (
        <TimerStyledWrp>
          <TimerStyledField>
            <TimerStyledValue>{days}</TimerStyledValue>
            <TimerStyledLabel>Days</TimerStyledLabel>
          </TimerStyledField>
          <TimerStyledField>
            <TimerStyledValue>{hours}</TimerStyledValue>
            <TimerStyledLabel>Hours</TimerStyledLabel>
          </TimerStyledField>
          <TimerStyledField>
            <TimerStyledValue>{minutes}</TimerStyledValue>
            <TimerStyledLabel>Minutes</TimerStyledLabel>
          </TimerStyledField>
          <TimerStyledField>
            <TimerStyledValue>{seconds}</TimerStyledValue>
            <TimerStyledLabel>Seconds</TimerStyledLabel>
          </TimerStyledField>
        </TimerStyledWrp>
      )}
    </>
  );
};
