import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '~/components/ui/card';

export default function NewPost() {
    const [imageUri, setImageUri] = useState(null);

    const openImagePicker = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
        console.log('Completed image selection:', result)
    };

    return (
        <Card className='rounded-none' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card className='m-10'>
                <Text className='text-2xl'>New Post</Text>
            </Card>

            <Button title="Select Image" onPress={openImagePicker} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            
        </Card>
    );
}