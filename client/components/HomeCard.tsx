import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

const CardWithShadow = () => {
    return (
        <View style={[styles.card, { height: height-400 }]}>
            <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg' }}
                style={styles.image}
                resizeMode='cover'
                imageStyle={styles.imageRadius} // Apply borderRadius to the image
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                    style={styles.shadowTop}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.2)']}
                    style={styles.shadowBottom}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                    style={styles.shadowLeft}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.2)']}
                    style={styles.shadowRight}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 12,
        backgroundColor: 'transparent',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageRadius: {
        borderRadius: 10, // Adjust the border radius to match your card's corners
    },
    shadowTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30, // Adjust the height as needed
    },
    shadowBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30, // Adjust the height as needed
    },
    shadowLeft: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 30, // Adjust the width as needed
    },
    shadowRight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 30, // Adjust the width as needed
    },
});

export default CardWithShadow;
