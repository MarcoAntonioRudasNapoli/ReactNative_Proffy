import React, { useState } from 'react';
import { Image, Text, View, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Asyncstorage from '@react-native-async-storage/async-storage';

import styles from './styles'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export interface Teacher {
    user: {
        avatar: string;
        bio: string;
        id: string;
        name: string;
        whatsapp: string;
    }
    cost: number;
    subject: string;
};

export interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleLinkWhatsapp() {
        api.post('/connections', {
            user_id: teacher.user.id
        })

        Linking.openURL(`whatsapp://send?phone=+55${teacher.user.whatsapp}`)
    }

    async function handleToggleFavorited() {
        const favorites = await AsyncStorage.getItem('favorited');

        let favoritesArray = []

        if (favorites) {
            favoritesArray = JSON.parse(favorites)
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.user.id === teacher.user.id
            })

            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);

        } else {
            favoritesArray.push(teacher);
            setIsFavorited(true);
            console.log(favoritesArray);
        }

        
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.user.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.user.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{teacher.user.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora{'   '}
                    <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorited}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {},
                        ]}>
                        {isFavorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }

                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;