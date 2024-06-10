import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getCloths = createAsyncThunk(
    'cloths/getCloths',
    async (data, thunkAPI) => {
        console.log(process.env.BACKEND_URL)
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/cloth/getallcloths`);
        return response.data.cloths;
    }
)


export const clothsSlice = createSlice({
    name: 'cloths',
    initialState: {
        "items": [
            {
                "name": "Shalwar Suit",
                "customizations": {
                    "Top": [
                        {
                            "name": "Collar",
                            "options": [
                                {"option": "Mandarin", "image": "image_link_mandarin_collar"},
                                {"option": "Round", "image": "image_link_round_collar"},
                                {"option": "V-neck", "image": "image_link_vneck_collar"}
                            ]
                        },
                        {
                            "name": "Cuffs",
                            "options": [
                                {"option": "Buttoned", "image": "image_link_buttoned_cuffs"},
                                {"option": "Elastic", "image": "image_link_elastic_cuffs"},
                                {"option": "Straight", "image": "image_link_straight_cuffs"}
                            ]
                        },
                        {
                            "name": "Fabric",
                            "options": [
                                {"option": "Cotton", "image": "image_link_cotton_fabric"},
                                {"option": "Silk", "image": "image_link_silk_fabric"},
                                {"option": "Polyester", "image": "image_link_polyester_fabric"}
                            ]
                        }
                    ],
                    "Bottom": [
                        {
                            "name": "Fit",
                            "options": [
                                {"option": "Slim", "image": "image_link_slim_fit"},
                                {"option": "Regular", "image": "image_link_regular_fit"},
                                {"option": "Loose", "image": "image_link_loose_fit"}
                            ]
                        },
                        {
                            "name": "Length",
                            "options": [
                                {"option": "Full", "image": "image_link_full_length"},
                                {"option": "Ankle", "image": "image_link_ankle_length"},
                                {"option": "Above Ankle", "image": "image_link_above_ankle_length"}
                            ]
                        }
                    ]
                }
            },
            {
                "name": "Shirt",
                "customizations": [
                    {
                        "name": "Collar",
                        "options": [
                            {"option": "Spread", "image": "image_link_spread_collar"},
                            {"option": "Point", "image": "image_link_point_collar"},
                            {"option": "Button-down", "image": "image_link_button_down_collar"}
                        ]
                    },
                    {
                        "name": "Pocket",
                        "options": [
                            {"option": "Patch", "image": "image_link_patch_pocket"},
                            {"option": "Flap", "image": "image_link_flap_pocket"},
                            {"option": "No Pocket", "image": "image_link_no_pocket"}
                        ]
                    },
                    {
                        "name": "Sleeve",
                        "options": [
                            {"option": "Long", "image": "image_link_long_sleeve"},
                            {"option": "Short", "image": "image_link_short_sleeve"},
                            {"option": "Roll-up", "image": "image_link_roll_up_sleeve"}
                        ]
                    },
                    {
                        "name": "Fabric",
                        "options": [
                            {"option": "Cotton", "image": "image_link_cotton_fabric"},
                            {"option": "Linen", "image": "image_link_linen_fabric"},
                            {"option": "Silk", "image": "image_link_silk_fabric"}
                        ]
                    }
                ]
            },
            {
                "name": "Coat",
                "customizations": [
                    {
                        "name": "Lapel",
                        "options": [
                            {"option": "Notch", "image": "image_of_notch_lapel"},
                            {"option": "Peak", "image": "image_of_peak_lapel"},
                            {"option": "Shawl", "image": "image_of_shawl_lapel"}
                        ]
                    },
                    {
                        "name": "Buttons",
                        "options": [
                            {"option": "Single-breasted", "image": "image_of_single_breasted_coat"},
                            {"option": "Double-breasted", "image": "image_of_double_breasted_coat"}
                        ]
                    },
                    {
                        "name": "Length",
                        "options": [
                            {"option": "Hip", "image": "image_of_hip_length_coat"},
                            {"option": "Thigh", "image": "image_of_thigh_length_coat"},
                            {"option": "Knee", "image": "image_of_knee_length_coat"}
                        ]
                    }
                ]
            },
            {
                "name": "Pant",
                "customizations": [
                    {
                        "name": "Fit",
                        "options": [
                            {"option": "Slim", "image": "image_of_slim_fit_pant"},
                            {"option": "Straight", "image": "image_of_straight_fit_pant"},
                            {"option": "Bootcut", "image": "image_of_bootcut_fit_pant"}
                        ]
                    },
                    {
                        "name": "Waist Rise",
                        "options": [
                            {"option": "Low", "image": "image_of_low_rise_pant"},
                            {"option": "Mid", "image": "image_of_mid_rise_pant"},
                            {"option": "High", "image": "image_of_high_rise_pant"}
                        ]
                    },
                    {
                        "name": "Length",
                        "options": [
                            {"option": "Full", "image": "image_of_full_length_pant"},
                            {"option": "Ankle", "image": "image_of_ankle_length_pant"},
                            {"option": "Cropped", "image": "image_of_cropped_pant"}
                        ]
                    }
                ]
            },
            {
                "name": "Waist Coat",
                "customizations": [
                    {
                        "name": "Fit",
                        "options": [
                            {"option": "Fitted", "image": "image_of_fitted_waist_coat"},
                            {"option": "Regular", "image": "image_of_regular_waist_coat"},
                            {"option": "Loose", "image": "image_of_loose_waist_coat"}
                        ]
                    },
                    {
                        "name": "Buttons",
                        "options": [
                            {"option": "Single row", "image": "image_of_single_row_buttons_waist_coat"},
                            {"option": "Double row", "image": "image_of_double_row_buttons_waist_coat"}
                        ]
                    },
                    {
                        "name": "Length",
                        "options": [
                            {"option": "Belt", "image": "image_of_belt_length_waist_coat"},
                            {"option": "Waist", "image": "image_of_waist_length_waist_coat"},
                            {"option": "Hip", "image": "image_of_hip_length_waist_coat"}
                        ]
                    }
                ]
            },
            {
                "name": "Two Piece",
                "customizations": {
                    "Jacket": [
                        {
                            "name": "Suit type",
                            "options": [
                                {"option": "Business", "image": "image_of_business_suit"},
                                {"option": "Casual", "image": "image_of_casual_suit"},
                                {"option": "Formal", "image": "image_of_formal_suit"}
                            ]
                        },
                        {
                            "name": "Buttons",
                            "options": [
                                {"option": "Single-breasted", "image": "image_of_single_breasted_two_piece"},
                                {"option": "Double-breasted", "image": "image_of_double_breasted_two_piece"}
                            ]
                        }
                    ],
                    "Pant": [
                        {
                            "name": "Fit",
                            "options": [
                                {"option": "Slim", "image": "image_of_slim_fit_pant"},
                                {"option": "Straight", "image": "image_of_straight_fit_pant"},
                                {"option": "Relaxed", "image": "image_of_relaxed_fit_pant"}
                            ]
                        },
                        {
                            "name": "Length",
                            "options": [
                                {"option": "Full", "image": "image_of_full_length_pant"},
                                {"option": "Ankle", "image": "image_of_ankle_length_pant"},
                                {"option": "Cropped", "image": "image_of_cropped_pant"}
                            ]
                        }
                    ]
                }
            }
        ],
        cloths: null,
        selectedCloth: null,
    },
    reducers: {
        setSelectedCloth: (state, action) => {
            state.selectedCloth = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCloths.fulfilled, (state, action) => {
                console.log('test', action.payload)
                state.cloths = action.payload;
            })
            .addCase(getCloths.rejected, (state, action) => {
                console.log('test error', action)
                console.log(action)
            })
    }
})

export const {setSelectedCloth} = clothsSlice.actions;
export default clothsSlice.reducer;