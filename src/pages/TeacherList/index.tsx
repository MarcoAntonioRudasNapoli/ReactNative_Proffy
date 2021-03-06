import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/Teacher Item';

import { Feather } from '@expo/vector-icons'

import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/core';



function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher)  => {
                    return teacher.user.id
                })
                setFavorites(favoritedTeachersIds);
            }
            console.log(response)
        });
    }
    
    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFilterVisible)
    }

    async function handleFilterSubmit() {
        loadFavorites()
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
        setIsFiltersVisible(false)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {isFilterVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Qual horário?"
                                placeholderTextColor="#c1bccc"
                            />
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                    key={teacher.user.id} 
                    teacher={teacher} 
                    favorited={favorites.includes(teacher.user.id as any)}
                    />)
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;