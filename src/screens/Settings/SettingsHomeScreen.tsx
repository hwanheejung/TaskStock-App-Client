import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PageHeader from "../../components/molecules/PageHeader";
import Menu from "../../components/molecules/Settings/Menu";
import { palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { checkStorage } from "../../utils/asyncStorage";
import { logout } from "../../utils/authUtils/signInUtils";
import { resetNavigation } from "../../utils/resetNavigation";

const Container = styled.View`
  flex: 1;
  padding: 0 ${spacing.offset}px;
`;

const SettingsHomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelect((state) => state.auth.isLoggedIn);

  const handleLogout = async () => {
    await dispatch(logout());
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      resetNavigation(navigation);
    }
  }, [isLoggedIn, navigation]);

  const redux_auth = useAppSelect((state) => state.auth);
  const redux_user = useAppSelect((state) => state.user);
  const checkRedux = () => {
    console.log("=====redux=====");
    console.log(redux_auth);
    console.log(redux_user);
  };

  // 푸시알림
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => {
    // dispatch 푸시알림
  };

  return (
    <>
      <PageHeader title="설정" />
      <Container>
        <Menu
          text="계정 설정"
          onPress={() => navigation.navigate("SettingsAccount")}
          icon={{ type: "materialIcons", name: "account-circle" }}
        />
        <Menu
          text="푸시알림 켜기"
          icon={{ type: "material", name: "bell" }}
          toggle={{ isEnabled, setIsEnabled, toggleSwitch }}
        />
        <Menu
          text="테마 변경"
          onPress={() => navigation.navigate("SettingsTheme")}
          icon={{ type: "ionicons", name: "color-palette" }}
        />
        <Menu
          text="고객센터"
          onPress={() => {}}
          icon={{ type: "material", name: "headset" }}
        />
        <Menu
          text="정보"
          onPress={() => {}}
          icon={{ type: "ionicons", name: "information-circle" }}
        />
        <Menu text="로그아웃" onPress={handleLogout} textColor={palette.red} />
        <Menu text="asyncStorage check" onPress={checkStorage} />
        <Menu text="redux check" onPress={checkRedux} />
      </Container>
    </>
  );
};

export default SettingsHomeScreen;
