import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { initWhisper } from "whisper.rn";
import { useAssets } from "expo-asset";

import themeStyles from "../styles";
import { Button } from "../components/form_components";

const NarrationPage = () => {
  const [modelPath, setModelPath] = useState(null);
  const [spokenText, setSpokenText] = useState();
  const appendText = useCallback(
    (newText) => {
      setSpokenText((prev) => prev + newText);
    },
    [setSpokenText]
  );
  const [stopRecording, setStopRecording] = useState(() => {});
  const [isRecording, setIsRecording] = useState(false);
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
  const subscribeCallback = useCallback((evt) => {
    console.log("sub callback");
    const { isCapturing, data, processTime, recordingTime } = evt;
    console.log(
      `Realtime transcribing: ${isCapturing ? "ON" : "OFF"}\n` +
        // The inference text result from audio record:
        `Result: ${data.result}\n\n` +
        `Process time: ${processTime}ms\n` +
        `Recording time: ${recordingTime}ms`
    );
    if (data.result)
      appendText(data.result.replace("[BLANK_AUDIO]", "").trim());
    if (!isCapturing) console.log("Finished realtime transcribing");
  }, []);
  useEffect(() => {
    if (modelPath) {
      initWhisper({
        filePath: modelPath,
      }).then((newContext) => {
        newContext
          .transcribeRealtime({ language: "en" })
          .then(({ stop, subscribe }) => {
            setStopRecording(() => stop);
            subscribe(subscribeCallback);
            setIsRecording(true);
          });
      });
    }
  }, [modelPath]);
  //   const { stop, subscribe } = await whisperContext.transcribeRealtime(options)

  // subscribe(evt => {
  //   const { isCapturing, data, processTime, recordingTime } = evt
  //   console.log(
  //     `Realtime transcribing: ${isCapturing ? 'ON' : 'OFF'}\n` +
  //       // The inference text result from audio record:
  //       `Result: ${data.result}\n\n` +
  //       `Process time: ${processTime}ms\n` +
  //       `Recording time: ${recordingTime}ms`,
  //   )
  //   if (!isCapturing) console.log('Finished realtime transcribing')
  // })
  return (
    <SafeAreaView style={[themeStyles.components.screenContainer]}>
      <Text style={themeStyles.text.h2}>What do you want to add?</Text>
      <View style={styles.transcribeContent}>
        <Text>{spokenText}</Text>
      </View>
      <View style={styles.buttonRow}>
        {stopRecording && (
          <Button
            text="Stop"
            onPress={() => {
              stopRecording();
              setIsRecording(false);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    display: "inline-flex",
  },
  transcribeContent: {
    flexGrow: 1,
  },
});

export default NarrationPage;
