import styles from "../styles/Home.module.css";
import React, { useState, useEffect, useRef } from "react";
import {Console} from "../components/Console.jsx";

const MediaStreamWrapper = ({ children }) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    // Initialize getUserMedia on component mount
    const initMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setUserMediaStream(stream);
      } catch (error) {
        console.error("Error accessing user media stream:", error);
      }
    };

    initMediaStream();
  }, []);

  return userMediaStream ? children({ userMediaStream, setUserMediaStream }) : null;
};

export const Index = () => {
  function introduction() {
    return {
      role: "assistant",
      content: "Start typing to talk to your counsellor",
    };
  }

  const [textInput, setTextInput] = useState("");
  const audioRefs = useRef(Array(512).fill(null));
  const sessionMessages = useRef([introduction()]);
  const detectionSettings = useRef({
    activityDetection: true,
    activityDetectionThreshold: 10,
  });
  const [promptOpen, setPromptOpen] = useState(false);
  const [activityDetection, setActivityDetection] = useState(0);
  const [preprocessedJobDescription, setPreprocessedJobDescription] = useState("");
  const [playQueue, setPlayQueue] = useState([]);
  const [currentAIAudio, setCurrentAIAudio] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const currentSession = useRef(null);
  const micQuiet = useRef(3000);
  const [rerender, setRerender] = useState(0);
  const selectedPrompt = useRef("");
  const interviewSettings = useRef({
    personalityOptions:[
      {
        label: "Empathetic",
        value: "empathetic and understanding",
        enabled: true,
      },
      {
        label: "Directive",
        value: "directive and solution-focused",
        enabled: false,
      },
      {
        label: "Reflective",
        value: "reflective and exploratory",
        enabled: false,
      },
      {
        label: "Holistic",
        value: "holistic and integrative",
        enabled: false,
      },
    ],
    questionTypes:[
      {
        label: "Emotional Well-being",
        value: "emotional-wellbeing",
        enabled: true,
      },
      {
        label: "Relationships",
        value: "relationships",
        enabled: true,
      },
      {
        label: "Stress Management",
        value: "stress-management",
        enabled: true,
      },
      {
        label: "Self-Esteem",
        value: "self-esteem",
        enabled: true,
      },
    ],
    confidentiality: true,
  });

  function resetPlaceholderPrompt() {
    sessionMessages.current = [
      {
        role: "welcome",
        content: "",
      },
    ];
    setRerender(rerender + 1);
  }

  useEffect(() => {
    fetch("/api/credentials").then((response) => {
      response.json().then((data) => {
        if (data.messages.length > 0) {
          sessionMessages.current = [introduction, ...data.messages];
          setRerender(rerender + 1);
        } else {
          resetPlaceholderPrompt();
        }
      });
    });
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.description}>
          <MediaStreamWrapper>
            {({ userMediaStream, setUserMediaStream }) => (
              <Console
                selectedPrompt={selectedPrompt}
                rerender={rerender}
                setRerender={setRerender}
                sessionMessages={sessionMessages}
                textInput={textInput}
                setTextInput={setTextInput}
                detectionSettings={detectionSettings}
                currentAudio={currentAudio}
                setCurrentAudio={setCurrentAudio}
                activityDetection={activityDetection}
                setActivityDetection={setActivityDetection}
                currentAIAudio={currentAIAudio}
                setCurrentAIAudio={setCurrentAIAudio}
                playQueue={playQueue}
                setPlayQueue={setPlayQueue}
                audioRefs={audioRefs}
                userMediaStream={userMediaStream}
                currentSession={currentSession}
                promptOpen={promptOpen}
                setPromptOpen={setPromptOpen}
                micQuiet={micQuiet}
                resetPlaceholderPrompt={resetPlaceholderPrompt}
                preprocessedJobDescription={preprocessedJobDescription}
                setPreprocessedJobDescription={setPreprocessedJobDescription}
                interviewSettings={interviewSettings}
              />
            )}
          </MediaStreamWrapper>
        </div>
      </main>
    </div>
  );
};


