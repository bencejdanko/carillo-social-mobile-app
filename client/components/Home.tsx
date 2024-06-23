import { MessageCircle, Ellipsis, EllipsisVertical, Plus, PlusCircle } from 'lucide-react-native';
import {
    SafeAreaView,
    ScrollView,
    Image,
    Touchable,
    TouchableOpacity,
    Modal,
} from 'react-native';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import * as React from 'react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

import { useColorScheme } from '~/lib/useColorScheme';

import { pb } from '~/lib/pocketbase/utils';

const OverlayMenu = ({ visible, onSelect, items }) => (
    <Modal visible={visible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <ScrollView style={{ width: '80%', backgroundColor: 'white', maxHeight: '60%', borderRadius: 10, padding: 20 }}>
                {items.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onSelect(item)}>
                        <Text style={{ marginVertical: 10, color: 'black' }}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    </Modal>
);

import { useNavigation } from '@react-navigation/native';


export default function Home() {

    const navigation = useNavigation();

    const { isDarkColorScheme } = useColorScheme();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const items = [{ label: 'Reaction 1' }, { label: 'Reaction 2' }]; // Example items


    const handleLongPress = () => {
        setOverlayVisible(true);
    }

    const handleSelect = (item) => {
        console.log('Selected item:', item);
        setOverlayVisible(false);
    };

    let posts = [{
        id: 1,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://as2.ftcdn.net/v2/jpg/05/52/90/99/1000_F_552909948_WnyjkgiiHOlcuBQLdOopcCKBPEd4Il0A.jpg',
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    },

    {
        id: 2,
        avatar: 'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg',
        avatarFallback: 'RS',
        name: 'Rick Sanchez',
        postImage: 'https://as2.ftcdn.net/v2/jpg/05/52/90/99/1000_F_552909948_WnyjkgiiHOlcuBQLdOopcCKBPEd4Il0A.jpg',
        likes: 100,
        comments: 50,
        shares: 10,
        description: 'This image shows a scientist named Rick Sanchez. He is a freelance scientist. He is from dimension C-137. He is 70 years old and is a human.',
    }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='p-3 rounded-none'>
                <View>
                    <Text>{pb.authStore.model?.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity className='mr-5'
                        onPress={() => navigation.navigate('NewPost')}
                    >
                        <PlusCircle size={24} strokeWidth={2} color={isDarkColorScheme ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MessageCircle size={24} strokeWidth={2} color={isDarkColorScheme ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </Card>

            <ScrollView>
                <Image source={require('~/assets/images/carrillo.svg')} />

                {posts.map((post, index) => (
                    <TouchableOpacity
                        onLongPress={() => handleLongPress()}
                        activeOpacity={0.9}
                    >

                        <Card
                            key={index}
                            className='rounded-none'
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar className='m-1' alt={post.avatarFallback} style={{ width: 34, height: 34 }}>
                                        <AvatarImage source={{ uri: post.avatar }} />
                                        <AvatarFallback>
                                            <Text>RS</Text>
                                        </AvatarFallback>
                                    </Avatar>
                                    <Text>{post.name}</Text>
                                </View>

                                <TouchableOpacity className='mr-5'>
                                    <Ellipsis color={isDarkColorScheme ? 'white' : 'black'} />
                                </TouchableOpacity>

                            </View>



                            <Image source={{ uri: post.postImage }} style={{ width: '100%', height: 200 }} />
                            <CardContent className='p-4'>
                                <CardDescription className="text-md">
                                    <Text>{post.description}</Text></CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Text>{post.likes} Likes</Text>
                                <Text>{post.comments} Comments</Text>
                                <Text>{post.shares} Shares</Text>
                            </CardFooter>


                        </Card></TouchableOpacity>

                ))}
            </ScrollView>
            <OverlayMenu visible={overlayVisible} onSelect={handleSelect} items={items} />
        </SafeAreaView>
    );

}
