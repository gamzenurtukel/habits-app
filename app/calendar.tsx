import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Pressable, Dimensions } from 'react-native';
import moment from 'moment';
import 'moment/locale/tr';
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CircularProgress } from 'react-native-circular-progress';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');


export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const today = moment();
    const startMonth = moment().subtract(8, 'months').startOf('month');
    const endMonth = moment().add(3, 'months').startOf('month');
    const months: { title: string; days: { date: moment.Moment; isCurrentMonth: boolean }[] }[] = [];


    for (let month = moment(startMonth); month.isBefore(endMonth); month.add(1, 'month')) {
        const days: { date: moment.Moment; isCurrentMonth: boolean }[] = [];
        const firstDayOfMonth = month.clone().startOf('month');
        const lastDayOfMonth = month.clone().endOf('month');


        for (let i = firstDayOfMonth.day() - 1; i >= 0; i--) {
            days.push({
                date: firstDayOfMonth.clone().subtract(i + 1, 'days'),
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
                date: lastDayOfMonth.clone().add(i, 'days'),
                isCurrentMonth: false,
            });
        }

        months.push({
            title: month.format('MMMM YYYY'),
            days,
        });
    }

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
        // setDraft(form);
    }, []);

    const renderMonth = ({ item: month, index }: { item: { title: string; days: { date: moment.Moment; isCurrentMonth: boolean }[] }, index: number }) => (
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
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'].map((day, i) => (
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
                            day.isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay,
                            day.date.isSame(today, 'day') && styles.today,
                            day.date.format('YYYY-MM-DD') === selectedDate && styles.isSelected
                        ]}

                        onPress={() => {
                            setSelectedDate(day.date.format('YYYY-MM-DD'));
                            console.log(day.date.format('YYYY-MM-DD'));
                            handlePresentModalPress();
                        }}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                day.isCurrentMonth ? styles.currentMonthText : styles.otherMonthText,
                                day.date.format('YYYY-MM-DD') === selectedDate && [{ color: "#fff" }]
                            ]}
                        >
                            {day.date.date()}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )

    const carouselRef = useRef(null);

    // Carousel verileri
    const carouselData = [
        {
            id: '1',
            title: '😊 Do morning vacuum',
            completionRate: '70%',
            checkIns: 7,
            bestStreak: 3,
        },
        {
            id: '2',
            title: '📖 Read a book',
            completionRate: '90%',
            checkIns: 10,
            bestStreak: 5,
        },
        {
            id: '3',
            title: '🏃‍♂️ Morning run',
            completionRate: '50%',
            checkIns: 5,
            bestStreak: 2,
        },
    ];

    const renderCarouselItem = ({ item }:any) => (
        <View style={styles.habitCard}>
            <Text style={styles.habitName}>{item.title}</Text>
            <Text style={styles.habitCompletion}>{item.completionRate} Completion rate</Text>
            <View style={styles.habitStats}>
                <Text style={styles.habitStat}>
                    {/* <Icon name="checkmark-outline" size={16} color="#4CAF50" /> Check-ins: {item.checkIns} */}
                </Text>
                <Text style={styles.habitStat}>
                    {/* <Icon name="flame-outline" size={16} color="#F44336" /> Best streak: {item.bestStreak} */}
                </Text>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView style={{ flex: 1 }}>
                        {/* <FlatList
                            data={months}
                            keyExtractor={(item) => item.title}
                            renderItem={({ item, index }) => (
                                renderMonth({ item, index })
                            )}
                        /> */}
                        {months.map((month, index) => (
                            renderMonth({ item: month, index })
                        ))}
                    </ScrollView>
                    <BottomSheetModal
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                        enableDynamicSizing
                        containerStyle={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                    >
                        <BottomSheetView
                        // style={{
                        //     padding: 16,
                        // }}
                        >
                            <View style={styles.container}>
                                {/* Başlık */}
                                <Text style={styles.title}>{
                                    moment(selectedDate).clone().locale('tr').format('LL')
                                }
                                    {/* <Text style={styles.subtitle}>summary</Text> */}
                                </Text>
                                {/* Progress Dairesi */}
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
                                                <Text style={styles.percentage}>50%</Text>
                                                <Text style={styles.completionText}>Completion rate</Text>
                                            </View>
                                        )}
                                    </CircularProgress>

                                    {/* İstatistikler */}
                                    <View style={styles.statsContainer}>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="ad-units" size={20} color="#FFC107" />
                                            <Text style={styles.statText}>25</Text>
                                            <Text style={styles.statLabel}>Best streak</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="check" size={20} color="#4CAF50" />
                                            <Text style={styles.statText}>25</Text>
                                            <Text style={styles.statLabel}>Completed</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <MaterialIcons name="close" size={20} color="#F44336" />
                                            <Text style={styles.statText}>5</Text>
                                            <Text style={styles.statLabel}>Not done</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* En iyi alışkanlık */}
                                {/* <View style={styles.bestHabitContainer}>
                                    <Text style={styles.bestHabitTitle}>
                                        <MaterialIcons name="ad-units" size={20} color="#FFD700" /> 
                                        Habits of the day
                                        
                                    </Text>
                                    <View style={styles.habitCard}>
                                        <Text style={styles.habitName}>😊 Do morning vacuum</Text>
                                        <Text style={styles.habitCompletion}>70% Completion rate</Text>
                                        <View style={styles.habitStats}>
                                            <Text style={styles.habitStat}><MaterialIcons name="check" size={16} color="#4CAF50" /> Check-ins: 7</Text>
                                            <Text style={styles.habitStat}><MaterialIcons name="ad-units" size={16} color="#F44336" /> Best streak: 3</Text>
                                        </View>
                                    </View>
                                </View> */}
                                {/* Carousel */}
                                <View style={styles.carouselContainer}>
                                    <Text style={styles.bestHabitTitle}>
                                        <Text style={styles.bestHabitTitle}>
                                            <MaterialIcons name="ad-units" size={20} color="#FFD700" />
                                            Habits of the day

                                        </Text>
                                    </Text>
                                    <Carousel
                                        ref={carouselRef}
                                        data={carouselData}
                                        renderItem={renderCarouselItem}
                                        sliderWidth={screenWidth}
                                        itemWidth={screenWidth * 0.8}
                                        loop={true}
                                        autoplay={true}
                                        autoplayInterval={3000}
                                    />
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    monthContainer: {
        // marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dayName: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    day: {
        width: '14.285%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    currentMonthDay: {
        // backgroundColor: '#fff',
    },
    otherMonthDay: {
        backgroundColor: '#f0f0f0',
    },
    today: {
        borderWidth: 2,
        borderColor: "#588157",
        borderRadius: 10,
    },
    dayText: {
        fontSize: 16,
        textAlign: 'center',
    },
    currentMonthText: {
        color: '#000',
    },
    otherMonthText: {
        color: '#ccc',
    },
    isSelected: {
        backgroundColor: "#588157",
        color: "#fff",
        borderWidth: 2,
        borderColor: "#588157",
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontWeight: 'normal',
        color: '#757575',
    },
    progressContainer: {
        alignItems: 'center',
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    innerCircle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
    },
    completionText: {
        fontSize: 14,
        color: '#757575',
    },
    statsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 16,
        gap: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    statLabel: {
        fontSize: 14,
        color: '#757575',
    },
    bestHabitContainer: {
        marginTop: 32,
    },
    bestHabitTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    highlight: {
        color: '#4CAF50',
    },
    habitCard: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 8,
    },
    habitName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    habitCompletion: {
        fontSize: 14,
        color: '#757575',
        marginVertical: 8,
    },
    habitStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    habitStat: {
        fontSize: 14,
        color: '#757575',
    },
    carouselContainer: {
        marginTop: 32,
    },
});

const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz']










