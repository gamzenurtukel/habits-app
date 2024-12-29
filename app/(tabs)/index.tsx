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
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";

const { width } = Dimensions.get("screen");

export default function HomeScreen() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList<{ key: string }>>(null);

  const data = {
    date: "2024-12-12T00:00:00",
    habits: [
      {
        id: "35000220-1d5c-43b5-4585-08dd157ba7a9",
        name: "dene Habitim",
        description: "qwerty",
        status: 2,
        isReminder: false,
        creationTime: "2024-12-06T02:11:17",
        details: {
          id: "00c6ac77-b373-482f-79f5-08dd157ba7af",
          color: "#C39BD3",
          icon: "🏋️‍♂️",
          periodType: 1,
          periodCount: 2,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "e89d7dd8-bdd1-4394-8989-08dd1ad08bb9",
        name: "denemem",
        description: "qwer",
        status: 1,
        isReminder: false,
        creationTime: "2024-12-12T17:15:15.811049",
        details: {
          id: "4135340e-6c26-4093-50cb-08dd1ad08bbf",
          color: "#8E44AD",
          icon: "🏊‍♂️",
          periodType: 1,
          periodCount: 1,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "8b13046c-0a94-4b3a-20af-08dd1ad43bfd",
        name: "denemem haftalık",
        description: "qwer",
        status: 2,
        isReminder: false,
        creationTime: "2024-12-12T17:41:39.96821",
        details: {
          id: "361bf577-e4b7-41e5-bafb-08dd1ad43c02",
          color: "#C70039",
          icon: "🍳",
          periodType: 3,
          periodCount: 1,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "e7f1b0d9-6d1c-4c5a-20b0-08dd1ad43bfd",
        name: "denemem aylık",
        description: "qwer",
        status: 3,
        isReminder: false,
        creationTime: "2024-12-12T17:41:39.96821",
        details: {
          id: "361bf577-e4b7-41e5-bafb-08dd1ad43c02",
          color: "#3498DB",
          icon: "🚒",
          periodType: 2,
          periodCount: 2,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "e7f1b0d9-6d1c-4c5a-20b0-08dd1ad43bfd",
        name: "denemem aylık",
        description: "qwer",
        status: 3,
        isReminder: false,
        creationTime: "2024-12-12T17:41:39.96821",
        details: {
          id: "361bf577-e4b7-41e5-bafb-08dd1ad43c02",
          color: "#3498DB",
          icon: "🚒",
          periodType: 2,
          periodCount: 2,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "e7f1b0d9-6d1c-4c5a-20b0-08dd1ad43bfd",
        name: "denemem aylık",
        description: "qwer",
        status: 2,
        isReminder: false,
        creationTime: "2024-12-12T17:41:39.96821",
        details: {
          id: "361bf577-e4b7-41e5-bafb-08dd1ad43c02",
          color: "#3498DB",
          icon: "🚒",
          periodType: 2,
          periodCount: 2,
          startTime: null,
          endTime: null,
        },
      },
      {
        id: "e7f1b0d9-6d1c-4c5a-20b0-08dd1ad43bfd",
        name: "denemem aylık",
        description: "qwer",
        status: 3,
        isReminder: false,
        creationTime: "2024-12-12T17:41:39.96821",
        details: {
          id: "361bf577-e4b7-41e5-bafb-08dd1ad43c02",
          color: "#3498DB",
          icon: "🚒",
          periodType: 2,
          periodCount: 2,
          startTime: null,
          endTime: null,
        },
      },
    ],
  };

  const sortDataHabits = (habits: any) => {
    return habits.sort((a: any, b: any) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
  };

  const groupByStatus = data.habits.reduce((acc: any, habit: any) => {
    if (!acc[habit.status]) {
      acc[habit.status] = [];
    }
    acc[habit.status].push(habit);
    return acc;
  }, {});

  console.log("groupByStatus", groupByStatus);

  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();

  const DAYS = [
    {
      day: moment(date).subtract(3, "days").format("ddd").toUpperCase(),
      date: dayOfMonth - 3,
    },
    {
      day: moment(date).subtract(2, "days").format("ddd").toUpperCase(),
      date: dayOfMonth - 2,
    },
    {
      day: moment(date).subtract(1, "days").format("ddd").toUpperCase(),
      date: dayOfMonth - 1,
    },
    {
      day: "TODAY",
      date: dayOfMonth,
    },
    {
      day: moment(date).add(1, "days").format("ddd").toUpperCase(),
      date: dayOfMonth + 1,
    },
    {
      day: moment(date).add(2, "days").format("ddd").toUpperCase(),
      date: dayOfMonth + 2,
    },
    {
      day: moment(date).add(3, "days").format("ddd").toUpperCase(),
      date: dayOfMonth + 3,
    },
  ];

  const [selectedDate, setSelectedDate] = useState(dayOfMonth);
  const handlePress = (date: number) => {
    setSelectedDate(date);
    // handleTabPress(date);
    const findIndex = DAYS.findIndex((day) => day.date === date);
    flatListRef.current?.scrollToIndex({ index: findIndex });
  };

  const handleTabPress = (index: number) => {
    // flatListRef.current?.scrollToOffset({ offset: index * width });
    // setSelectedDate(index);
  };

  const renderItem = ({ item }: { item: (typeof DAYS)[0] }) => {
    const isSelected = item.date === selectedDate;
    return (
      <TouchableOpacity
        onPress={() => handlePress(item.date)}
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {item.day}
        </Text>

        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          <MaterialIcons name="circle" size={6} />
          {` `}
          {item.date}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / width);
    const date = DAYS[index].date;
    setSelectedDate(date);
    // setSelectedDate(index);
  };

  const badgeColor = (status: number) => {
    switch (status) {
      case 1:
        return "#FCE5CD";
      case 2:
        return "#e5f9e7";
      case 3:
        return "#F9D3D0";
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView style={styles.container}>
          <View style={{ padding: 16 }}>
            <View style={styles.header}>
              <Text style={styles.date}>
                {day}, {month} {dayOfMonth}
              </Text>
              <Pressable style={styles.calendarIcon}>
                <Ionicons name="calendar-outline" size={24} color="green" />
              </Pressable>
            </View>

            <Text style={styles.title}>
              {t("its_a_great_day_to_stay_on_track")}
            </Text>

            {/* Habits Section */}
            <View style={styles.habitsSection}>
              <Text style={styles.sectionTitle}>{t("yours_habits")}</Text>
              {/* <Link href="/" style={styles.editButton}>
            Edit
          </Link> */}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.habitCards}
            >
              <TouchableOpacity
                style={[styles.addHabitCard, { cursor: "pointer" }]}
                onPress={() => router.push("/modal")}
              >
                <Ionicons name="add" size={28} color="green" />
                <Text style={styles.addHabitText}>{t("add_habit")}</Text>
              </TouchableOpacity>

              {data.habits.map((habit, index) => (
                <View
                  key={index}
                  style={[
                    styles.habitCard,
                    { backgroundColor: habit.details.color },
                  ]}
                >
                  <Text style={styles.habitText}>{habit.details.icon}</Text>
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
            </ScrollView>

            {/* Daily Progress */}
            <Text style={styles.progressText}>
              {t("your_daily_goal_progress")}
            </Text>
            <Text style={styles.progressSubText}>
              {/* 4 out of 5 tasks completed. */}
              {t("progress_bar")
                .replace("{current}", groupByStatus[2]?.length.toString())
                .replace("{total}", data.habits.length.toString())}
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${
                      (groupByStatus[2]?.length / data.habits.length) * 100
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
              keyExtractor={(item) => item.date.toString()}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
          <Animated.FlatList
            ref={flatListRef}
            data={DAYS.map((day) => ({ key: day.date.toString() }))}
            keyExtractor={(item) => item.key.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            // keyExtractor={(item) => item.key}

            // scrollEnabled={name !== ""}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ index }) => (
              <View style={styles.screen}>
                <ScrollView style={styles.container2}>
                  <View style={styles.habitList}>
                    {[1, 2, 3].map((status) => (
                      <View>
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
                          {`(${groupByStatus[status]?.length})`}
                        </Text>
                        {groupByStatus[status]?.map(
                          (habit: any, index: number) => (
                            <View
                              key={index}
                              style={[styles.habitListCard, { gap: 10 }]}
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
                                    ? t("day")
                                    : habit.details.periodType === 2
                                    ? t("week")
                                    : t("month")}
                                </Text>
                              </View>
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
                            </View>
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
    backgroundColor: "#e5f9e7",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  addHabitText: { marginTop: 8, color: "green", fontWeight: "600" },
  habitCard: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginHorizontal: 8,
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
});
