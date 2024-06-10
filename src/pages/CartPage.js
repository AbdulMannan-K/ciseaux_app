import React from 'react';
import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {addOrder, resetProducts} from "../slices/orderSlice";
import Toast from 'react-native-toast-message';

const CartPage = ({navigation}) => {

    const products = useSelector(state => state.orders.order.products)
    const dispatch = useDispatch()

    return (
        <View className='flex-1 bg-primaryPearl'>
            {
                products.length === 0 && <View className='flex-1 justify-center items-center'>
                    <Text className='text-primaryBlack text-2xl'>No products in cart</Text>
                </View>
            }
            <ScrollView className="p-4 bg-primaryPearl">
        {/*    design it better please*/}
                {products.map((product, index) => {
                    return <View key={index} className="border-[1px] border-primaryLilac my-2 rounded-3xl">
                        <Image source={{uri: product.coverImage}} className='w-full h-24 rounded-3xl'/>
                        <View className="p-2">
                            <View className='flex flex-row justify-between'>
                                <Text>{product.name}</Text>
                                <Text>{product.price}</Text>
                            </View>
                            {
                                Object.keys(product.customizations).map((key, index) => {
                                    return <View key={index} className='p-2 border-[1px] border-primaryLilac my-1 rounded-3xl'>
                                        <Text className='font-bold text-primaryBlack'>{key}</Text>
                                        <View className='flex flex-row flex-wrap gap-5'>
                                        {
                                            Object.keys(product.customizations[key]).map((customization, index) => {
                                                return <View className="flex flex-col justify-start items-start py-1"><Text className='text-xs' key={index}>{customization}</Text>
                                                    <View className='bg-primaryBlue p-3 rounded-lg'><Text>{product.customizations[key][customization].option}</Text></View>
                                                </View>
                                            })
                                        }
                                        </View>
                                    </View>
                                })
                            }
                        </View>
                    </View>
                })}
        </ScrollView>
            <Pressable className='bg-primaryBlue p-2 absolute bottom-10 self-center rounded-3xl my-2' onPress={()=>{
                dispatch(addOrder({
                    products:products
                }))
                Toast.show({
                    type: 'success',
                    text1: 'Order Placed',
                    text2: 'Your order has been placed successfully'
                });
                dispatch(resetProducts())
                navigation.navigate('Home')
            }}>
                <Text className='text-primaryPearl text-2xl px-4'>Checkout</Text>
            </Pressable>
        </View>
    );
};

export default CartPage;
