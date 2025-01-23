import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useGetCurrentUserQuery } from "@/redux/services/auth";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { set } from "zod";

const ProfileSettingsScreen = () => {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    data: getProfileInfo,
    isLoading: getProfileInfoIsLoading,
    isSuccess: getProfileInfoIsSuccess,
    isError: getProfileInfoIsError,
    isFetching: getProfileInfoIsFetching,
    refetch: refetchProfileInfo,
  } = useGetCurrentUserQuery();

  const [profile, setProfile] = useState({
    name: getProfileInfo?.data?.name || "belirtilmedi",
    surname: getProfileInfo?.data?.surname || "belirtilmedi",
    phone: getProfileInfo?.data?.phoneNumber || "belirtilmedi",
    birthday: getProfileInfo?.data?.dateOfBirth || "belirtilmedi",
    country: getProfileInfo?.data?.phoneCountryId || "belirtilmedi",
    email: getProfileInfo?.data?.email || "belirtilmedi",
    gender: getProfileInfo?.data.gender || "belirtilmedi",
    profilePictureUrl: getProfileInfo?.data.profilePictureUrl || "",
    subscriptionStatus: getProfileInfo?.data.subscriptionStatus,
  });

  const [bottomSheetContent, setBottomSheetContent] = useState("");

  const reFetchProfile = async () => {
    try {
      const result = await refetchProfileInfo();
      if (!result.data?.isSuccessful) {
        console.log("error", result.error);
        return;
      }
      const data = result.data.data;
      setProfile({
        name: data.name || "belirtilmedi",
        surname: data.surname || "belirtilmedi",
        phone: data.phoneNumber || "belirtilmedi",
        birthday: data.dateOfBirth || "belirtilmedi",
        country: data.phoneCountryId || "belirtilmedi",
        email: data.email || "belirtilmedi",
        gender: data.gender || "belirtilmedi",
        profilePictureUrl: data.profilePictureUrl || "",
        subscriptionStatus: data.subscriptionStatus || 0,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      reFetchProfile();
    }
  }, []);

  const handleAppyBottomSheetPress = () => {
    bottomSheetRef.current?.close();
  };

  const renderName = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{t("name")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_your_name")}
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );

  const renderPhone = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{t("phone")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_your_phone")}
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );

  const renderEmail = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{t("email")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_your_email")}
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );

  const renderBirthday = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{t("birthday")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_your_birthday")}
        value={profile.birthday}
        onChangeText={(text) => setProfile({ ...profile, birthday: text })}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );

  const renderGender = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>gender</Text>
      <TextInput
        style={styles.input}
        placeholder="enter your"
        value=""
        onChangeText={(text) => setProfile({ ...profile, gender: text })}
        placeholderTextColor="#B0B0B0"
      />
    </View>
  );

  const renderBottomSheetContent = () => {
    switch (bottomSheetContent) {
      case "name":
        return renderName();
      case "phone":
        return renderPhone();
      case "email":
        return renderEmail();
      case "birthday":
        return renderBirthday();
      case "gender":
        return renderGender();
      default:
        return null;
    }
  };

  const handleProfileUpdatePress = async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MaterialIcons name="chevron-left" size={24} color="#588157" />
              <Text style={styles.headerText}>{t("return_to_settings")}</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </View>
          {getProfileInfoIsLoading ? (
            <Text>Loading...</Text>
          ) : getProfileInfoIsError ? (
            <Text>Error..</Text>
          ) : getProfileInfoIsSuccess ? (
            <ScrollView style={styles.container}>
              {/* Profile Picture */}
              <TouchableOpacity style={styles.profilePictureContainer}>
                <Image
                  source={{
                    uri:
                      (profile.profilePictureUrl as string) ||
                      "https://via.placeholder.com/150",
                  }}
                  style={styles.profilePicture}
                />
                <TouchableOpacity style={styles.editIcon}>
                  <MaterialIcons name="camera-alt" size={20} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Personal Information */}
              <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
              <View style={styles.infoCard}>
                {renderInfoItem(
                  "Name",
                  profile.name,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
                {renderInfoItem(
                  "Phone",
                  profile.phone,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
                {renderInfoItem(
                  "Email",
                  profile.email,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
                {renderInfoItem(
                  "Birthday",
                  profile.birthday,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
                {renderInfoItem(
                  "gender",
                  profile.gender as string,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
                {renderInfoItem(
                  "Country",
                  profile.country as string,
                  handlePresentModalPress,
                  setBottomSheetContent
                )}
              </View>

              {/* Login Information */}
              <Text style={styles.sectionTitle}>Subscrieber Information</Text>
              <View style={styles.infoCard}>
                {/* {renderInfoItem(
                  "Subscription Status",
                  profile.subscriptionStatus === 1 ? "Premium" : "Free",
                  handlePresentModalPress,
                  setBottomSheetContent
                )} */}
                <View style={styles.socialAccountItem}>
                  <Text style={styles.socialAccountLabel}>
                    Subscription Status
                  </Text>
                  <Text style={styles.socialAccountStatus}>
                    {profile.subscriptionStatus === 1 ? "Premium" : "Free"}
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : null}
          <BottomSheetModal
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing
            containerStyle={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <BottomSheetView
              style={{
                padding: 16,
              }}
            >
              {renderBottomSheetContent()}

              <TouchableOpacity
                onPress={() => {
                  handleAppyBottomSheetPress();
                  handleProfileUpdatePress();
                }}
              >
                <LinearGradient
                  colors={["green", "#80B900"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.applyButton}
                  key={"save"}
                >
                  <Text style={styles.applyText}>{t("save")}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const renderInfoItem = (
  label: string,
  value: string,
  handlePresentModalPress: () => void,
  setBottomSheetContent: (label: string) => void
) => (
  <TouchableOpacity
    style={styles.infoItem}
    onPress={() => {
      handlePresentModalPress();
      setBottomSheetContent(label.toLowerCase());
    }}
  >
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={styles.infoValue}>{value}</Text>
      <MaterialIcons name="chevron-right" size={20} color="#ccc" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#588157",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 16,
    marginBottom: 8,
  },
  infoCard: {
    // backgroundColor: "#fff",
    // borderRadius: 8,
    // padding: 12,
    // marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 16,
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#888",
  },
  socialAccountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  socialAccountLabel: {
    fontSize: 16,
    color: "#333",
  },
  socialAccountStatus: {
    fontSize: 16,
    color: "#007bff",
    flex: 1,
    textAlign: "right",
    marginRight: 12,
  },
  applyButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,

    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  applyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    color: "#333",
  },
});

export default ProfileSettingsScreen;
