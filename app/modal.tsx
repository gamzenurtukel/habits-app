import { StyleSheet, Text, View, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Modal() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create a new habit</Text>
        <MaterialIcons name="close" size={24} color="#588157" />
      </View>
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
            First, let's find your new habit
          </Text>
          <Text style={styles.contentSubHeader}>
            Choose from the list below or create a custom habit
          </Text>
        </View>
        <View>
          <View>
            <Text style={styles.categoryTitle}>Benzersiz Ol</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 20,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <View
                style={[
                  styles.habitCard,
                  {
                    width: "100%",
                    padding: 20,
                  },
                ]}
              >
                <Text>
                  <MaterialIcons name="add" size={24} color="#588157" />
                </Text>
                <Text style={styles.habitName}>
                  Kendi alışkanlığını oluştur
                </Text>
              </View>
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
                  <View key={habit.name} style={styles.habitCard}>
                    <Text
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {habit.icon}
                    </Text>
                    <Text style={styles.habitName}>{habit.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  header: {
    backgroundColor: "#E8F5E9",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 4 },
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
    backgroundColor: "#D0DCD1",
    borderRadius: 5,
    margin: 5,
  },
  habitName: {
    color: "#588157",
    fontSize: 14,
    fontWeight: "600",
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
