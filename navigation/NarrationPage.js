import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useCallback, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { initWhisper } from "whisper.rn";
import { useAssets } from "expo-asset";
import stringSimilarity from "string-similarity";

import themeStyles from "../styles";
import { Button } from "../components/form_components";
import CommandRow from "../components/narration_components/CommandRow";
import { addFoodItems } from "../api/fooditem-api";
import UserContext from "../context/user-context";
import InventoryContext from "../context/inventory-context";

const transcriptionOptions = {
  language: "en",
  duration: 2000,
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

const getBestMatch = (candidate, options) => {
  let best = [options[0], 0];
  for (const opt of options) {
    const comparison = stringSimilarity.compareTwoStrings(candidate, opt);
    if (comparison > best[1]) {
      best[0] = opt;
      best[1] = comparison;
    }
  }
  return best[0];
};

const parseCommand = (rawCommand, inventoryNames) => {
  let splitCommand = rawCommand.replace("add", "").trim().split(" of ");
  const quantity = splitCommand.length > 1 ? splitCommand.shift() : "";
  splitCommand = splitCommand[0].split(" to ");
  let location = splitCommand.length > 1 ? splitCommand.pop() : "";
  location = getBestMatch(location, inventoryNames);
  const name = splitCommand[0];

  return { quantity, name, location };
};

const NarrationPage = ({ navigation }) => {
  const { userId } = useContext(UserContext);
  const { userInventories } = useContext(InventoryContext);
  const [modelPath, setModelPath] = useState(null);
  const [spokenText, setSpokenText] = useState("");
  const [parsedCommands, setParsedCommands] = useState([
    { name: "pie", location: "my frige", quantity: "one slice" },
  ]);
  useEffect(() => {
    const newParsedCommands = [];
    const rawCommands = spokenText.toLocaleLowerCase().split("add ");
    // remove empty first command
    rawCommands.shift();
    for (const rawCommand of rawCommands) {
      newParsedCommands.push(
        parseCommand(
          rawCommand,
          userInventories.map((inv) => inv.title)
        )
      );
    }
    setParsedCommands(newParsedCommands);
  }, [spokenText, userInventories]);
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
  }, [navigation]);
  const onConfirm = useCallback(() => {
    console.log(parsedCommands);
    addFoodItems(userId, parsedCommands)
      .then(() => {
        // navigation.navigate("Pantry");
      })
      .catch(() => {});
  }, [parsedCommands, userId]);
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
  const updateCommand = useCallback(
    (i, newCommand) => {
      setParsedCommands((prev) => {
        prev[i] = newCommand;
        return prev;
      });
    },
    [setParsedCommands]
  );
  const deleteCommand = useCallback(
    (i) => {
      setParsedCommands((prev) => {
        prev.splice(i, 1);
        return prev;
      });
    },
    [setParsedCommands]
  );

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
            locationNames={userInventories.map((inv) => inv.title)}
            onItemChange={(newItem) => updateCommand(i, newItem)}
            onDelete={() => deleteCommand(i)}
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
                containerStyle={styles.button}
              />
            )
          ) : (
            <>
              <Button
                text="Cancel"
                containerStyle={styles.button}
                onPress={onCancel}
              />
              <Button
                text="Confirm"
                containerStyle={styles.button}
                onPress={onConfirm}
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
