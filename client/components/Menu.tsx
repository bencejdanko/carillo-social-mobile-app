import Carrillo from '~/assets/images/carrillo.svg';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useColorScheme } from '~/lib/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { authHandler } from '~/lib/pocketbase/utils';

export default function Menu() {

    const { isDarkColorScheme } = useColorScheme();
    const navigation = useNavigation();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <Carrillo width={100} height={30} style={{ color: isDarkColorScheme ? 'white' : 'black' }} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 native:w-72'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Text>Invite users</Text>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <Animated.View entering={FadeIn.duration(200)}>
                                <DropdownMenuItem>
                                    <Text>Email</Text>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Text>Message</Text>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Text>More...</Text>
                                </DropdownMenuItem>
                            </Animated.View>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Text>Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Text>Support</Text>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Text>API</Text>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onPress={() => {
                        authHandler.logout();
                        navigation.navigate('Auth');
                    }}
                >
                    <Text
                    >Log out</Text>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}