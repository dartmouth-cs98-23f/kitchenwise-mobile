import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { initWhisper } from "whisper.rn";
import { useAssets } from "expo-asset";

import themeStyles from "../styles";
import { Button } from "../components/form_components";
import CommandRow from "../components/narration_components/CommandRow";

const transcriptionOptions = {
  language: "en",
  duration: 2500,
};

const cleanTranscription = (transcribedString) => {
  // from https://stackoverflow.com/a/4292483/
  transcribedString = transcribedString.replace(/ *\[[^)]*\] */g, "");
  transcribedString = transcribedString.replace(/ *\([^)]*\) */g, "");

  transcribedString = transcribedString.replace(".", "");
  transcribedString = transcribedString.replace(",", "");
  transcribedString = transcribedString.trim();
  return transcribedString;
};

const parseCommand = (rawCommand) => {
  let splitCommand = rawCommand.replace("add", "").trim().split(" of ");
  const quantity = splitCommand.length > 1 ? splitCommand.shift() : "";
  splitCommand = splitCommand[0].split(" to ");
  const location = splitCommand.length > 1 ? splitCommand.pop() : "";
  const name = splitCommand[0];

  return { quantity, name, location };
};

const NarrationPage = ({ navigation }) => {
  const [modelPath, setModelPath] = useState(null);
  const [spokenText, setSpokenText] = useState("");
  const [parsedCommands, setParsedCommands] = useState([]);
  useEffect(() => {
    const newParsedCommands = [];
    const rawCommands = spokenText.toLocaleLowerCase().split("add ");
    // remove empty first command
    rawCommands.shift();
    for (const rawCommand of rawCommands) {
      newParsedCommands.push(parseCommand(rawCommand));
    }
    console.log(newParsedCommands);
    setParsedCommands(newParsedCommands);
  }, [spokenText]);
  const [stopRecording, setStopRecording] = useState(() => {});
  const [isRecording, setIsRecording] = useState(false);
  const [whisperLoaded, setWhisperLoaded] = useState(false);
  const [assets, error] = useAssets([require("../assets/ggml-tiny.en.bin")]);
  useEffect(() => {
    if (error) {
      console.error(error);
    } else {
      if (assets?.[0]?.downloaded) {
        setModelPath(assets[0].localUri);
      }
    }
  }, [assets]);
  const onCancel = useCallback(() => {
    navigation.navigate("Pantry");
  }, []);
  const subscribeCallback = useCallback((evt) => {
    const { isCapturing, data, processTime, recordingTime } = evt;
    console.log(data);
    console.log(
      `Realtime transcribing: ${isCapturing ? "ON" : "OFF"}\n` +
        // The inference text result from audio record:
        `Result: ${data.result}\n\n` +
        `Process time: ${processTime}ms\n` +
        `Recording time: ${recordingTime}ms`
    );
    if (data.result && isCapturing)
      setSpokenText(cleanTranscription(data.result));
    if (!isCapturing) console.log("Finished realtime transcribing");
  }, []);
  useEffect(() => {
    if (modelPath) {
      initWhisper({
        filePath: modelPath,
      }).then((newContext) => {
        setWhisperLoaded(true);
        newContext
          .transcribeRealtime(transcriptionOptions)
          .then(({ stop, subscribe }) => {
            setStopRecording(() => stop);
            subscribe(subscribeCallback);
            setIsRecording(true);
          })
          .catch((err) => {
            console.error(err);
            setIsRecording(false);
          });
      });
    }
  }, [modelPath, setWhisperLoaded]);
  return (
    <SafeAreaView style={[themeStyles.components.screenContainer]}>
      <View style={styles.header}>
        <Text style={themeStyles.text.h2}>What do you want to add?</Text>
      </View>
      <View style={styles.transcribeContent}>
        {/* <Text>{spokenText}</Text> */}
        {parsedCommands.map(({ quantity, name, location }, i) => (
          <CommandRow
            quantity={quantity}
            name={name}
            location={location}
            key={i}
          />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {whisperLoaded ? (
          isRecording ? (
            stopRecording && (
              <Button
                text="Stop"
                onPress={() => {
                  stopRecording();
                  setIsRecording(false);
                }}
              />
            )
          ) : (
            <>
              <Button text="Confirm" containerStyle={styles.button} />
              <Button
                text="Cancel"
                containerStyle={styles.button}
                onPress={onCancel}
              />
            </>
          )
        ) : (
          <Text>Loading voice transcription...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 40,
  },
  buttonRow: {
    display: "inline-flex",
    flexDirection: "row",
  },
  button: {
    width: null,
    flexGrow: 1,
  },
  transcribeContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});

export default NarrationPage;
