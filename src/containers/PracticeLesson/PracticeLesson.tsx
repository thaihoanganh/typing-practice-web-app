import React from "react";
import { usePractice } from "@/modules/practice";
import { useLesson } from "@/modules/lesson";
import TextData, { TextDataWrapper, TextDataInput } from "@/components/organisms/TextData";
import Result, { ResultList } from "@/components/organisms/Result";

const PracticeLesson: React.FC = () => {
  const { practiceState, onHandleKeyPress, onToggleReady } = usePractice();
  const { lessonState } = useLesson();

  const { cursonWord, isReady, isTyping, practiceData } = practiceState;
  const { passScoreAccuracy, passScoreWpm } = lessonState;
  const { accuracy, totalTime, wpm } = lessonState.results;

  const wpmValue = wpm ? wpm.toFixed(2) + " wpm" : "0 wpm";
  const accuracyvalue = accuracy ? (accuracy * 100).toFixed(2) + " %" : "0 %";
  const totalTimeValue = totalTime ? totalTime.toFixed(2) + " s" : "";

  const wpmRatio = wpm ? (wpm < passScoreWpm ? wpm / passScoreWpm : 1) : 0;
  const accuracyRatio = accuracy ? (accuracy < passScoreAccuracy ? accuracy / passScoreAccuracy : 1) : 0;
  const totalTimeRatio = totalTime ? 1 : 0;

  return (
    <React.Fragment>
      <TextDataWrapper>
        <TextData cursonWord={cursonWord} isReady={isReady} data={practiceData} />
        <TextDataInput onHandleKeyPress={onHandleKeyPress} onToggleFocus={onToggleReady} />
      </TextDataWrapper>
      <ResultList isLoading={isTyping}>
        <Result value={wpmValue} ratio={wpmRatio} title="Tốc độ gõ" />
        <Result value={accuracyvalue} ratio={accuracyRatio} title="Độ chính xác" />
        <Result value={totalTimeValue} ratio={totalTimeRatio} title="Thời gian" />
      </ResultList>
    </React.Fragment>
  );
};

export default PracticeLesson;
