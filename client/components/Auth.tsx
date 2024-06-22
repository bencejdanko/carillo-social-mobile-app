import {
    SafeAreaView,
    ScrollView,
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

import { handler } from '~/lib/pocketbase/utils';

export default function Auth( { navigation }: any ) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [error, setError] = React.useState('');
    const [authModel, setAuthModel] = React.useState(handler.authStore.model);

    const onSubmit = async () => {
        if (register) {
            let result = await handler.register(email, password, confirmPassword);
            if (result instanceof Error) {
                setError(result.message)
            }
        } else {
            let result = await handler.login(email, password);
            if (result instanceof Error) {
                setError(result.message)
            }
        }
    }

    return (
        <SafeAreaView className=''>
            <ScrollView>
                <Card className='m-5'>
                    <CardContent>

                        <Input
                            className='mt-3'
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}

                        />
                        <Input
                            className='mt-3'
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}

                        />

                        {register &&
                            <Input
                                className='mt-3'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        }

                        {email && password && (register ? confirmPassword : true) &&
                            <Button
                                className='mt-3'
                                onPress={() => { onSubmit() }}
                            >
                                <Text>{register ? 'Register' : 'Login'}</Text>
                            </Button>
                        }

                        <Text className='text-red-500'>{error}</Text>

                        <Separator className='mt-3' />

                        <Text>
                            {register ? 'Already have an account?' : 'Don\'t have an account yet?'}
                            {'\u00A0'}
                            <Text
                                className='text-[blue]'
                                onPress={() => { setRegister(!register) }}
                            >
                                {register ? 'Login' : 'Register'} now!
                            </Text>
                        </Text>

                        {authModel?.email &&
                            <Text>
                                Logged in as: {authModel.email}
                            </Text>
                        }
                    </CardContent>
                </Card>

                <Button
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Text>Go to Home</Text>
                </Button>

            </ScrollView>
        </SafeAreaView>
    )
}