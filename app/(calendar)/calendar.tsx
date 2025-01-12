import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import moment from "moment";
import "moment/locale/tr";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CircularProgress } from "react-native-circular-progress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useHabitActionListQuery } from "@/redux/services/habit";
import "moment/locale/tr";
import "moment/locale/en-gb";
import i18n from "@/i18n/i18nextConfig";
import { useTranslation } from "react-i18next";

const { width: screenWidth, height: height } = Dimensions.get("screen");

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [habitActionList, setHabitActionList] = useState<any[]>([]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { t } = useTranslation();

  const currentLanguage = i18n.language;
  moment.locale(currentLanguage === "tr" ? "tr" : "en-gb");

  const today = moment();
  const startMonth = moment().subtract(8, "months").startOf("month");
  const endMonth = moment().add(3, "months").startOf("month");
  const months: {
    title: string;
    days: { date: moment.Moment; isCurrentMonth: boolean }[];
  }[] = [];

  const {
    data: habitActionListData,
    refetch: refetchHabitActionList,
    isLoading: isLoadingHabitsActionList,
    isFetching: isFetchingHabitsActionList,
    isError: isErrorHabitsActionList,
    isSuccess: isSuccessHabitsActionList,
    isUninitialized: isUninitializedHabitsActionList,
  } = useHabitActionListQuery(today.format("YYYY-MM-DD"));

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

  for (
    let month = moment(startMonth);
    month.isBefore(endMonth);
    month.add(1, "month")
  ) {
    const days: { date: moment.Moment; isCurrentMonth: boolean }[] = [];
    const firstDayOfMonth = month.clone().startOf("month");
    const lastDayOfMonth = month.clone().endOf("month");

    for (let i = firstDayOfMonth.day() - 1; i >= 0; i--) {
      days.push({
        date: firstDayOfMonth.clone().subtract(i + 1, "days"),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDayOfMonth.date(); i++) {
      days.push({
        date: moment(month).date(i),
        isCurrentMonth: true,
      });
    }

    for (let i = 1; days.length % 7 !== 0; i++) {
      days.push({
        date: lastDayOfMonth.clone().add(i, "days"),
        isCurrentMonth: false,
      });
    }

    months.push({
      title: month.format("MMMM YYYY"),
      days,
    });
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderMonth = ({
    item: month,
    index,
  }: {
    item: {
      title: string;
      days: { date: moment.Moment; isCurrentMonth: boolean }[];
    };
    index: number;
  }) => (
    <View key={index} style={styles.monthContainer}>
      <LinearGradient
        colors={["#AECDB0", "#E8F5E9"]}
        style={{ flex: 1, padding: 7, marginBottom: 50 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.monthTitle}>{month.title}</Text>
      </LinearGradient>

      <View style={styles.daysHeader}>
        {[
          t("monday"),
          t("tuesday"),
          t("wednesday"),
          t("thursday"),
          t("friday"),
          t("saturday"),
          t("sunday"),
        ].map((day, i) => (
          <Text key={i} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {month.days.map((day, i) => (
          <Pressable
            key={i}
            style={[
              styles.day,
              day.isCurrentMonth
                ? styles.currentMonthDay
                : styles.otherMonthDay,
              day.date.isSame(today, "day") && styles.today,
              day.date.format("YYYY-MM-DD") === selectedDate &&
                styles.isSelected,
            ]}
            onPress={() => {
              setSelectedDate(day.date.format("YYYY-MM-DD"));
              console.log(day.date.format("YYYY-MM-DD"));
              handlePresentModalPress();
            }}
          >
            <Text
              style={[
                styles.dayText,
                day.isCurrentMonth
                  ? styles.currentMonthText
                  : styles.otherMonthText,
                day.date.format("YYYY-MM-DD") === selectedDate && [
                  { color: "#fff" },
                ],
              ]}
            >
              {day.date.date()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderBottomSheetContent = () => (
    <LinearGradient
      colors={["#AECDB0", "#E8F5E9"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {moment(selectedDate).clone().format("LL")}
          {/* <Text style={styles.subtitle}>summary</Text> */}
        </Text>
        {/* Progress*/}
        <View style={styles.progressContainer}>
          <CircularProgress
            size={220}
            width={15}
            fill={50}
            tintColor="#4CAF50"
            backgroundColor="#ECECEC"
            lineCap="round"
          >
            {() => (
              <View style={styles.innerCircle}>
                <Text
                  style={{
                    fontSize: 40,
                    color: "#588157",
                    fontWeight: "500",
                  }}
                >
                  🏋️
                </Text>
                <Text style={styles.percentage}>
                  {(habitActionList[2]?.length ||
                    0 / habitActionList[1]?.length ||
                    0) * 100}
                  %
                </Text>
                <Text style={styles.completionText}>
                  {t("completion_rate")}
                </Text>
              </View>
            )}
          </CircularProgress>

          {/* statistics */}
          <View style={styles.statsContainer}>
            {[1, 2, 3].map((status, index) => (
              <View key={index} style={styles.statItem}>
                <MaterialIcons
                  name={
                    status === 2 ? "check" : status === 1 ? "ad-units" : "close"
                  }
                  size={20}
                  color={
                    status === 2
                      ? "#4CAF50"
                      : status === 1
                      ? "#FFC107"
                      : "#F44336"
                  }
                />
                <Text style={styles.statText}>
                  {habitActionList[status]?.length || 0}
                </Text>
                <Text style={styles.statLabel}>
                  {status === 1
                    ? t("incompleted")
                    : status === 2
                    ? t("completed")
                    : t("failed")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* habits of day */}
        <View style={styles.bestHabitContainer}>
          <Text style={styles.bestHabitTitle}>
            {/* <MaterialIcons name="ad-units" size={20} color="#FFD700" /> */}
            <Text style={styles.highlight}>🏆</Text>
            {t("habits_of_the_day")}
          </Text>
          <ScrollView
            style={{
              height: height - 530,
              paddingBottom: 60,
              marginTop: 16,
            }}
          >
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
                    ? t("incompleted")
                    : status === 2
                    ? t("completed")
                    : t("failed")}{" "}
                  {`(${habitActionList[status]?.length || 0})`}
                </Text>
                <View
                  style={{
                    gap: 8,
                  }}
                >
                  {habitActionList[status]?.map((habit: any, index: number) => (
                    <View key={index} style={styles.habitCard}>
                      <Text
                        style={
                          {
                            // width: 100,
                            // height: 100,
                          }
                        }
                      >
                        {habit.details.icon} {habit.name}
                      </Text>
                      <Text style={styles.habitCompletion}>
                        {habit.description}
                      </Text>
                      <View style={styles.habitStats}>
                        <Text style={styles.habitStat}>
                          {habit.status === 2 ? (
                            <MaterialIcons
                              name="check"
                              size={16}
                              color="#4CAF50"
                            />
                          ) : habit.status === 1 ? (
                            <MaterialIcons
                              name="ad-units"
                              size={16}
                              color="#FFC107"
                            />
                          ) : (
                            <MaterialIcons
                              name="close"
                              size={16}
                              color="#F44336"
                            />
                          )}
                          {habit.status === 2
                            ? "completed"
                            : habit.status === 1
                            ? "pending"
                            : "failed"}
                        </Text>
                        <Text style={styles.habitStat}>
                          {/* <Icon name="flame-outline" size={16} color="#F44336" /> Best streak: {item.bestStreak} */}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {months.map((month, index) => renderMonth({ item: month, index }))}
          </ScrollView>
          <BottomSheetModal
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing
          >
            <BottomSheetView>{renderBottomSheetContent()}</BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  monthContainer: {
    // marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dayName: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.285%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  currentMonthDay: {
    // backgroundColor: '#fff',
  },
  otherMonthDay: {
    backgroundColor: "#f0f0f0",
  },
  today: {
    borderWidth: 2,
    borderColor: "#588157",
    borderRadius: 10,
  },
  dayText: {
    fontSize: 16,
    textAlign: "center",
  },
  currentMonthText: {
    color: "#000",
  },
  otherMonthText: {
    color: "#ccc",
  },
  isSelected: {
    backgroundColor: "#588157",
    color: "#fff",
    borderWidth: 2,
    borderColor: "#588157",
    borderRadius: 10,
  },
  container: {
    // flex: 1,
    backgroundColor: "transparent",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontWeight: "normal",
    color: "#757575",
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
  completionText: {
    fontSize: 14,
    color: "#757575",
  },
  statsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 16,
    gap: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  statLabel: {
    fontSize: 14,
    color: "#757575",
  },
  bestHabitContainer: {
    marginTop: 32,
  },
  bestHabitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  highlight: {
    color: "#4CAF50",
  },
  habitCard: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  habitCompletion: {
    fontSize: 14,
    color: "#757575",
    marginVertical: 8,
  },
  habitStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitStat: {
    fontSize: 14,
    color: "#757575",
  },
  carouselContainer: {
    marginTop: 32,
  },
});

const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"];
