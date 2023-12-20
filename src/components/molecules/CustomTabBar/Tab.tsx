import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

interface ITab {
  isFocused: boolean;
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        children: string;
      }) => React.ReactNode);
  onPress: () => void;
  setToValue: (params: number) => void;
  setWidth: (params: number) => void;
}

const TabButton = styled.TouchableOpacity<{ isFocused: boolean }>`
  align-items: center;
  justify-content: center;
  padding: ${useResponsiveFontSize(12)}px ${useResponsiveFontSize(5)}px
    ${useResponsiveFontSize(7)}px;
`;

const TabText = styled.Text<{ isFocused: boolean }>`
  font-size: ${useResponsiveFontSize(20)}px;
  font-family: "bold";
  color: ${(props) =>
    props.isFocused ? props.theme.text : props.theme.textDim};
`;

const Tab: React.FC<ITab> = ({
  isFocused,
  label,
  onPress,
  setToValue,
  setWidth,
}) => {
  const [layout, setLayout] = useState<any>(null);
  useEffect(() => {
    if (isFocused && layout) {
      setToValue(layout.x);
      setWidth(layout.width);
    }
  }, [isFocused, layout, setToValue, setWidth]);

  const onLayout = (e: any) => {
    const { x, width } = e.nativeEvent.layout;
    setLayout({ x, width });
  };

  return (
    <TabButton isFocused={isFocused} onPress={onPress} onLayout={onLayout}>
      <TabText isFocused={isFocused}>
        {typeof label === "string" && label}
      </TabText>
    </TabButton>
  );
};
export default Tab;
