import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  Button,
  Animated,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  TextInput,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useCreateHabitMutation, useHabitGetByIdQuery } from "@/redux/services/habit";
import { selectToken } from "@/redux/reducers/auth-reducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { IHabitCreate } from "@/types/habit";
import { useLocalSearchParams } from "expo-router"

const { width } = Dimensions.get("screen");

const CustomModal = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList<{ key: string }>>(null);
  const [activeTab, setActiveTab] = useState(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [bottomSheetContent, setBottomSheetContent] = useState("");
  const [activeTabSheetRepetition, setActiveTabSheetRepetition] =
    useState("daily");
  const [activeTabSheetDuration, setActiveTabSheetDuration] =
    useState("startTime");

  const [form, setForm] = useState({
    name: "",
    description: "",
    isReminder: false,
    icon: "🏃",
    color: "#28B463",
    periodType: 1,
    periodCount: 1,
    startTime: { hour: "00", minute: "00" } as { hour: string; minute: string },
    endTime: { hour: "00", minute: "00" } as { hour: string; minute: string },
    daysOfWeeks: [] as { dayOfWeek: number }[],
    daysOfMonthly: [] as { dayOfMonth: number }[],
  });

  const [draft, setDraft] = useState({
    name: "",
    description: "",
    isReminder: false,
    icon: "🏃",
    color: "#28B463",
    periodType: 1,
    periodCount: 1,
    startTime: { hour: "00", minute: "00" } as { hour: string; minute: string },
    endTime: { hour: "00", minute: "00" } as { hour: string; minute: string },
    daysOfWeeks: [] as { dayOfWeek: number }[],
    daysOfMonthly: [] as { dayOfMonth: number }[],
  });

  const [createHabit] = useCreateHabitMutation();


  const token = useSelector((state: RootState) => selectToken(state));
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  console.log("params", params.id);

  const {
    data: habitGetById,
    error: errorHabitGetById,
    isLoading: isLoadingHabitGetById,
    isSuccess: isSuccessHabitGetById,
    refetch: refetchHabitGetById,
  } = useHabitGetByIdQuery(params.id as string);

  const { width, height } = Dimensions.get("screen");

  const tabs = ["stageOne", "stageTwo"];

  const selectedHabitgetById = async (id: string) => {
    try {
      const response = await refetchHabitGetById();

      if (response?.data?.isSuccessful) {

        const habitData = response.data.data;
        setForm({
          name: habitData.name,
          description: habitData.description,
          isReminder: habitData.isReminder,
          icon: habitData.details.icon,
          color: habitData.details.color,
          periodType: habitData.details.periodType,
          periodCount: habitData.details.periodCount,
          startTime: {
            hour: habitData.details.startTime?.split(":")[0] || "00",
            minute: habitData.details.startTime?.split(":")[1] || "00",
          },
          endTime: {
            hour: habitData.details.endTime?.split(":")[0] || "00",
            minute: habitData.details.endTime?.split(":")[1] || "00",
          },
          daysOfWeeks: habitData.details.daysOfWeeks || [],
          daysOfMonthly: habitData.details.daysOfMonthly || [],
        });
        setDraft({
          name: habitData.name,
          description: habitData.description,
          isReminder: habitData.isReminder,
          icon: habitData.details.icon,
          color: habitData.details.color,
          periodType: habitData.details.periodType,
          periodCount: habitData.details.periodCount,
          startTime: {
            hour: habitData.details.startTime?.split(":")[0] || "00",
            minute: habitData.details.startTime?.split(":")[1] || "00",
          },
          endTime: {
            hour: habitData.details.endTime?.split(":")[0] || "00",
            minute: habitData.details.endTime?.split(":")[1] || "00",
          },
          daysOfWeeks: habitData.details.daysOfWeeks || [],
          daysOfMonthly: habitData.details.daysOfMonthly || [],
        });
      }

    } catch (error) {
      console.log("habitGetById error", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      setActiveTab(1);
      selectedHabitgetById(params.id as string);
    }
  }, [params.id]);





  const handleTabPress = (index: number) => {
    flatListRef.current?.scrollToOffset({ offset: index * width });
    setActiveTab(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.x === 0) {
      setActiveTab(0);
      setForm({
        name: "",
        description: "",
        isReminder: false,
        icon: "🏃",
        color: "#28B463",
        periodType: 1,
        periodCount: 1,
        startTime: { hour: "00", minute: "00" } as {
          hour: string;
          minute: string;
        },
        endTime: { hour: "00", minute: "00" } as {
          hour: string;
          minute: string;
        },
        daysOfWeeks: [] as { dayOfWeek: number }[],
        daysOfMonthly: [] as { dayOfMonth: number }[],
      });
      setDraft({
        name: "",
        description: "",
        isReminder: false,
        icon: "🏃",
        color: "#28B463",
        periodType: 1,
        periodCount: 1,
        startTime: { hour: "00", minute: "00" } as {
          hour: string;
          minute: string;
        },
        endTime: { hour: "00", minute: "00" } as {
          hour: string;
          minute: string;
        },
        daysOfWeeks: [] as { dayOfWeek: number }[],
        daysOfMonthly: [] as { dayOfMonth: number }[],
      });
    }
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // console.log("token", token);
  const handleSaveChanges = async () => {
    console.log("token", token);
    const habitData: IHabitCreate = {
      name: form.name,
      description: form.description,
      isReminder: form.isReminder,
      details: {
        color: form.color || "#28B463",
        icon: form.icon || "🏃",
        periodType: form.periodType,
        periodCount: form.periodCount,
        startTime: `${form.startTime.hour.padStart(
          2,
          "0"
        )}:${form.startTime.minute.padStart(2, "0")}:00`,
        endTime: `${form.endTime.hour.padStart(
          2,
          "0"
        )}:${form.endTime.minute.padStart(2, "0")}:00`,
      },
    };

    if (form.periodType === 2) {
      habitData.details.daysOfWeeks = form.daysOfWeeks;
    }

    if (form.periodType === 3) {
      habitData.details.daysOfMonthly = form.daysOfMonthly;
    }

    console.log("habitData", JSON.stringify(habitData));

    createHabit(habitData)
      .then((response) => {
        if (response?.data?.isSuccessful) {
          console.log("Alışkanlık başarıyla oluşturuldu!", response.data);
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Alışkanlık başarıyla oluşturuldu!",
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          console.log("alışkanlık oluşturma başarısız then", response);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Alışkanlık oluşturulurken hata oluştu",
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
        }
      })
      .catch((error) => {
        console.log("alışkanlık oluşturma başarısız catch", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Alışkanlık oluşturulurken hata oluştu",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });
      });
  };

  const stageOne = () => {
    return (
      <View style={styles.screen}>
        <LinearGradient
          colors={["#AECDB0", "#E8F5E9"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          key={"stageOne"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <MaterialIcons name="close" size={30} color="#588157" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{ padding: 20, alignItems: "center", flex: 1, gap: 20 }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                  color: "#588157",
                }}
              >
                Choose a habit
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#7D7D7D",
                }}
              >
                Create a custom habit made just for you
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                padding: 20,
                gap: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#588157",
                }}
              >
                Custom
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 15,
                  width: "100%",
                }}
                onPress={() => {
                  handleTabPress(1);
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "#588157", fontWeight: "500" }}
                >
                  Create a custom habit
                </Text>
                <MaterialIcons
                  name="add-circle-outline"
                  size={34}
                  color="green"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                // padding: 20,
                gap: 12,
              }}
            >
              {defaultHabitsCreate.map((category) => (
                <View key={category.category}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#588157",
                      // padding: 20,
                      paddingInline: 20,
                    }}
                  >
                    {category.category}
                  </Text>
                  <View style={[styles.colorContainer, { paddingLeft: 20 }]}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={[
                        styles.colorScrollView,
                        {
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          gap: 10,
                        },
                      ]}
                    >
                      {category.habits.map((habit) => (
                        <TouchableOpacity
                          key={habit.name}
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                            paddingVertical: 20,
                            paddingHorizontal: 5,
                            backgroundColor: "#FFFFFF",
                            opacity: 0.8 + Math.random() * 0.2,
                            justifyContent: "space-around",
                            borderRadius: 15,
                            gap: 10,
                            width: 100,
                            height: 120,
                          }}
                          onPress={() => {
                            handleTabPress(1);
                            setForm({
                              ...form,
                              name: habit.name,
                              icon: habit.icon,
                              color: "#28B463",
                              description: habit.description,
                            });
                            setDraft({
                              ...draft,
                              name: habit.name,
                              icon: habit.icon,
                              color: "#28B463",
                              description: habit.description,
                            });
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontSize: 40,
                                color: "#588157",
                                fontWeight: "500",
                              }}
                            >
                              {habit.icon}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#588157",
                              fontWeight: "500",
                            }}
                          >
                            {habit.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    // setDraft(form);
  }, []);

  const stageTwo = () => {
    return (
      <View style={styles.screen}>
        <LinearGradient
          colors={["#AECDB0", "#E8F5E9"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          key={"stageTwo"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleTabPress(0);
                setForm({
                  name: "",
                  description: "",
                  isReminder: false,
                  icon: "🏃",
                  color: "#28B463",
                  periodType: 1,
                  periodCount: 1,
                  startTime: { hour: "00", minute: "00" },
                  endTime: { hour: "00", minute: "00" },
                  daysOfWeeks: [] as { dayOfWeek: number }[],
                  daysOfMonthly: [] as { dayOfMonth: number }[],
                });
                setDraft({
                  name: "",
                  description: "",
                  isReminder: false,
                  icon: "🏃",
                  color: "#28B463",
                  periodType: 1,
                  periodCount: 1,
                  startTime: { hour: "00", minute: "00" },
                  endTime: { hour: "00", minute: "00" },
                  daysOfWeeks: [] as { dayOfWeek: number }[],
                  daysOfMonthly: [] as { dayOfMonth: number }[],
                });
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MaterialIcons name="chevron-left" size={30} color="#588157" />
              <Text style={{ color: "#588157" }}>Geri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <MaterialIcons name="close" size={30} color="#588157" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, width: width }}>
            <View style={{ width: "100%", padding: 20, alignItems: "center" }}>
              {/* cart */}
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 5,
                  backgroundColor: `${form.color || "#28B463"}`,
                  opacity: 0.8,
                  justifyContent: "space-around",
                  borderRadius: 15,
                  width: 110,
                  height: 120,
                  gap: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 50,
                      color: "#588157",
                      fontWeight: "500",
                    }}
                  >
                    {form.icon}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffffff",
                    fontWeight: "500",
                  }}
                >
                  {form.name}
                </Text>
              </View>
            </View>
            {/* details container */}
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 20,
                  color: "#588157",
                }}
              >
                Habit Details
              </Text>
              <Text
                style={{
                  color: "#7D7D7D",
                  fontSize: 10,
                }}
              >
                Customize your habit details
              </Text>
            </View>
            {/* icon & color */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: 60,
                flex: 1,
                gap: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheetContent("icon");
                    handlePresentModalPress();
                  }}
                >
                  <Text
                    style={{
                      padding: 5,
                      borderRadius: 15,
                      backgroundColor: "gray",
                      fontSize: 30,
                      color: "#588157",
                      fontWeight: "500",
                      position: "relative",
                      left: 55,
                      top: 15,
                      zIndex: 1,
                      width: 30,
                    }}
                  >
                    <MaterialIcons
                      name="compare-arrows"
                      size={20}
                      color="white"
                    />
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",

                      backgroundColor: "#F0F0F0",
                      borderRadius: 10,
                      width: 70,
                      height: 80,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "#588157",
                        fontWeight: "500",
                      }}
                    >
                      {form.icon}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#588157",
                    fontWeight: "bold",
                  }}
                >
                  Icon
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheetContent("color");
                    handlePresentModalPress();
                  }}
                >
                  <Text
                    style={{
                      padding: 5,
                      borderRadius: 15,
                      backgroundColor: "gray",
                      fontSize: 30,
                      color: "#588157",
                      fontWeight: "500",
                      position: "relative",
                      left: 55,
                      top: 15,
                      zIndex: 1,
                      width: 30,
                    }}
                  >
                    <MaterialIcons
                      name="compare-arrows"
                      size={20}
                      color="white"
                    />
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      backgroundColor: `${form.color || "#FFFFFF"}`,
                      borderRadius: 10,
                      width: 70,
                      height: 80,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 50,
                        color: "#588157",
                        fontWeight: "500",
                      }}
                    ></Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#588157",
                    fontWeight: "bold",
                  }}
                >
                  Color
                </Text>
              </View>
            </View>
            {/* other informations */}
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
              {["name", "description"].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionRow}
                  onPress={() => {
                    handlePresentModalPress();
                    setBottomSheetContent(item);
                  }}
                >
                  <Text style={styles.optionLabel}>{t(`${item}`)}</Text>
                  <Text style={styles.optionValue}>
                    {{
                      name: form.name,
                      description: form.description,
                    }[item] || "Belirlenmemiş"}
                  </Text>
                </TouchableOpacity>
              ))}
              <View
                style={{
                  flexDirection: "row",

                  flex: 1,
                  gap: 20,
                }}
              >
                {["repetition", "duration"].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    // style={styles.optionRow}
                    style={{
                      flexDirection: "column",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "lightgray",
                      width: "50%",
                      gap: 8,
                    }}
                    onPress={() => {
                      handlePresentModalPress();
                      setBottomSheetContent(item);
                    }}
                  >
                    <Text style={styles.optionLabel}>{t(`${item}`)}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionValue}>
                        {item === "repetition"
                          ? activeTabSheetRepetition === "daily"
                            ? "Günlük"
                            : activeTabSheetRepetition === "weekly"
                              ? "Haftalık"
                              : "Aylık"
                          : item === "duration"
                            ? activeTabSheetDuration === "startTime"
                              ? `${form.startTime.hour.padStart(
                                2,
                                "0"
                              )}:${form.startTime.minute.padStart(2, "0")}`
                              : `${form.startTime.hour.padStart(
                                2,
                                "0"
                              )}:${form.startTime.minute.padStart(
                                2,
                                "0"
                              )} - ${form.endTime.hour.padStart(
                                2,
                                "0"
                              )}:${form.endTime.minute.padStart(2, "0")}`
                            : "Belirlenmemiş"}
                      </Text>
                      <Text style={styles.optionValue}>
                        <MaterialIcons name="arrow-drop-down" size={20} />
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Hatırlatıcı */}
              <View style={styles.reminderRow}>
                <Text style={styles.optionLabel}>{t("reminder")}</Text>
                <Switch
                  value={form.isReminder}
                  onValueChange={(value) => {
                    setForm({ ...form, isReminder: value });
                    setDraft({ ...draft, isReminder: value });
                  }}
                />
              </View>
            </View>
            {/* Kaydet Butonu */}
            <LinearGradient
              colors={["green", "#80B900"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyButton}
              key={"apply-1"}
            >
              <TouchableOpacity
                onPress={handleSaveChanges}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="check" size={24} color="#FFFFFF" />
                <Text style={styles.applyText}>Değişikleri Kaydet</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetContent) {
      case "repetition":
        return renderRepetition();
      case "duration":
        return renderDuration();
      case "name":
        return renderName();
      case "description":
        return renderDescription();
      case "icon":
        return renderIcon();
      case "color":
        return renderColor();
      default:
        return null;
    }
  };

  const renderDaily = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Her
        </Text>
        <Picker
          selectedValue={draft.periodCount.toString()}
          onValueChange={(itemValue) =>
            setDraft({ ...draft, periodCount: Number(itemValue) })
          }
          style={{ width: 100 }}
          mode="dropdown"
          itemStyle={{ color: "black" }}
          accessibilityLabel="periodCount"
        >
          {Array.from({ length: 6 }, (_, i) => (i + 1).toString()).map(
            (day) => (
              <Picker.Item key={day} label={day} value={day} />
            )
          )}
        </Picker>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          gün
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: "#333",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {draft.periodCount} gün boyunca her gün tekrarla
      </Text>
    </View>
  );

  const handleDayPress = (dayIndex: number) => {
    setDraft((prevDraft) => {
      const isDaySelected = prevDraft.daysOfWeeks.some(
        (day) => day?.dayOfWeek === dayIndex
      );

      return {
        ...prevDraft,
        daysOfWeeks: isDaySelected
          ? prevDraft.daysOfWeeks.filter((day) => day?.dayOfWeek !== dayIndex)
          : [...prevDraft.daysOfWeeks, { dayOfWeek: dayIndex }],
      };
    });
  };

  const handleDayOfMonthPress = (dayIndex: number) => {
    setDraft((prevDraft) => {
      const isDaySelected = prevDraft.daysOfMonthly.some(
        (day) => day?.dayOfMonth === dayIndex
      );

      return {
        ...prevDraft,
        daysOfMonthly: isDaySelected
          ? prevDraft.daysOfMonthly.filter(
            (day) => day?.dayOfMonth !== dayIndex
          )
          : [...prevDraft.daysOfMonthly, { dayOfMonth: dayIndex }],
      };
    });
  };

  const renderWeekly = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Her
        </Text>
        <Picker
          selectedValue={draft.periodCount.toString()}
          onValueChange={(itemValue) =>
            setDraft({ ...draft, periodCount: Number(itemValue) })
          }
          style={{ width: 100 }}
          mode="dropdown"
          itemStyle={{ color: "black" }}
          accessibilityLabel="periodCount"
        >
          {Array.from({ length: 4 }, (_, i) => (i + 1).toString()).map(
            (day) => (
              <Picker.Item key={day} label={day} value={day} />
            )
          )}
        </Picker>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Hafta
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Hangi günler tekrarlasın?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(
            (day, index) => (
              <Pressable
                key={day}
                onPress={() => handleDayPress(index)}
                style={{
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 5,
                  backgroundColor: draft.daysOfWeeks.some(
                    (selectedDay) => selectedDay?.dayOfWeek === index
                  )
                    ? "#D1E7DD"
                    : "#F0F0F0",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 10,
                  }}
                >
                  {day}
                </Text>
              </Pressable>
            )
          )}
        </View>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: "#333",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {draft.periodCount} haftada bir seçtiğiniz gün(ler)de tekrarla
      </Text>
    </View>
  );

  const renderMonthly = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Her
        </Text>
        <Picker
          selectedValue={draft.periodCount.toString()}
          onValueChange={(itemValue) =>
            setDraft({ ...draft, periodCount: Number(itemValue) })
          }
          style={{ width: 100 }}
          mode="dropdown"
          itemStyle={{ color: "black" }}
          accessibilityLabel="periodCount"
        >
          {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map(
            (day) => (
              <Picker.Item key={day} label={day} value={day} />
            )
          )}
        </Picker>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Ay
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#333",
            marginBottom: 10,
          }}
        >
          Hangi günler tekrarlasın?
        </Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day, index) => (
            <Pressable
              key={day}
              onPress={() => handleDayOfMonthPress(index)}
              style={{
                borderRadius: 10,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                backgroundColor: draft.daysOfMonthly.some(
                  (selectedDay) => selectedDay?.dayOfMonth === index
                )
                  ? "#D1E7DD"
                  : "#F0F0F0",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 10,
                }}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: "#333",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {draft.periodCount} haftada bir seçtiğiniz gün(ler)de tekrarla
      </Text> */}
    </View>
  );

  const renderActiveTabRepetitionContent = () => {
    switch (activeTabSheetRepetition) {
      case "daily":
        return renderDaily();
      case "weekly":
        return renderWeekly();
      case "monthly":
        return renderMonthly();
      default:
        return null;
    }
  };

  //repetition
  const renderRepetition = () => (
    <View style={styles.container3}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#333",
          marginBottom: 10,
        }}
      >
        Alışkanlık tekrarlanma sıklığını belirleyin
      </Text>
      <View style={styles.tabContainer3}>
        <Pressable
          style={[
            styles.tabButton3,
            activeTabSheetRepetition === "daily" && styles.activeTab3,
          ]}
          onPress={() => {
            setActiveTabSheetRepetition("daily");
            setDraft({
              ...draft,
              periodType: 1,
              periodCount: 1,
              daysOfWeeks: [],
              daysOfMonthly: [],
            });
          }}
        >
          <Text
            style={[
              styles.tabText3,
              activeTabSheetRepetition === "daily" && styles.activeTabText3,
            ]}
          >
            Günlük
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton3,
            activeTabSheetRepetition === "weekly" && styles.activeTab3,
          ]}
          onPress={() => {
            setActiveTabSheetRepetition("weekly");
            setDraft({
              ...draft,
              periodType: 2,
              periodCount: 1,
              daysOfMonthly: [],
            });
          }}
        >
          <Text
            style={[
              styles.tabText3,
              activeTabSheetRepetition === "weekly" && styles.activeTabText3,
            ]}
          >
            Haftalık
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton3,
            activeTabSheetRepetition === "monthly" && styles.activeTab3,
          ]}
          onPress={() => {
            setActiveTabSheetRepetition("monthly");
            setDraft({
              ...draft,
              periodType: 3,
              periodCount: 1,
              daysOfWeeks: [],
            });
          }}
        >
          <Text
            style={[
              styles.tabText3,
              activeTabSheetRepetition === "monthly" && styles.activeTabText3,
            ]}
          >
            Aylık
          </Text>
        </Pressable>
      </View>
      {renderActiveTabRepetitionContent()}
    </View>
  );

  const TimeSelector = ({ label, value, onChange }: any) => {
    return (
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        mode="dropdown"
      >
        {label === "hour"
          ? Array.from({ length: 24 }, (_, i) => i.toString()).map((hour) => (
            <Picker.Item
              key={hour}
              label={hour.padStart(2, "0")}
              value={hour}
            />
          ))
          : Array.from({ length: 60 }, (_, i) => i.toString()).map((minute) => (
            <Picker.Item
              key={minute}
              label={minute.padStart(2, "0")}
              value={minute}
            />
          ))}
      </Picker>
    );
  };

  //duration
  const renderDuration = () => (
    <View style={styles.container3}>
      <View style={styles.tabContainer3}>
        <Pressable
          style={[
            styles.tabButton3,
            activeTabSheetDuration === "startTime" && styles.activeTab3,
          ]}
          onPress={() => {
            setActiveTabSheetDuration("startTime");
            setDraft({
              ...draft,
              endTime: {
                hour: "00",
                minute: "00",
              },
            });
          }}
        >
          <Text
            style={[
              styles.tabText3,
              activeTabSheetDuration === "startTime" && styles.activeTabText3,
            ]}
          >
            Başlangıç Zamanı
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton3,
            activeTabSheetDuration === "timeRange" && styles.activeTab3,
          ]}
          onPress={() => setActiveTabSheetDuration("timeRange")}
        >
          <Text
            style={[
              styles.tabText3,
              activeTabSheetDuration === "timeRange" && styles.activeTabText3,
            ]}
          >
            Zaman Aralığı
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: "#333",
          paddingVertical: 10,
        }}
      >
        Başlangıç Zamanı
      </Text>
      <View
        style={[
          {
            height: 200,
            flexDirection: "row",
            justifyContent: "center",
          },
        ]}
      >
        <TimeSelector
          label="hour"
          value={draft.startTime.hour}
          onChange={(hour: any) => {
            setDraft((prev) => ({
              ...prev,
              startTime: { ...prev.startTime, hour },
            }));
          }}
        />

        <Text
          style={{
            fontSize: 26,
            marginHorizontal: 5,
            color: "#333",
            marginBlock: "auto",
          }}
        >
          :
        </Text>
        <TimeSelector
          label="minute"
          value={draft.startTime.minute}
          onChange={(minute: any) =>
            setDraft((prev) => ({
              ...prev,
              startTime: { ...prev.startTime, minute },
            }))
          }
        />
      </View>

      {activeTabSheetDuration === "timeRange" && (
        <View>
          <Text
            style={{
              fontSize: 12,
              color: "#333",
              borderTopColor: "#E0E0E0",
              borderTopWidth: 1,
              paddingVertical: 10,
            }}
          >
            Bitiş Zamanı
          </Text>

          <View
            style={[
              {
                height: 200,
                flexDirection: "row",
                justifyContent: "center",
              },
            ]}
          >
            <TimeSelector
              label="hour"
              value={draft.endTime?.hour}
              onChange={(hour: any) =>
                setDraft((prev) => ({
                  ...prev,
                  endTime: { ...prev.endTime, hour },
                }))
              }
            />

            <Text
              style={{
                fontSize: 26,
                marginHorizontal: 5,
                color: "#333",
                marginBlock: "auto",
              }}
            >
              :
            </Text>
            <TimeSelector
              label="minute"
              value={draft.endTime?.minute}
              onChange={(minute: any) =>
                setDraft((prev) => ({
                  ...prev,
                  endTime: { ...prev.endTime, minute },
                }))
              }
            />
          </View>
        </View>
      )}
    </View>
  );

  // name
  const renderName = () => (
    <View style={styles.container3}>
      <Text style={styles.title}>
        {t("please_enter_the_name_of_the_habit")}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={draft.name}
        autoFocus={true}
        onChangeText={(text) => setDraft({ ...draft, name: text })}
      />
    </View>
  );

  // description
  const renderDescription = () => (
    <View style={styles.container3}>
      <Text style={styles.title}>
        {t("please_enter_the_description_of_the_habit")}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={draft.description}
        onChangeText={(text) => setDraft({ ...draft, description: text })}
      />
    </View>
  );

  // icon
  const renderIcon = () => (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {/* {t("please_enter_the_icon_of_the_habit")} */}
          Alışkanlık simgesi seçin
        </Text>
      </View>

      <FlatList
        data={icons}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        numColumns={10}
        renderItem={({ item, index }) => (
          <View>
            <Pressable
              key={index}
              style={{
                backgroundColor: draft.icon === item ? "gray" : "#FFF",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                margin: 5,
              }}
              onPress={() => {
                setDraft({ ...draft, icon: item });
              }}
            >
              <Text style={{ fontSize: 24 }}>{item}</Text>
            </Pressable>
            {draft.icon === item && (
              <MaterialIcons
                style={{
                  position: "absolute",
                  width: 15,
                  height: 15,
                  right: 0,
                  left: 35,
                  top: 0,
                  borderRadius: 10,
                  backgroundColor: "#588157",
                }}
                name="check"
                size={14}
                color="#FFF"
              />
            )}
          </View>
        )}
      />
    </View>
  );

  // color
  const renderColor = () => (
    <View style={styles.container3}>
      <Text style={styles.title}>Choose a color</Text>
      <View style={styles.colorContainer}>
        <FlatList
          data={colors}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          numColumns={7}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={[styles.colorCircle, { backgroundColor: item, margin: 5 }]}
              onPress={() => setDraft({ ...draft, color: item })}
            >
              {draft.color === item && (
                <MaterialIcons
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 7,
                    top: 7,
                  }}
                  name="check"
                  size={24}
                  color="#FFF"
                />
              )}
            </Pressable>
          )}
        />
        <Pressable
          style={styles.applyButton}
          onPress={() => {
            bottomSheetRef.current?.close();
          }}
        >
          <Text style={styles.applyText}>Uygula</Text>
        </Pressable>
      </View>
    </View>
  );

  const handleAppyBottomSheetPress = () => {
    switch (bottomSheetContent) {
      case "name":
        setForm({
          ...form,
          name: draft.name,
        });
        break;
      case "description":
        setForm({
          ...form,
          description: draft.description,
        });
        break;
      case "icon":
        setForm({
          ...form,
          icon: draft.icon,
        });
        break;
      case "color":
        setForm({
          ...form,
          color: draft.color,
        });
        break;
      case "repetition":
        setForm({
          ...form,
          periodType: draft.periodType,
          periodCount: draft.periodCount,
          daysOfWeeks: draft.daysOfWeeks,
          daysOfMonthly: draft.daysOfMonthly,
        });
        break;
      case "duration":
        setForm({
          ...form,
          startTime: draft.startTime,
          endTime: draft.endTime,
        });
        break;
      default:
        break;
    }
    bottomSheetRef.current?.close();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Animated.FlatList
          ref={flatListRef}
          data={tabs.map((tab) => ({ key: tab }))}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          scrollEnabled={form.name !== ""}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ index }) => (index === 0 ? stageOne() : stageTwo())}
        />

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
              }}
            >
              <LinearGradient
                colors={["green", "#80B900"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.applyButton}
                key={"apply"}
              >
                <Text style={styles.applyText}>Apply</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: width * 2,
    backgroundColor: "#E8F5E9",
    height: "100%",
  },
  screen: {
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  header: {
    backgroundColor: "#E8F5E9",
    shadowColor: "#000000",
    shadowOpacity: 0.09,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#588157",
  },
  content: {
    flex: 1,
    width: "100%",
    marginBottom: 50,
  },
  contentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#588157",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  contentSubHeader: {
    fontSize: 16,
    color: "#588157",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#588157",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    // backgroundColor: "#D0DCD1",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    margin: 5,
  },
  habitName: {
    color: "#588157",
    fontSize: 14,
    fontWeight: "600",
  },
  container2: {
    width: "90%",
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerButton: {
    fontSize: 16,
  },
  cancelButton: {
    color: "red",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardSubtitle: {
    color: "#FFF",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  colorContainer: {
    marginBottom: 16,
    width: "100%",
  },
  colorScrollView: {
    paddingVertical: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    borderColor: "#FFF",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionLabel: {
    fontSize: 16,
    color: "#588157",
    fontWeight: "600",
  },
  optionValue: {
    fontSize: 16,
    color: "#888",
  },
  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  tab: {
    width: width / 2,
    padding: 10,
    textAlign: "center",
    color: "gray",
  },
  activeTab: {
    width: width / 2,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  item: {
    margin: 1,
  },
  container3: {
    // flex: 1,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  tabContainer3: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    // backgroundColor: "#E8F5E9",
    borderRadius: 50,
    paddingVertical: 8,
  },

  tabButton3: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
  },
  activeTab3: {
    backgroundColor: "#588157",
  },
  tabText3: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText3: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  pickerText: {
    fontSize: 16,
    marginHorizontal: 5,
    color: "#333",
  },
  footerText: {
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
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
  picker: {
    height: 50,
    // width: '100%',
    width: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    // color: "#FFFFFF",
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

  container1: {
    flex: 1,
    backgroundColor: "#F3F7E7",
    padding: 20,
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B2B2B",
  },
  closeButton1: {
    padding: 10,
  },
  closeButtonText1: {
    fontSize: 18,
    color: "#2B2B2B",
  },
  subtitle1: {
    fontSize: 14,
    color: "#7D7D7D",
    marginBottom: 20,
  },
  customHabitContainer1: {
    marginBottom: 20,
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2B2B",
    marginBottom: 10,
  },
  customInputWrapper1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  customInput1: {
    flex: 1,
    fontSize: 16,
    color: "#2B2B2B",
  },
  addButton1: {
    backgroundColor: "#94C947",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText1: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  scrollContainer1: {
    paddingBottom: 20,
  },
  category1: {
    marginBottom: 20,
  },
  habitGrid1: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  habitCard1: {
    width: "10%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  habitEmoji1: {
    fontSize: 24,
    marginBottom: 5,
  },
  habitText1: {
    fontSize: 14,
    color: "#2B2B2B",
    textAlign: "center",
  },
  timeSelectorContainer: {
    marginVertical: 10,
    alignItems: "center",
  },

  timeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 120,
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
    color: "#333",
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    width: 80,
    alignItems: "center",
  },
  colon: { fontSize: 26, marginHorizontal: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  modalItemText: { fontSize: 16, textAlign: "center" },
});

const defaultHabitsCreate = [
  {
    category: "Health",
    habits: [
      {
        name: "Drink water",
        description: "Drink 8 glasses of water",
        color: "#388E3C",
        icon: "🚰",
        goal: 8,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Meditate",
        description: "Meditate for 10 minutes",
        color: "#388E3C",
        icon: "🧘",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eat healthy",
        description: "Eat a healthy meal",
        color: "#388E3C",
        icon: "🥗",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Exercise",
        description: "Exercise for 30 minutes",
        color: "#388E3C",
        icon: "🏃",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Fitness",
    habits: [
      {
        name: "Workout",
        description: "Workout for 30 minutes",
        color: "#388E3C",
        icon: "🏋️",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Run",
        description: "Run for 30 minutes",
        color: "#388E3C",
        icon: "🏃",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yoga",
        description: "Do yoga for 30 minutes",
        color: "#388E3C",
        icon: "🧘",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Swim",
        description: "Swim for 30 minutes",
        color: "#388E3C",
        icon: "🏊",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cycle",
        description: "Cycle for 30 minutes",
        color: "#388E3C",
        icon: "🚴",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dance",
        description: "Dance for 30 minutes",
        color: "#388E3C",
        icon: "💃",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hike",
        description: "Hike for 30 minutes",
        color: "#388E3C",
        icon: "🥾",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Box",
        description: "Box for 30 minutes",
        color: "#388E3C",
        icon: "🥊",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gym",
        description: "Go to the gym",
        color: "#388E3C",
        icon: "🏋️",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pilates",
        description: "Do pilates for 30 minutes",
        color: "#388E3C",
        icon: "🧘",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Learning",
    habits: [
      {
        name: "Read",
        description: "Read for 30 minutes",
        color: "#388E3C",
        icon: "📚",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Code",
        description: "Code for 30 minutes",
        color: "#388E3C",
        icon: "💻",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Productivity",
    habits: [
      {
        name: "Plan",
        description: "Plan your day",
        color: "#388E3C",
        icon: "📅",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Journal",
        description: "Journal for 10 minutes",
        color: "#388E",
        icon: "📓",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Hobbies",
    habits: [
      {
        name: "Draw",
        description: "Draw for 30 minutes",
        color: "#388E3C",
        icon: "🎨",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cook",
        description: "Cook a new recipe",
        color: "#388E3C",
        icon: "🍳",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Social",
    habits: [
      {
        name: "Call",
        description: "Call a friend",
        color: "#388E3C",
        icon: "📞",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Text",
        description: "Text a friend",
        color: "#388E3C",
        icon: "📱",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Finance",
    habits: [
      {
        name: "Budget",
        description: "Budget your expenses",
        color: "#388E3C",
        icon: "💰",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Save",
        description: "Save money",
        color: "#388E3C",
        icon: "💸",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Other",
    habits: [
      {
        name: "Walk",
        description: "Walk for 30 minutes",
        color: "#388E3C",
        icon: "🚶",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Stretch",
        description: "Stretch for 10 minutes",
        color: "#388E3C",
        icon: "🧘",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Work",
    habits: [
      {
        name: "Email",
        description: "Check your email",
        color: "#388E3C",
        icon: "📧",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Meeting",
        description: "Attend a meeting",
        color: "#388E3C",
        icon: "👔",
        goal: 1,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    category: "Self-care",
    habits: [
      {
        name: "Skincare",
        description: "Take care of your skin",
        color: "#388E3C",
        icon: "🧖",
        goal: 8,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sleep",
        description: "Get 8 hours of sleep",
        color: "#388E3C",
        icon: "😴",
        goal: 8,
        frequency: "daily",
        reminder: "morning",
        streak: 0,
        lastCompleted: null,
        completed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

const colors = [
  "#FF5733",
  "#FFBD33",
  "#C70039",
  "#900C3F",
  "#581845",
  "#28B463",
  "#1F77B4",
  "#F39C12",
  "#8E44AD",
  "#3498DB",
  "#16A085",
  "#F1C40F",
  "#D35400",
  "#7D3C98",
  "#27AE60",
  "#2980B9",
  "#F1948A",
  "#5D6D7E",
  "#8E44AD",
  "#E74C3C",
  "#2E4053",
  "#16A085",
  "#C39BD3",
  "#D2691E",
];

const icons = [
  "🏋️‍♂️",
  "🚴‍♂️",
  "🏃‍♂️",
  "🧘‍♂️",
  "🚶‍♂️",
  "🧗‍♂️",
  "🏊‍♂️",
  "🎨",
  "🎸",
  "🎮",
  "📚",
  "🎤",
  "🎥",
  "🍳",
  "🌱",
  "🧹",
  "🧼",
  "🚗",
  "🚲",
  "🚀",
  "🛸",
  "🚢",
  "🚂",
  "🚁",
  "🛶",
  "🚤",
  "🚲",
  "🛴",
  "🚜",
  "🚛",
  "🚚",
  "🚓",
  "🚒",
  "🚑",
  "🚐",
  "🚎",
  "🚕",
  "🚗",
  "🚘",
  "🚙",
  "🚚",
  "🚛",
  "🚜",
  "🏎️",
  "🚲",
  "🛵",
  "🏍️",
  "🚔",
  "🚖",
  "🚡",
  "🚠",
  "🚟",
  "🚃",
  "🚋",
  "🚝",
  "🚄",
  "🚅",
  "🚈",
  "🚞",
  "🚂",
  "🚆",
  "🚇",
  "🚊",
  "🚉",
  "🚁",
  "🛩️",
  "🛫",
  "🛬",
  "🪂",
  "🚀",
  "🛸",
  "🚲",
  "🛴",
  "🛹",
  "🛵",
  "🚏",
  "🛤️",
  "🛣️",
  "🛢️",
  "🛣️",
  "🛤️",
  "🛣️",
  "🛢️",
];

export default CustomModal;
