import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, ScrollView, Image, Pressable, Animated, Dimensions, TextInput, Button} from 'react-native';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto";
import {useDispatch, useSelector} from "react-redux";
import {getCloths, setSelectedCloth} from "../slices/clothSlice";
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {ThemeContext} from "../../ThemeContext";
import BottomDrawer from "react-native-animated-bottom-drawer";
import {Entypo} from '@expo/vector-icons';
import {addProduct, resetProducts} from "../slices/orderSlice";
import Toast from "react-native-toast-message";

const HomePage = () => {
    const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
    const cloths = useSelector(state => state.cloths.cloths);
    const selectedCloth = useSelector(state => state.cloths.selectedCloth);
    const [selected, setSelected] = useState(-1);
    const dispatch = useDispatch();
    const animationHeight = useRef(new Animated.Value(0)).current;
    const formTwoAnimationHeight = useRef(new Animated.Value(0)).current;
    const formThreeAnimationHeight = useRef(new Animated.Value(0)).current;
    const theme = useContext(ThemeContext)
    const bottomDrawer = useRef(null);
    const items = useSelector(state => state.cloths.items);
    const [products, setProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCustomizations, setSelectedCustomizations] = useState({});
    const [instructionStep, setInstructionStep] = useState(false);
    const [instructions, setInstructions] = useState('');
    const [contentHeight, setContentHeight] = useState(0);  // State to store content height
    const heightRef = useRef(null);
    const [filteredCloths, setFilteredCloths] = useState(cloths);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        dispatch(getCloths());
    }, [dispatch]);

    useEffect(() => {
        if (selected !== -1) {
            Animated.timing(animationHeight, {
                toValue: 100, // You can set this value to the desired height
                duration: 300, // Animation duration
                useNativeDriver: false, // Set to false because we're animating layout properties
            }).start();
        } else {
            Animated.timing(animationHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [selected, animationHeight]);

    const handleNextStep = () => {
        Animated.timing(formTwoAnimationHeight, {
            toValue: 200,  // Use dynamic content height here
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleSelectCustomization = (item, category, option) => {
        setSelectedCustomizations(prev => ({
            ...prev,
            [item.name]: {
                ...(prev[item.name] || {}),
                [category.name]: option
            }
        }));
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = cloths.filter(cloth => cloth.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredCloths(filtered);
        } else {
            setFilteredCloths(cloths);
        }
    }, [searchQuery, cloths]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.primaryPearl,
        }}>
            <TextInput
                className='bg-primaryPearl shadow-lg  p-4 rounded-3xl mx-4  mt-24 mb-8'
                placeholder="Search"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: theme.primaryPearl,
                paddingBottom: 50,
                gap:10,
            }}>
                <BottomDrawer ref={bottomDrawer} initialHeight={Dimensions.get('window').height - 100} customStyles={{
                    container: {
                        backgroundColor: theme.primaryPearl,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }
                }}
                              onClose={() => {
                                  setSelected(-1)
                                  setSelectedItem(null)
                                  setInstructionStep(false)
                              }}
                >
                    {selectedCloth && <ScrollView  contentContainerStyle={{
                        flexGrow: 1,
                        padding:10
                    }}>
                        <Image source={{uri: selectedCloth.coverImage}} className='w-full h-40 rounded-3xl'/>

                        <View style={{
                            width: Dimensions.get('window').width - 20,
                        }} className='flex flex-row flex-wrap mt-4'>
                            {
                                items.map((item) => (
                                    <Pressable
                                        onPress={() => {
                                            console.log('item', item)
                                            setSelectedItem(item);
                                            handleNextStep()
                                        }}
                                        key={item.name}
                                        className={`${selectedItem?.name === item.name ? 'bg-primaryLilac' : 'bg-primaryBlue'} shadow-primarySilver shadow-xl mx-4 p-4 my-2 rounded-3xl`}
                                    >
                                        <Text
                                            className={`${selectedItem?.name !== item.name ? 'text-primaryPearl' : 'text-primaryBlack font-bold'}`}>
                                            {item.name}
                                        </Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                        {selectedItem && <Animated.ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                height: formTwoAnimationHeight,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            className='bg-primaryBlue mt-4 flex flex-row flex-wrap rounded-3xl p-4'
                        >
                            {
                                selectedItem && selectedItem.name === 'Shalwar Suit' ?
                                    <View className='flex flex-row gap-4'>

                                        <View
                                            className='flex gap-2 items-center border-primaryPearl border-[1px] rounded-3xl pb-3 pr-2'>
                                            <Text className='text-primaryPearl '>
                                                Top
                                            </Text>
                                            <View className='flex flex-row'>
                                                {
                                                    selectedItem.customizations.Top.map((category) => (
                                                        <View key={category.name} className='flex justify-center'>
                                                            <Text className='self-center'>{category.name}</Text>
                                                            {category.options.map((option) => (
                                                                <Pressable
                                                                    key={option.option}
                                                                    onPress={() => handleSelectCustomization(selectedItem, category, option)}
                                                                    style={{
                                                                        backgroundColor: selectedCustomizations[selectedItem.name]?.[category.name]?.option === option.option ? theme.primaryLilac : theme.primarySilver,
                                                                        padding: 10,
                                                                        margin: 4,
                                                                        borderRadius: 10
                                                                    }}
                                                                >
                                                                    <Text>{option.option}</Text>
                                                                </Pressable>
                                                            ))}
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View
                                            className='flex gap-2 items-center border-primaryPearl border-[1px] rounded-3xl pb-3 pr-2 mr-10'>
                                            <Text className='text-primaryPearl'>
                                                Bottom
                                            </Text>
                                            <View className='flex flex-row'>
                                                {
                                                    selectedItem.customizations.Bottom.map((category) => (
                                                        <View key={category.name} className='flex justify-center'>
                                                            <Text className='self-center'>{category.name}</Text>
                                                            {category.options.map((option) => (
                                                                <Pressable
                                                                    key={option.option}
                                                                    onPress={() => handleSelectCustomization(selectedItem, category, option)}
                                                                    style={{
                                                                        backgroundColor: selectedCustomizations[selectedItem.name]?.[category.name]?.option === option.option ? theme.primaryLilac : theme.primarySilver,
                                                                        padding: 10,
                                                                        margin: 4,
                                                                        borderRadius: 10
                                                                    }}
                                                                >
                                                                    <Text>{option.option}</Text>
                                                                </Pressable>
                                                            ))}
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </View> : selectedItem.name === 'Two Piece' ?
                                        <View className='flex flex-row flex-wrap gap-4'>
                                            <View
                                                className='flex gap-2 items-center border-primaryPearl border-[1px] rounded-3xl pb-3 pr-2'>
                                                <Text className='text-primaryPearl'>
                                                    Coat
                                                </Text>
                                                <View className='flex flex-row'>
                                                    {
                                                        selectedItem.customizations.Jacket.map((category) => (
                                                            <View key={category.name} className='flex justify-center'>
                                                                <Text className='self-center'>{category.name}</Text>
                                                                {category.options.map((option) => (
                                                                    <Pressable
                                                                        key={option.option}
                                                                        onPress={() => handleSelectCustomization(selectedItem, category, option)}
                                                                        style={{
                                                                            backgroundColor: selectedCustomizations[selectedItem.name]?.[category.name]?.option === option.option ? theme.primaryLilac : theme.primarySilver,
                                                                            padding: 10,
                                                                            margin: 4,
                                                                            borderRadius: 10
                                                                        }}
                                                                    >
                                                                        <Text>{option.option}</Text>
                                                                    </Pressable>
                                                                ))}
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                            </View>
                                            <View
                                                className='flex gap-2 items-center border-primaryPearl border-[1px] rounded-3xl pb-3 pr-2 mr-10'>

                                                <Text className='text-primaryPearl'>
                                                    Pant
                                                </Text>
                                                <View className='flex flex-row'>
                                                    {
                                                        selectedItem.customizations.Pant.map((category) => (
                                                            <View key={category.name} className='flex justify-center'>
                                                                <Text className='self-center'>{category.name}</Text>
                                                                {category.options.map((option) => (
                                                                    <Pressable
                                                                        key={option.option}
                                                                        onPress={() => handleSelectCustomization(selectedItem, category, option)}
                                                                        style={{
                                                                            backgroundColor: selectedCustomizations[selectedItem.name]?.[category.name]?.option === option.option ? theme.primaryLilac : theme.primarySilver,
                                                                            padding: 10,
                                                                            margin: 4,
                                                                            borderRadius: 10
                                                                        }}
                                                                    >
                                                                        <Text>{option.option}</Text>
                                                                    </Pressable>
                                                                ))}
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                            </View>
                                        </View> : <View
                                            className='flex flex-row flex-wrap'>{selectedItem.customizations.map((category) => (
                                            <View key={category.name}>
                                                <Text>{category.name}</Text>
                                                {category.options.map((option) => (
                                                    <Pressable
                                                        key={option.option}
                                                        onPress={() => handleSelectCustomization(selectedItem, category, option)}
                                                        style={{
                                                            backgroundColor: selectedCustomizations[selectedItem.name]?.[category.name]?.option === option.option ? theme.primaryLilac : theme.primarySilver,
                                                            padding: 10,
                                                            margin: 4,
                                                            borderRadius: 10
                                                        }}
                                                    >
                                                        <Text>{option.option}</Text>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        ))}</View>
                            }
                        </Animated.ScrollView>}
                        {
                            instructionStep && <Animated.View style={{
                                height: formThreeAnimationHeight,
                                overflow: 'hidden',
                            }} className='flex-1 mt-5 bg-primaryPearl'>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Instructions'
                                    value={instructions}
                                    onChangeText={(text) => {
                                        setInstructions(text)
                                    }}
                                    className='bg-primaryPearl border-primaryLilac border-[1px] text-primaryBlack h-20 p-4 rounded-3xl'
                                />
                            </Animated.View>
                        }
                        <View className='mb-40'>
                            <Pressable onPress={() => {
                                if (instructionStep) {
                                    dispatch(addProduct({
                                        ...selectedCloth,
                                        customizations: selectedCustomizations,
                                        instructions: instructions
                                    }))
                                    bottomDrawer.current.close()
                                    setSelectedCloth(null)
                                    setSelectedItem(null)
                                    setSelectedCustomizations({})
                                    setInstructions('')
                                }
                                Animated.timing(formThreeAnimationHeight, {
                                    toValue: 100,
                                    duration: 300,
                                    useNativeDriver: false,
                                }).start();
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Product Added',
                                        text2: 'Product has been added to cart'
                                    });
                                setInstructionStep(true)
                            }}
                                       className='bg-primaryBlack shadow-primarySilver shadow-xl mx-4 p-2 my-2 rounded-3xl flex-row self-end justify-center items-center pl-5'>
                                <Text className='text-primaryLilac text-lg font-bold'>next</Text>
                                <Entypo name="chevron-right" size={24} color={theme.primaryLilac}/>
                            </Pressable>
                        </View>
                    </ScrollView>}

                </BottomDrawer>
                {filteredCloths && filteredCloths.map((cloth) => (
                    <Pressable
                        onPress={() => {
                            setSelected(selected === cloth._id ? -1 : cloth._id);
                        }}
                        key={cloth._id}
                        className='flex-1 bg-primaryPearl shadow-primarySilver shadow-xl mx-4 my-2 rounded-3xl'
                    >
                        <Image source={{uri: cloth.coverImage}} className='w-full h-40 rounded-3xl'/>
                        <View className='flex-1 flex-row justify-between px-4 py-2 bg-p'>
                            <Text style={{fontFamily: 'Roboto_700Bold'}}
                                  className='text-lg text-primaryBlack font-bold'>
                                {cloth.name}
                            </Text>
                            <Text style={{fontFamily: 'Roboto_400Regular'}} className='text-lg text-primaryBlack'>
                                {cloth.type.toLowerCase()}
                            </Text>
                        </View>
                        {selected !== cloth._id ?
                            <View className='bg-primaryBlack rounded-full p-2 w-7 absolute -bottom-3 shadow-lg right-[165px]'>
                                <AntDesign name="caretdown" size={12} color={theme.primaryPearl}/>
                            </View> : <Pressable onPress={() => {
                                bottomDrawer.current.open()
                                dispatch(setSelectedCloth(cloth))
                            }}
                                                 className='bg-primaryBlue rounded-full  flex flex-row gap-2 w-24 pb-2 justify-start pl-2 z-10 absolute -bottom-3 right-[140px]'>
                                <Feather name="mouse-pointer" size={14} color={theme.primaryPearl}/>
                                <Text style={{
                                    fontFamily: 'Roboto_400Regular',
                                }} className='text-primaryPearl'>Select</Text>
                            </Pressable>}
                        {selected === cloth._id && (
                            <Animated.View
                                style={{
                                    height: animationHeight, // Use the animated height here
                                    overflow: 'hidden'
                                }}
                                className='bg-primaryPearl rounded-3xl '
                            >
                                <View className='px-4 py-2 bg-primaryPearl'>
                                    <Text style={{fontFamily: 'Roboto_400Regular'}}
                                          className='text-sm text-primaryBlack'>
                                        Price: {cloth.price}/- PKR
                                    </Text>
                                    <Text style={{fontFamily: 'Roboto_400Regular'}}
                                          className='text-sm text-primaryBlack'>
                                        Color: {cloth.color}
                                    </Text>
                                    <Text style={{fontFamily: 'Roboto_400Regular'}}
                                          className='text-sm text-primaryBlack'>
                                        Quality: {cloth.description}
                                    </Text>
                                </View>

                            </Animated.View>
                        )}
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default HomePage;
