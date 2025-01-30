import { useAppSelector } from "@/redux/app/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import {
  useCurrentUserUpdateMutation,
  useGetCurrentUserQuery,
} from "@/redux/services/auth";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");

export default function UserAnimated() {
  const flatListRef = useRef<FlatList<{ key: string }>>(null);
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    gender: 1,
    dateOfBirth: new Date(),
  });

  const [renderList, setRenderList] = useState<string[]>([]);
  const currentUser = useAppSelector((state) => state.auth.curentUser);

  const [currentUserUpdate] = useCurrentUserUpdateMutation();

  useEffect(() => {
    const missingFields = ["name", "surname", "gender", "dateOfBirth"].filter(
      (field) => !currentUser[field]
    );
    setRenderList(missingFields);
  }, []);

  const handleNext = () => {
    if (currentIndex < renderList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const renderFlatList = (renderName: string) => {
    switch (renderName) {
      case "name":
        return (
          <View
            style={{
              justifyContent: "center",
              height: "70%",
            }}
          >
            <KeyboardAvoidingView
              style={{
                justifyContent: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  padding: 20,
                  width: width - 20,
                  gap: 50,
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "left",
                    }}
                  >
                    {t("set_your_name")}
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={t("enter_your_name")}
                    value={profile.name}
                    onChangeText={(text) =>
                      setProfile({ ...profile, name: text })
                    }
                    placeholderTextColor="#B0B0B0"
                    autoFocus
                    autoCapitalize="words"
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        );
      case "surname":
        return (
          <View
            style={{
              justifyContent: "center",
              height: "70%",
            }}
          >
            <KeyboardAvoidingView
              style={{
                justifyContent: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  padding: 20,
                  width: width - 20,
                  gap: 50,
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "left",
                    }}
                  >
                    {t("set_your_surname")}
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={t("enter_your_surname")}
                    value={profile.surname}
                    onChangeText={(text) =>
                      setProfile({ ...profile, surname: text })
                    }
                    placeholderTextColor="#B0B0B0"
                    autoFocus
                    autoCapitalize="words"
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        );
      case "gender":
        return (
          <View
            style={{
              justifyContent: "center",
              height: "70%",
              gap: 50,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {t("select_your_gender")}
              </Text>
            </View>

            <View style={styles.genderContainer}>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 10,
                    borderColor: profile.gender === 1 ? "#3C69EA" : "gray",
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  onPress={() => setProfile({ ...profile, gender: 1 })}
                >
                  <MaterialIcons
                    name="male"
                    size={52}
                    color={profile.gender === 1 ? "#3C69EA" : "gray"}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {t("male")}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 10,
                    borderColor: profile.gender === 2 ? "#ED409A" : "gray",
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  onPress={() => setProfile({ ...profile, gender: 2 })}
                >
                  <MaterialIcons
                    name="female"
                    size={52}
                    color={profile.gender === 2 ? "#ED409A" : "gray"}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {t("female")}
                </Text>
              </View>
            </View>
          </View>
        );
      case "dateOfBirth":
        return (
          <View
            style={{
              justifyContent: "center",
              height: "70%",
              gap: 50,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {t("select_your_birthday")}
            </Text>

            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333",
                  //   textAlign: "center",
                }}
              >
                {profile.dateOfBirth.toDateString()}
              </Text>

              <DateTimePicker
                value={profile.dateOfBirth}
                mode="date"
                display="spinner"
                onChange={(event, date) => {
                  if (date) setProfile({ ...profile, dateOfBirth: date });
                }}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const handleSubmitPress = async () => {
    try {
      const result = await currentUserUpdate({
        name: renderList.includes("name") ? profile.name : currentUser.name,
        surname: renderList.includes("surname")
          ? profile.surname
          : currentUser.surname,
        gender: renderList.includes("gender")
          ? profile.gender
          : currentUser.gender,
        dateOfBirth: renderList.includes("dateOfBirth")
          ? profile.dateOfBirth
          : currentUser.birthDate,
        selectedLanguage: currentUser.selectedLanguage,
      });
      if (!result?.data?.isSuccessful) {
        console.log("result", result);
        const errorMessage =
          result?.error &&
          "data" in result.error &&
          Array.isArray((result.error as any).data.errors)
            ? (result.error as any).data.errors[0]
            : t("an_error_occurred_while_completing_user_info");
        showToast("error", errorMessage);
        return;
      }

      showToast("success", t("user_info_completed_successfully"));
      useGetCurrentUserQuery();
      setTimeout(() => router.push("/(tabs)"), 2000);
    } catch (error) {
      showToast("error", t("an_error_occurred_while_completing_user_info"));
      console.log("error", error);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      position: "bottom",
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 50,
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={renderList.map((item) => ({ key: item }))}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <LinearGradient colors={["#AECDB0", "#E8F5E9"]} style={styles.page}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={handlePrev}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  height: 40,
                }}
              >
                {currentIndex > 0 && (
                  <>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {t("preverius_step")}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {renderFlatList(item.key)}

            {currentIndex < renderList.length - 1 ? (
              <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>{t("next_step")}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSubmitPress}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t("complete_info")}</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginTop: 30,
              }}
            >
              {renderList.map((item, index) => (
                <Text key={index}>
                  <MaterialIcons
                    name="circle"
                    size={13}
                    color={index === currentIndex ? "green" : "gray"}
                  />
                </Text>
              ))}
            </View>
          </LinearGradient>
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  progressBar: {
    height: 10,
    marginVertical: 10,
  },
  page: {
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 20,
    color: "#555",
    textDecorationLine: "underline",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 60,
    // marginTop: 20,
  },

  button: {
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: "90%",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
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
