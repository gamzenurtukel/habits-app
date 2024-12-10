import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  Button,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useCreateHabitMutation } from "@/redux/services/create-habit";

const { width } = Dimensions.get("screen");

const CustomModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [reminder, setReminder] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const [createHabit] = useCreateHabitMutation();

  const colors = [
    "#FF6B6B",
    "#FFA93A",
    "#FFD93A",
    "#2DC26B",
    "#3B9CFF",
    "#D28CFF",
  ];

  const handleSaveChanges = async () => {
    try {
      const result = await createHabit({
        name: name,
        description: description,
        isReminder: false,
        details: {
          color: selectedColor || "#FF6B6B",
          icon: icon,
          periodType: 1,
          periodCount: 1,
          startTime: "2021-09-01T00:00:00",
          endTime: "2021-09-01T00:00:00",
        },
      })
        .then((res) => {
          console.log("result then", result);
          console.log("Alışkanlık başarıyla oluşturuldu!", res);

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
        })
        .catch((error) => {
          console.log("alışkanlık oluşturma başarısız", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Alışkanlık oluşturulurken hata oluştu",
            visibilityTime: 3000,
            autoHide: true,
            bottomOffset: 50,
          });
        });
    } catch (error) {
      console.log("Alışkanlık oluşturulurken hata oluştu", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Alışkanlık oluşturulurken hata oluştu",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentPage === 0) {
      setCurrentPage(1);
    } else if (direction === "right" && currentPage === 1) {
      setCurrentPage(0);
      setName("");
      setIcon("");
      setDescription("");
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentPage(0)}>
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={currentPage === 0 ? "#E8F5E9" : "#588157"}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Create a new habit</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#588157" />
        </TouchableOpacity>
      </View>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent }) => {
          // if (nativeEvent.translationX < -50) handleSwipe("left");
          if (nativeEvent.translationX > 50) handleSwipe("right");
        }}
      >
        <View
          style={[
            styles.container,
            { transform: [{ translateX: -currentPage * width }] },
          ]}
        >
          {/* Ekran 1 */}
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
                    <TouchableOpacity
                      style={[
                        styles.habitCard,
                        {
                          width: "100%",
                          justifyContent: "space-between",
                        },
                      ]}
                      onPress={() => setCurrentPage(1)}
                    >
                      <View style={[styles.habitCard]}>
                        <Text>
                          <MaterialIcons name="add" size={24} color="#588157" />
                        </Text>
                        <Text style={styles.habitName}>
                          Kendi alışkanlığını oluştur
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
                    <Text style={styles.categoryTitle}>
                      {category.category}
                    </Text>
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
                            setCurrentPage(1);
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
            <TouchableOpacity
              onPress={() => setCurrentPage(1)}
              style={styles.button}
            >
              <Text>Devam Et</Text>
            </TouchableOpacity>
          </View>
          {/* Ekran 2 Add Habit */}

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
                Bu alışkanlığı rutinin için kişiselleştirelim
              </Text>
              <View style={styles.colorContainer}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
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
              </View>

              {/* Seçenekler */}
              {["Hedef", "Tekrar", "Süre"].map((item, index) => (
                <TouchableOpacity key={index} style={styles.optionRow}>
                  <Text style={styles.optionLabel}>{item}</Text>
                  <Text style={styles.optionValue}>
                    {item === "Hedef"
                      ? "Belirlenmemiş"
                      : item === "Tekrar"
                      ? "Günlük"
                      : "Herhangi bir zaman"}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Hatırlatıcı */}
              <View style={styles.reminderRow}>
                <Text style={styles.optionLabel}>Hatırlatıcı</Text>
                <Switch value={reminder} onValueChange={setReminder} />
              </View>

              {/* Kaydet Butonu */}
              <Button
                title="Değişiklikleri Kaydet"
                color="#4B0082"
                onPress={handleSaveChanges}
              />
            </ScrollView>
          </View>
        </View>
      </PanGestureHandler>
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
    flexDirection: "row",
    marginBottom: 16,
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
