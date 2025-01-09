import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native';
import moment from 'moment';
import 'moment/locale/tr';
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";


export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={months}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item, index }) => (
                        renderMonth({ item, index })
                    )}
                />
            </ScrollView>
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
    }
});

const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz']










