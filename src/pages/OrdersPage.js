import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from "react-redux";
import {SafeAreaView} from "react-native-safe-area-context";

const OrdersPage = () => {
    const orders = useSelector(state => state.orders.allOrders);
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
    };

    return (
        <SafeAreaView className='flex-1 bg-primaryPearl pt-10'>
            {
                orders.length === 0 && <View className='flex-1 justify-center items-center'>
                    <Text className='text-primaryBlack text-2xl'>No orders yet</Text>
                </View>
            }
            <ScrollView className="p-4 bg-primaryPearl">
                {orders.map((order, index) => (
                    <TouchableOpacity key={index} onPress={() => toggleExpand(index)}
                                      className="border border-primaryBlue my-2 rounded-3xl overflow-hidden shadow-lg">
                        <View className="p-2">
                                <View className='flex flex-row justify-between items-center'>
                                    <Text className='text-lg w-40 font-bold text-center'> {order.products.map(product => Object.keys(product.customizations).join(', ')).join('; ')}</Text>
                                    <Text className='text-lg font-bold text-center'>
                                        {calculateTotalPrice(order.products)}/-</Text>
                                </View>
                            {expandedId === index && (
                                <>
                                    {order.products.map((product, prodIndex) => (
                                        <View key={prodIndex} className="my-2 p-2  rounded-3xl bg-primaryBlue ">
                                            <Image source={{uri: product.coverImage}}
                                                   className='w-full h-40 rounded-xl'/>
                                            <View className="p-2">
                                                <View className='flex flex-row justify-between items-center'>
                                                    <Text
                                                        className='text-lg text-white font-semibold'>{product.name}</Text>
                                                    <Text
                                                        className='text-right font-semibold text-white'>{product.price}</Text>
                                                </View>
                                                <View className='border-t-[1px] my-1 border-primaryPearl'></View>
                                                {Object.keys(product.customizations).map((key, custIndex) => (
                                                    <View key={custIndex} className='mt-1'>
                                                        <Text className='font-bold text-white pb-2'>{key}:</Text>
                                                        <View className='flex-row flex-wrap gap-2'>
                                                            {Object.keys(product.customizations[key]).map((customization, optionIndex) => (
                                                                <View key={optionIndex}
                                                                      className='bg-primaryBlack px-3 py-1 rounded-lg'>
                                                                    <Text className='text-white'>
                                                                        {customization}: {product.customizations[key][customization].option}
                                                                    </Text>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrdersPage;
