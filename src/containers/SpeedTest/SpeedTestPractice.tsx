import React from "react";
import { useSpeedTest, actionToggleReady, actionHandleTypingWord } from "@/modules/speedtest";
import TextData, { TextDataWrapper, TextDataInput } from "@/components/organisms/TextData";

export const SpeedTestPractice: React.FC = () => {
  const { speedTest, speedTestStatus } = useSpeedTest();

  return (
    <React.Fragment>
      <TextDataWrapper>
        {speedTestStatus === "READY" && (
          <TextData
            data={speedTest.data}
            isCheckAfterWord={true}
            isCompleted={speedTest.isCompleted}
            isReady={speedTest.isReady}
            wordCursor={speedTest.wordCursor}
            charactersCursor={speedTest.charactersCursor}
          />
        )}
        {!speedTest.isCompleted && (
          <TextDataInput
            isShowDraft
            wordCursor={speedTest.wordCursor}
            onToggleFocus={actionToggleReady}
            onHandleTypingWord={actionHandleTypingWord}
          />
        )}
      </TextDataWrapper>
    </React.Fragment>
  );
};

export default SpeedTestPractice;
