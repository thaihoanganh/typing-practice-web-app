import React from "react";

import { usePractice, actionToggleFocusTextData, actionPressKeyboard } from "@/modules/practice";
import { useLesson } from "@/modules/lesson";
import TextData, { TextDataWrapper, TextDataInput } from "@/components/organisms/TextData";
import Result from "@/components/organisms/Result";
import Keyboard, { Keycap } from "@/components/organisms/Keyboard";

const PracticeLesson = () => {
  const { practice } = usePractice();
  const { lesson } = useLesson();

  const { minimumAccuracy, minimumWordsPerMinute } = lesson;
  const { totalTime, wordsPerMinute, accuracy } = lesson.results;

  let accuracyRatio = 0;
  let wordsPerMinuteRatio = 0;

  if (minimumAccuracy && accuracy && minimumWordsPerMinute && wordsPerMinute) {
    accuracyRatio = accuracy / minimumAccuracy;
    wordsPerMinuteRatio = wordsPerMinute / minimumWordsPerMinute;
  }

  return (
    <React.Fragment>
      <div className="m-lg">
        <TextDataWrapper>
          <TextData data={practice.data} isReady={practice.isReady} cursonWord={practice.cursonWord} />
          <TextDataInput
            cursonWord={practice.cursonWord}
            onToggleFocus={actionToggleFocusTextData}
            onHandleKeyPress={actionPressKeyboard}
          />
        </TextDataWrapper>
      </div>

      <div className="desktop:flex m-lg">
        <Result
          title="Thời gian"
          isLoading={practice.isTyping}
          value={totalTime ? totalTime.toFixed(2) + " s" : ""}
          ratio={Number(totalTime && !practice.isTyping)}
        />
        <Result
          title="Tốc độ gõ"
          isLoading={practice.isTyping}
          value={wordsPerMinute ? wordsPerMinute.toFixed(2) + " wpw" : ""}
          ratio={wordsPerMinuteRatio < 1 ? wordsPerMinuteRatio : 1}
        />
        <Result
          title="Độ chính xác"
          isLoading={practice.isTyping}
          value={accuracy ? (accuracy * 100).toFixed(2) + " %" : ""}
          ratio={accuracyRatio < 1 ? accuracyRatio : 1}
        />
      </div>

      <div className="m-lg">
        <Keyboard />
      </div>
    </React.Fragment>
  );
};

export default PracticeLesson;
