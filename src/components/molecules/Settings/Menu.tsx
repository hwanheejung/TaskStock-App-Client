import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import ToggleSwitch from "../../atoms/ToggleSwitch";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const Menu = ({
  text,
  textColor,
  onPress,
  icon,
  toggle,
}: {
  text: string;
  textColor?: string;
  onPress?: () => void;
  icon?: {
    type:
      | "materialIcons"
      | "material"
      | "ionicons"
      | "feather"
      | "entypo"
      | "fontAwesome";
    name: string;
  };
  toggle?: {
    isEnabled: boolean;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSwitch: () => void;
  };
}) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress ? onPress : undefined} disabled={!onPress}>
      <FlexBox alignItems="center" gap={useResponsiveFontSize(16)}>
        {icon && (
          <IconsWithoutFeedBack
            type={icon.type}
            name={icon.name}
            size={spacing.gutter}
            color={theme.text}
          />
        )}
        <Text size="md" color={textColor ? textColor : theme.text}>
          {text}
        </Text>
      </FlexBox>
      {toggle ? (
        <ToggleSwitch
          isEnabled={toggle.isEnabled}
          setIsEnabled={toggle.setIsEnabled}
          toggleSwitch={toggle.toggleSwitch}
        />
      ) : (
        <IconsWithoutFeedBack
          type="materialIcons"
          name="chevron-right"
          size={spacing.gutter}
          color={theme.text}
        />
      )}
    </Container>
  );
};

export default Menu;
