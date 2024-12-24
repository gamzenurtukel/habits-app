import React, { useState, useRef, useMemo, useCallback } from "react";
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
  Platform,
  Pressable,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useCreateHabitMutation } from "@/redux/services/create-habit";
import { selectToken } from "@/redux/reducers/auth-reducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { set } from "zod";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { Overlay } from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("screen");

const CustomModal = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [reminder, setReminder] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const flatListRef = useRef<FlatList<{ key: string }>>(null);
  const [activeTab, setActiveTab] = useState(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeTabSheet, setActiveTabSheet] = useState("daily");

  const [createHabit] = useCreateHabitMutation();

  const token = useSelector((state: RootState) => selectToken(state));
  const { t } = useTranslation();

  const { width, height } = Dimensions.get("screen");

  const tabs = ["stageOne", "stageTwo"];

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

  const handleTabPress = (index: number) => {
    flatListRef.current?.scrollToOffset({ offset: index * width });
    setActiveTab(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.x === 0) {
      setActiveTab(0);
      setName("");
      setIcon("");
      setDescription("");
    }
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSaveChanges = async () => {
    console.log("token", token);
    const habitData = {
      name: "jsjsjsjjsjjs",
      description: "jsjsjsjjsjs açıklaması",
      isReminder: true,
      details: {
        color: "#FF5733",
        icon: "📘",
        periodType: 1,
        periodCount: 1,
        startTime: null,
        endTime: null,
      },
    };

    createHabit(habitData)
      .then((response) => console.log("Başarılı:", response))
      .catch((error) => console.error("Hata:", error));

    // try {
    //   const result = await createHabit({
    //     name: name,
    //     description: description,
    //     isReminder: false,
    //     details: {
    //       color: selectedColor || "#FF6B6B",
    //       icon: icon,
    //       periodType: 1,
    //       periodCount: 1,
    //       startTime: "2021-09-01T00:00:00",
    //       endTime: "2021-09-01T00:00:00",
    //     },
    //   })
    //     .then((res) => {
    //       console.log("result then", result);
    //       console.log("Alışkanlık başarıyla oluşturuldu!", res);

    //       Toast.show({
    //         type: "success",
    //         position: "bottom",
    //         text1: "Alışkanlık başarıyla oluşturuldu!",
    //         visibilityTime: 3000,
    //         autoHide: true,
    //         bottomOffset: 50,
    //       });

    //       setTimeout(() => {
    //         router.back();
    //       }, 2000);
    //     })
    //     .catch((error) => {
    //       console.log("alışkanlık oluşturma başarısız", error);
    //       Toast.show({
    //         type: "error",
    //         position: "bottom",
    //         text1: "Alışkanlık oluşturulurken hata oluştu",
    //         visibilityTime: 3000,
    //         autoHide: true,
    //         bottomOffset: 50,
    //       });
    //     });
    // } catch (error) {
    //   console.log("Alışkanlık oluşturulurken hata oluştu", error);
    //   Toast.show({
    //     type: "error",
    //     position: "bottom",
    //     text1: "Alışkanlık oluşturulurken hata oluştu",
    //     visibilityTime: 3000,
    //     autoHide: true,
    //     bottomOffset: 50,
    //   });
    // }
  };

  const stageOne = () => {
    return (
      <View style={[styles.screen]}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingTop: 10,
            }}
          >
            <Text style={styles.contentHeader}>
              {t("first_lets_find_your_new_habit")}
            </Text>
            <Text style={styles.contentSubHeader}>
              {t("choose_from_the_list_below_or_create_a_custom_habit")}
            </Text>
          </View>
          <View>
            <View>
              <Text style={styles.categoryTitle}>{t("be_unique")}</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.habitCard,
                    {
                      width: "100%",
                      justifyContent: "space-between",
                    },
                  ]}
                  onPress={() => {
                    handleTabPress(1);
                  }}
                >
                  <View style={[styles.habitCard]}>
                    <Text>
                      <MaterialIcons name="add" size={24} color="#588157" />
                    </Text>
                    <Text style={styles.habitName}>
                      {t("create_your_own_habit")}
                    </Text>
                  </View>
                  <Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#588157"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {defaultHabitsCreate.map((category) => (
              <View key={category.category}>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 20,
                    paddingInline: 10,
                  }}
                >
                  {category.habits.map((habit) => (
                    <TouchableOpacity
                      key={habit.name}
                      style={styles.habitCard}
                      onPress={() => {
                        setName(habit.name);
                        handleTabPress(1);
                        setIcon(habit.icon);
                        setDescription(habit.description);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {habit.icon}
                      </Text>
                      <Text style={styles.habitName}>{habit.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const stageTwo = () => {
    return (
      <View style={[styles.screen]}>
        <ScrollView
          style={styles.container2}
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Kart */}
          <View
            style={[
              styles.card,
              { backgroundColor: selectedColor || "#FF6B6B" },
            ]}
          >
            <Text style={styles.cardTitle}>{`${icon} ${name}`}</Text>
            <Text style={styles.cardSubtitle}>{description}</Text>
          </View>

          {/* Renk Seçimi */}
          <Text style={styles.sectionTitle}>
            {t("lets_personalize_this_habit_for_your_routine")}
          </Text>
          <View style={styles.colorContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorScrollView}
            >
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: color,
                      borderWidth: selectedColor === color ? 2 : 0,
                    },
                  ]}
                />
              ))}
            </ScrollView>
          </View>

          {/* Seçenekler */}
          {["repetition", "duration"].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={handlePresentModalPress}
            >
              <Text style={styles.optionLabel}>{t(`${item}`)}</Text>
              <Text style={styles.optionValue}>
                {/* {item === "Hedef"
                  ? "Belirlenmemiş"
                  : item === "Tekrar"
                  ? "Günlük"
                  : "Herhangi bir zaman"} */}
                Belirtilmemiş
              </Text>
            </TouchableOpacity>
          ))}

          {/* Hatırlatıcı */}
          <View style={styles.reminderRow}>
            <Text style={styles.optionLabel}>{t("reminder")}</Text>
            <Switch value={reminder} onValueChange={setReminder} />
          </View>

          {/* Kaydet Butonu */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.applyText}>Değişikleri Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleTabPress(0);
          }}
        >
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={activeTab === 0 ? "#E8F5E9" : "#588157"}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>{t("create_a_new_habit")}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#588157" />
        </TouchableOpacity>
      </View>

      <BottomSheetModalProvider>
        <Animated.FlatList
          ref={flatListRef}
          data={tabs.map((tab) => ({ key: tab }))}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          scrollEnabled={name !== ""}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ index }) => (index === 0 ? stageOne() : stageTwo())}
        />

        <BottomSheetModal ref={bottomSheetRef} onChange={handleSheetChanges}>
          <BottomSheetView
            style={{
              padding: 16,
            }}
          >
            <View style={styles.container3}>
              <View style={styles.tabContainer3}>
                <Pressable
                  style={[
                    styles.tabButton3,
                    activeTabSheet === "daily" && styles.activeTab3,
                  ]}
                  onPress={() => setActiveTabSheet("daily")}
                >
                  <Text
                    style={[
                      styles.tabText3,
                      activeTabSheet === "daily" && styles.activeTabText3,
                    ]}
                  >
                    Günlük
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.tabButton3,
                    activeTabSheet === "weekly" && styles.activeTab3,
                  ]}
                  onPress={() => setActiveTabSheet("weekly")}
                >
                  <Text
                    style={[
                      styles.tabText3,
                      activeTabSheet === "weekly" && styles.activeTabText3,
                    ]}
                  >
                    Haftalık
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.tabButton3,
                    activeTabSheet === "monthly" && styles.activeTab3,
                  ]}
                  onPress={() => setActiveTabSheet("monthly")}
                >
                  <Text
                    style={[
                      styles.tabText3,
                      activeTabSheet === "monthly" && styles.activeTabText3,
                    ]}
                  >
                    Aylık
                  </Text>
                </Pressable>
              </View>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>Her</Text>
                <Picker
                  selectedValue={selectedDay.toString()} // Değeri string'e çeviriyoruz
                  onValueChange={(itemValue) =>
                    setSelectedDay(Number(itemValue))
                  }
                  style={{ width: 100 }}
                  mode="dropdown"
                  itemStyle={{ color: "black" }}
                >
                  {Array.from({ length: 30 }, (_, i) => (i + 1).toString()).map(
                    (day) => (
                      <Picker.Item key={day} label={day} value={day} />
                    )
                  )}
                </Picker>
                <Text style={styles.pickerText}>gün</Text>
              </View>
              {/* <Text style={styles.footerText}>Her gün tekrar eder.</Text> */}
              <Pressable
                style={styles.applyButton}
                onPress={() => {
                  bottomSheetRef.current?.close();
                }}
              >
                <Text style={styles.applyText}>Uygula</Text>
              </Pressable>
            </View>
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
    borderBottomColor: "#BCCCBB",
    borderBottomWidth: 1,
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
    borderBottomColor: "#EEE",
  },
  optionLabel: {
    fontSize: 16,
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
    backgroundColor: "#588157",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
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

export default CustomModal;
