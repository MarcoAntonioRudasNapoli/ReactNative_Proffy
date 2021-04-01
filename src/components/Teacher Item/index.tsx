import React from 'react';
import { Image, Text, View, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface Teacher {
    user:{
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
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function handleLinkWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${teacher.user.whatsapp}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{uri: teacher.user.avatar}}
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
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/*<Image source={heartOutlineIcon}/>*/}
                        <Image source={unfavoriteIcon}/>
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkWhatsapp}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;