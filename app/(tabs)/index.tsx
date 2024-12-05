import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>Friday, 13th</Text>
        <Pressable style={styles.calendarIcon}>
          <Ionicons name="calendar-outline" size={24} color="green" />
        </Pressable>
      </View>

      <Text style={styles.title}>It's a great day to stay on track</Text>

      {/* Habits Section */}
      <View style={styles.habitsSection}>
        <Text style={styles.sectionTitle}>Your habits</Text>
        <Link href="/" style={styles.editButton}>
          Edit
        </Link>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.habitCards}
      >
        <View style={styles.addHabitCard}>
          <Ionicons name="add" size={28} color="green" />
          <Text style={styles.addHabitText}>Add habit</Text>
        </View>
        {["green", "yellow", "blue"].map((color, index) => (
          <View
            key={index}
            style={[styles.habitCard, { backgroundColor: color }]}
          >
            {/* <Ionicons name="run-outline" size={28} color="white" /> */}
            <MaterialIcons name="run-circle" size={28} color="white" />
            <Text style={styles.habitText}>Running</Text>
            <Text style={styles.habitText}>5 Days</Text>
          </View>
        ))}
      </ScrollView>

      {/* Daily Progress */}
      <Text style={styles.progressText}>Your daily goal progress</Text>
      <Text style={styles.progressSubText}>4 out of 5 tasks completed.</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Today's Habits */}
      <View style={styles.habitsSection}>
        <Text style={styles.sectionTitle}>Today's Habits</Text>
        <Link href="/" style={styles.editButton}>
          Edit
        </Link>
      </View>
      <View style={styles.habitList}>
        <View style={styles.habitDone}>
          <Ionicons name="checkmark-circle" size={28} color="green" />
          <View>
            <Text style={styles.habitName}>Breath</Text>
            <Text style={styles.habitTime}>Anytime</Text>
          </View>
          <Text style={styles.habitStatus}>Done</Text>
        </View>
        <View style={styles.habitPending}>
          <Ionicons name="time-outline" size={28} color="orange" />
          <View>
            <Text style={styles.habitName}>Breath</Text>
            <Text style={styles.habitTime}>10:00 AM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
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
    marginBottom: 24,
  },
  progressBar: { height: "100%", width: "75%", backgroundColor: "green" },
  habitList: { marginBottom: 24 },
  habitDone: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#e5f9e7",
    marginBottom: 8,
  },
  habitPending: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  habitName: { fontSize: 16, fontWeight: "600", color: "#333" },
  habitTime: { fontSize: 14, color: "#666" },
  habitStatus: {
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
});
