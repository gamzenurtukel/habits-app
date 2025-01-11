import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";
import {
  useDeleteHabitMutation,
  useHabitActionListQuery,
  useHabitGetListQuery,
  useUpdateActionHabitMutation,
} from "@/redux/services/habit";
import { IHabit } from "@/types/habit";
import Toast from "react-native-toast-message";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

export default function HomeScreen() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList<{ key: string }>>(null);
  const [allHabitsList, setAllHabitsList] = useState<IHabit[]>([]);
  const [habitActionList, setHabitActionList] = useState<any[]>([]);

  const date = new Date();
  const today = moment(date);
  const [selectedDate, setSelectedDate] = useState(today.toISOString());
  const [longPressedIndex, setLongPressedIndex] = useState<number | null>(null);

  const {
    data: habitGetList,
    isLoading: isLoadingHabits,
    isFetching: isFetchingHabits,
    isError: isErrorHabits,
    isSuccess: isSuccessHabits,
  } = useHabitGetListQuery();
  const {
    data: habitActionListData,
    refetch: refetchHabitActionList,
    isLoading: isLoadingHabitsActionList,
    isFetching: isFetchingHabitsActionList,
    isError: isErrorHabitsActionList,
    isSuccess: isSuccessHabitsActionList,
    isUninitialized: isUninitializedHabitsActionList,
  } = useHabitActionListQuery(selectedDate);
  const [deleteHabit] = useDeleteHabitMutation();
  const [updateActionHabit] = useUpdateActionHabitMutation();

  const reFetchHabitAction = async () => {
    try {
      const response = await refetchHabitActionList();

      if (response?.data?.isSuccessful) {
        const groupByStatus = response.data.data.habits.reduce(
          (acc: any, habit: any) => {
            if (!acc[habit.status]) {
              acc[habit.status] = [];
            }
            acc[habit.status].push(habit);
            return acc;
          },
          {}
        );
        setHabitActionList(groupByStatus);
      }

      // console.log({
      //   habitActionListData: response?.data,
      //   isFetchingHabitsActionList,
      //   isErrorHabitsActionList,
      //   isLoadingHabitsActionList,
      //   isSuccessHabitsActionList,
      // });
    } catch (error) {
      console.error("Error fetching habit actions:", error);
    }
  };

  useEffect(() => {
    reFetchHabitAction();
  }, [selectedDate]);

  useEffect(() => {
    if (habitGetList?.isSuccessful) {
      setAllHabitsList(habitGetList.data);
    }
  }, [habitGetList]);

  const DAYS = [
    { day: today.clone().subtract(3, "days").toISOString() },
    { day: today.clone().subtract(2, "days").toISOString() },
    { day: today.clone().subtract(1, "days").toISOString() },
    { day: today.toISOString() },
    { day: today.clone().add(1, "days").toISOString() },
    { day: today.clone().add(2, "days").toISOString() },
    { day: today.clone().add(3, "days").toISOString() },
  ];

  const handlePress = (date: string) => {
    console.log("date handlePress", moment(date).toISOString());

    const findIndex = DAYS.findIndex((day) => day.day === date);
    flatListRef.current?.scrollToIndex({ index: findIndex });
    setSelectedDate(moment(date).toISOString());
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / width);
    const date = DAYS[index].day;
    console.log("date handleScroll", moment(date).toISOString());
    setSelectedDate(moment(date).toISOString());
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof DAYS)[0];
    index: number;
  }) => {
    const itemMoment = moment(item.day);
    const dayName = itemMoment.isSame(today, "day")
      ? "TODAY"
      : itemMoment.format("ddd").toUpperCase();
    const dayNumber = itemMoment.date();

    const isSelected = moment(item.day).isSame(moment(selectedDate), "day");

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handlePress(item.day)}
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {dayName}
        </Text>

        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          <MaterialIcons name="circle" size={6} />
          {` `}
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const badgeColor = (status: number) =>
    ({
      1: "#FCE5CD",
      2: "#e5f9e7",
      3: "#F9D3D0",
    }[status] || "#FCE5CD");

  const handleLongPress = (index: number) => {
    setLongPressedIndex(index);
  };

  const handlePressOut = () => {
    setTimeout(() => {
      setLongPressedIndex(null);
    }, 1000);
  };

  const handleDeletePress = (id: string) => {
    console.log("Habit id to delete:", id);
    deleteHabit({ id }).then((response) => {
      console.log("Response:", response);
      if (response?.data?.isSuccessful) {
        console.log("Habit deleted successfully:", response);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Alışkanlık başarıyla silindi!",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });

        reFetchHabitAction();

        setLongPressedIndex(null);
      } else {
        console.log("Habit delete failed:", response?.data?.errors);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Alışkanlık silinemedi!",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });
      }
    });
  };

  const handleStatusUpdate = (id: string, status: number) => {
    console.log("Habit id to update:", id);
    const newStatus = status === 1 ? 2 : 1;
    console.log("New status:", newStatus);
    updateActionHabit({ id, statusEnum: newStatus }).then((response) => {
      console.log("Response:", response);
      if (response?.data?.isSuccessful) {
        console.log("Habit updated successfully:", response);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Alışkanlık başarıyla güncellendi!",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });

        reFetchHabitAction();

        setLongPressedIndex(null);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Alışkanlık güncellenemedi!",
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 50,
        });
      }
    });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView style={styles.container}>
          <View style={{ padding: 16 }}>
            <View style={styles.header}>
              <Text style={styles.date}>
                {today.clone().format("dddd, MMMM D")}
              </Text>
              <Pressable
                style={styles.calendarIcon}
                onPress={() => router.push("/(calendar)/calendar")}
              >
                <Ionicons name="calendar-outline" size={24} color="green" />
              </Pressable>
            </View>

            <Text style={styles.title}>
              {t("its_a_great_day_to_stay_on_track")}
            </Text>

            {/* Habits Section */}
            <View style={styles.habitsSection}>
              <Text style={styles.sectionTitle}>{t("yours_habits")}</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.habitCards}
            >
              <TouchableOpacity
                style={[styles.addHabitCard, { marginRight: 7 }]}
                onPress={() => router.push("/modal")}
              >
                <Ionicons name="add" size={28} color="green" />
                <Text style={styles.addHabitText}>{t("add_habit")}</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  gap: 7,
                  // backgroundColor: "red",
                  // width: "100%",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                {allHabitsList?.map((habit, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.habitCard,
                      { backgroundColor: habit.details.color },
                    ]}
                  >
                    <Text style={{ fontSize: 24 }}>{habit.details.icon}</Text>
                    <Text style={styles.habitText}>{habit.name}</Text>
                    <Text style={styles.habitText}>
                      {habit.details.periodCount}{" "}
                      {habit.details.periodType === 1
                        ? t("day")
                        : habit.details.periodType === 2
                        ? t("week")
                        : t("month")}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Daily Progress */}
            <Text style={styles.progressText}>
              {t("your_daily_goal_progress")}
            </Text>
            <Text style={styles.progressSubText}>
              {/* 4 out of 5 tasks completed. */}
              {t("progress_bar")
                .replace(
                  "{current}",
                  habitActionList[2]?.length.toString() || "0"
                )
                .replace(
                  "{total}",
                  habitActionList[1]?.length.toString() || "0"
                )}
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${
                      (habitActionList[2]?.length ||
                        0 / habitActionList[1]?.length ||
                        0) * 100
                    }%`,
                    height: "100%",
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.daysContainer}>
            <FlatList
              data={DAYS}
              horizontal
              keyExtractor={(item) => item.day.toString()}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
          <Animated.FlatList
            ref={flatListRef}
            data={DAYS.map((day) => ({ key: day.day }))}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={name !== ""}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ index }) => (
              <View style={styles.screen} key={index}>
                <ScrollView style={styles.container2} key={index}>
                  <View style={styles.habitList}>
                    {[1, 2, 3].map((status, index) => (
                      <View key={index}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: 8,
                          }}
                        >
                          {status === 1
                            ? t("pending")
                            : status === 2
                            ? t("completed")
                            : t("failed")}{" "}
                          {`(${habitActionList[status]?.length})`}
                        </Text>
                        {habitActionList[status]?.map(
                          (habit: any, index: number) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.habitListCard,
                                {
                                  backgroundColor:
                                    longPressedIndex === index
                                      ? "#EFEFEF"
                                      : "#fff",

                                  gap: 10,
                                  transform: [
                                    {
                                      rotateZ:
                                        longPressedIndex === index
                                          ? "-2deg"
                                          : "0deg",
                                    },
                                    {
                                      scale:
                                        longPressedIndex === index ? 0.95 : 1,
                                    },
                                  ],
                                  animationDuration: "1000ms",
                                  animationTimingFunction: "ease-in-out",
                                  animationFillMode: "both",
                                  animationDelay: "0s",
                                  animationIterationCount: 1,
                                },
                              ]}
                              onLongPress={() => handleLongPress(index)}
                              onPressOut={handlePressOut}
                            >
                              <View
                                style={{
                                  backgroundColor: "#F0F0F0",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                }}
                              >
                                <Text style={styles.habitText}>
                                  {habit.details.icon}
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.habitName}>
                                  {habit.name}
                                </Text>
                                <Text style={styles.habitTime}>
                                  {habit.details.periodCount}{" "}
                                  {habit.details.periodType === 1
                                    ? (t("day") as string)
                                    : habit.details.periodType === 2
                                    ? (t("week") as string)
                                    : (t("month") as string)}
                                </Text>
                              </View>

                              {/* delete edit status buttons */}
                              {longPressedIndex === index ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginLeft: "auto",
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{
                                      padding: 5,
                                      borderRadius: 20,
                                      backgroundColor: "#DDE5DD",
                                      marginRight: 10,
                                    }}
                                    onPress={() =>
                                      handleStatusUpdate(habit.id, habit.status)
                                    }
                                  >
                                    <Ionicons
                                      name="checkmark"
                                      size={20}
                                      color="#588157"
                                    />
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    style={{
                                      padding: 5,
                                      borderRadius: 20,
                                      backgroundColor: "#CCE5E5",
                                    }}
                                    onPress={() => {
                                      router.push({
                                        pathname: "/modal",
                                        params: { id: habit.id },
                                      });
                                      setLongPressedIndex(null);
                                    }}
                                  >
                                    <Ionicons
                                      name="pencil"
                                      size={20}
                                      color="teal"
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => handleDeletePress(habit?.id)}
                                    style={{
                                      marginLeft: 10,
                                      padding: 5,
                                      borderRadius: 20,
                                      backgroundColor: "#FFE5E5",
                                    }}
                                  >
                                    <Ionicons
                                      name="trash"
                                      size={20}
                                      color="red"
                                    />
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                <Text
                                  style={[
                                    styles.habitStatus,
                                    {
                                      backgroundColor: badgeColor(habit.status),
                                      borderRadius: 8,
                                      padding: 8,
                                      color:
                                        habit.status === 1
                                          ? "orange"
                                          : habit.status === 2
                                          ? "green"
                                          : "red",
                                    },
                                  ]}
                                >
                                  {habit.status === 1
                                    ? "Pending"
                                    : habit.status === 2
                                    ? "Completed"
                                    : "Failed"}
                                </Text>
                              )}
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  date: { fontSize: 18, fontWeight: "600", color: "#333" },
  calendarIcon: { padding: 8 },
  title: { fontSize: 24, fontWeight: "700", color: "green", marginBottom: 24 },
  habitsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  editButton: { color: "green", fontSize: 16 },
  habitCards: { flexDirection: "row", marginBottom: 24 },
  addHabitCard: {
    backgroundColor: "#E0E0E0",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: 110,
    height: 120,
    shadowColor: "#e5f9e7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addHabitText: {
    marginTop: 8,
    color: "green",
    fontWeight: "600",
  },
  habitCard: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,

    justifyContent: "space-around",
    borderRadius: 10,
    width: 110,
    height: 120,
    gap: 10,
  },
  habitText: { color: "white", fontWeight: "600" },
  progressText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  progressSubText: { fontSize: 14, color: "#666", marginBottom: 8 },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: { backgroundColor: "green" },
  habitList: { marginBottom: 24 },
  habitListCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    // backgroundColor: "#e5f9e7",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  // habitPending: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 16,
  //   borderRadius: 8,
  //   backgroundColor: "#fff",
  //   marginBottom: 8,
  // },
  habitName: { fontSize: 16, fontWeight: "600", color: "#333" },
  habitTime: { fontSize: 14, color: "#666" },
  habitStatus: {
    marginLeft: "auto",
    fontSize: 10,
    fontWeight: "600",
  },
  daysContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  daysTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#8e8e8e",
    marginBottom: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "#E0E0E0",

    gap: 4,
  },
  selectedDay: {
    backgroundColor: "#588157",
  },
  dayText: {
    fontSize: 10,
    color: "#555",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
  },
  selectedDateText: {
    color: "#fff",
  },
  screen: {
    width,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E8F5E9",
  },
  container2: {
    padding: 5,
    width: "95%",
    // width: "90%",
    // paddingHorizontal: 10,
  },
  habitListCardActive: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
});
