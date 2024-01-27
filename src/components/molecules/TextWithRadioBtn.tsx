import React from "react";
import FlexBox from "../atoms/FlexBox";
import Text from "../atoms/Text";
import { Pressable } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";

export default function TextWithRadio({
  id,
  value,
  selectedId,
  onPressRadio,
}: {
  id: number | undefined | null;
  value: string;
  selectedId: number | null | undefined;
  onPressRadio: () => void;
}) {
  return (
    <Pressable onPress={onPressRadio}>
      <FlexBox alignItems="center">
        <RadioButton
          selected={selectedId === id}
          id={id + ""}
          onPress={onPressRadio}
        ></RadioButton>
        <Text size="md">{value}</Text>
      </FlexBox>
    </Pressable>
  );
}
