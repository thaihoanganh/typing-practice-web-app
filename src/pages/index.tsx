import Head from "next/head";
import React from "react";

import { PracticeProvider } from "@/modules/practice";
import { LessonProvider } from "@/modules/lesson";
import PracticeLesson from "@/containers/PracticeLesson";

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PracticeProvider>
        <LessonProvider>
          <PracticeLesson />
        </LessonProvider>
      </PracticeProvider>
    </React.Fragment>
  );
};

export default Home;
