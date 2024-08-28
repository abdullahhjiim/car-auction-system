import { calculateBidDecrement, calculateBidIncrement } from "@/components/auction/increment";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { authAxios } from "../axious-config";
import { logout } from "./auth-slices";
import { clearNotification } from "./notification/notificationSlice";

export const getAuctionList = createAsyncThunk(
  "auction/list",
  async ({ timezone, tz_short, running_auction_ids }, thunkAPI) => {
    try {
      const response = await authAxios.post(`/auction-dashboard`, {
        timezone,
        tz_short,
        except_ids: running_auction_ids,
      });

      return await response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const joinAuction = createAsyncThunk(
  "auction/join",
  async ({ auction_id }, thunkAPI) => {
    const { access_token } = JSON.parse(localStorage.getItem("authData"));

    try {
      const response = await authAxios.get(`/auctions/${auction_id}/join`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      return await response.data;
    } catch (e) {
      if (e.response?.status === 401) {
        thunkAPI.dispatch(logout());
        thunkAPI.dispatch(clearNotification());
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const setWatchUnwatch = createAsyncThunk(
  "auction/watch",
  async ({ auctionId, vehicleId, watch, lotIndex }, thunkAPI) => {
    const { access_token } = JSON.parse(localStorage.getItem("authData"));

    try {
      const response = await authAxios.post(
        `/vehicles/${vehicleId}/toggle-watch`,
        { watched: !watch },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );

      let res = await response.data;
      return { res, auctionId, vehicleId, watch, lotIndex };
    } catch (e) {
      return thunkAPI.rejectWithValue({error: e.response.data, auctionId});
    }
  }
);

export const setOfflineMax = createAsyncThunk(
  "auction/maxBid",
  async ({ auctionId, vehicleId, lotIndex, amount }, thunkAPI) => {
    const { access_token } = JSON.parse(localStorage.getItem("authData"));

    try {
      const response = await authAxios.post(
        `/lot/${vehicleId}/offline-bid`,
        { type: "max", amount },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );

      let res = await response.data;
      return { res, auctionId, vehicleId, lotIndex, message: "success" };
    } catch (e) {
      return { auctionId, vehicleId, lotIndex, message: "error" };
    }
  }
);

const initialState = {
  add_auction: false,
  auction_list_loading: false,
  join_auction_loading: false,
  auction_list: "",
  all_auction: [],
  running_auction: [],
  running_auction_ids: [],
};

export const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setAddAuction: (state, action) => {
      state.add_auction = action.payload;
    },
    setAllAuction(state, action) {
      state.all_auction.push(action.payload);
    },
    setRunningAuction(state, action) {
      state.running_auction.push(action);
      state.join_auction_loading = false;
    },
    setRunningAuctionByIndex(state, action) {

      state.running_auction[action.index] = action;
      state.join_auction_loading = false;
    },
    readyToBid(state, action) {
      const {
        auctionId,
        event,
        total_participants,
        bid_info,
        bid_detail,
        interval,
        msg,
        total_remaining_items,
      } = action.payload;

      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      let own_bid_amount = null;
      let newStateData = {
        ...state_obj,
        event,
        total_participants,
        bid_info,
        own_bid_amount,
        interval,
        msg,
        total_remaining_items,
      };
      let { vehicle_detail, upcoming_vehicles } = state_obj;

      if (
        state_obj?.vehicle_detail &&
        state_obj.vehicle_detail?.item_number_str !== bid_info.current_item
      ) {
        let item_number = bid_info.item_number;
        let upcomingVehicles = state_obj.upcoming_vehicles;
        let indexOfArray = upcomingVehicles.findIndex(
          (e) => e.item_number == item_number
        );

        upcoming_vehicles = upcomingVehicles.slice(indexOfArray + 1);
        vehicle_detail =
          state.all_auction[index].upcoming_vehicles[bid_info.current_item];
      }

      state.running_auction[index] = {
        ...newStateData,
        vehicle_detail,
        upcoming_vehicles,
        bid_detail,
      };
    },
    newBid(state, action) {
      const {
        auctionId,
        userId,
        event,
        total_participants,
        bid_info,
        bid_detail,
        interval,
        msg,
      } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state.running_auction[index] = {
        ...state_obj,
        event,
        total_participants,
        bid_info,
        bid_detail,
        interval,
        msg,
      };

      if (userId === bid_detail?.user_id) {
        let obj = { ...action.payload, index, bidAmount: bid_detail?.amount };
        auctionSlice.caseReducers.setOwnBidAmount(state, obj);
      }
    },
    bonusTime(state, action) {
      const {
        auctionId,
        event,
        total_participants,
        bid_detail,
        interval,
        msg,
      } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state.running_auction[index] = {
        ...state_obj,
        event,
        total_participants,
        bid_detail,
        interval,
        msg,
      };
    },
    bidEnded(state, action) {
      const { auctionId, event, item_number, auction_finished, interval, msg } =
        action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state.running_auction[index] = {
        ...state_obj,
        event,
        item_number,
        auction_finished,
        interval,
        msg,
      };
    },

    auctionBreak(state, action) {
			const { auctionId, ...rest } = action.payload;
			let index = state.running_auction.findIndex((i) => i.auction_detail.id == auctionId);
			let state_obj = state.running_auction[index];

			let is_break_running = false;
			if (rest.type == 'started') {
				is_break_running = true;
			}
			state.running_auction[index] = {
				...state_obj,
				break: rest,
				is_break_running,
			};
		},

    setRunningAuctionIds(state, action) {
      state.running_auction_ids = action.payload.running_auction_ids;
    },

    setAuctionList(state, action) {
      state.auction_list = action.payload;
      state.auction_list_loading = false;
    },

    setOwnBidAmount(state, action) {
      const { index, bidAmount } = action;
      state.running_auction[index].own_bid_amount = bidAmount;
    },

    removeAllAuction(state, action) {
      state.all_auction.splice(action.payload.index, 1);
    },

    removeRunningAuction(state, action) {
      const prevState = [...state.running_auction];
      prevState.splice(action.payload.index, 1);
      state.running_auction = prevState;
      state.running_auction_ids = state.running_auction_ids.filter(
        (e) => e !== action.payload.id
      );
      auctionSlice.caseReducers.removeAllAuction(state, action);
    },

    setWatch(state, action) {
      const { auctionId, vehicleId, lotIndex, watch, res } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      if (state_obj?.upcoming_vehicles[lotIndex]?.id == vehicleId) {
        state_obj.upcoming_vehicles[lotIndex].watched = !watch;
        state_obj.toast_message = res?.message ?? 'Watch List changed successfully';
      }

      state.running_auction[index] = state_obj;
    },
    
    setWatchError(state, action) {
      const { auctionId, error } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state_obj.toast_message = error?.message?.length > 0 ? error?.message : 'Something Went Wrong';
      console.log(current(state_obj));
      state.running_auction[index] = state_obj;

    },

    clearWatchToast(state, action) {
      const { auctionId } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state_obj.toast_message = '';
      state.running_auction[index] = state_obj;
    },

    setCurrentBidAmount(state, action) {
      const { auctionId, vehicleId, lotIndex, res, message } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      if (state_obj?.upcoming_vehicles[lotIndex]?.id == vehicleId) {
        state_obj.upcoming_vehicles[lotIndex].current_bid_amount =
          res.current_bid;
        state_obj.offiline_max_bid_success = message;
      }
      state.running_auction[index] = state_obj;
    },

    setMaxValue(state, action) {
      const {
        auctionId,
        vehicleId,
        lotIndex,
        bid_increment,
        max_minimum_bid,
        actionType,
      } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      if (state_obj?.upcoming_vehicles[lotIndex]?.id == vehicleId) {
        let previousValue =
          state_obj.upcoming_vehicles[lotIndex].changingMaxValue;

        let increment = calculateBidIncrement(previousValue);
        let decrement = calculateBidDecrement(previousValue);

        let newValue;
        if (actionType === "plus") {
          newValue = previousValue
            ? previousValue + increment
            : max_minimum_bid + bid_increment;
        } else if (actionType === "minus") {
          newValue = previousValue
            ? previousValue - decrement
            : max_minimum_bid - bid_increment;
        }
        state_obj.upcoming_vehicles[lotIndex].changingMaxValue = newValue;
      }
      state.running_auction[index] = state_obj;
    },

    setUpcomingVehicle(state, action) {
      const { auctionId, upcomingVehicles } = action.payload;
      let upcoming_vehicles = Object.values(upcomingVehicles);
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state_obj.upcoming_vehicles = upcoming_vehicles;
      state.running_auction[index] = state_obj;
    },

    setAuctionEnded(state, action) {
      let index = action.payload.index;
      let state_obj = state.running_auction[index];
      let auction_ended = true;
      state.running_auction[index] = { ...state_obj, auction_ended };
    },

    setAuctionSound(state, action) {
      let { index, sound } = action.payload;
      let state_obj = state.running_auction[index];
      let auctionSound = sound;
      state.running_auction[index] = { ...state_obj, auctionSound };
    },

    clearAuction(state) {
      state.auction_list_loading = false;
      state.auction_list = "";
      state.all_auction = [];
      state.running_auction = [];
      state.running_auction_ids = [];
    },
    offlineMaxBidStatusChange(state, action) {
      let { auctionId, status } = action.payload;
      let index = state.running_auction.findIndex(
        (i) => i.auction_detail.id == auctionId
      );
      let state_obj = state.running_auction[index];
      state_obj.offiline_max_bid_success = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuctionList.pending, (state) => {
        state.auction_list_loading = true;
      })
      .addCase(getAuctionList.fulfilled, (state, action) => {
        state.add_auction = true;
        auctionSlice.caseReducers.setAuctionList(state, action);
      })
      .addCase(getAuctionList.rejected, (state) => {
        state.auction_list_loading = false;
      })
      .addCase(joinAuction.pending, (state) => {
        state.join_auction_loading = true;
      })
      .addCase(joinAuction.fulfilled, (state, action) => {
        const auctionId = action.payload.auction_detail.id;

        let index = state.running_auction.findIndex(
          (i) => i.auction_detail.id == auctionId
        );

        let upcoming_vehicles = Object.values(action.payload.upcoming_vehicles);

        let final_running_item = {
            ...action.payload,
            upcoming_vehicles,
            auctionSound: true,
            index
          };

        if(index < 0) {
          auctionSlice.caseReducers.setAllAuction(state, action);
          auctionSlice.caseReducers.setRunningAuction(state, final_running_item);
        }else {
          auctionSlice.caseReducers.setRunningAuctionByIndex(state, final_running_item);
        }
        
      })
      .addCase(joinAuction.rejected, (state) => {
        state.join_auction_loading = false;
        auctionSlice.caseReducers.clearAuction(state);
      })
      .addCase(setWatchUnwatch.fulfilled, (state, action) => {
        auctionSlice.caseReducers.setWatch(state, action);
      })
      .addCase(setWatchUnwatch.rejected, (state, action) => {
        auctionSlice.caseReducers.setWatchError(state, action);
      })
      .addCase(setOfflineMax.fulfilled, (state, action) => {
        auctionSlice.caseReducers.setCurrentBidAmount(state, action);
      })
      .addCase(setOfflineMax.rejected, (state, action) => {
        auctionSlice.caseReducers.setCurrentBidAmount(state, action);
      });
  },
});

export const {
  setAddAuction,
  setRunningAuctionIds,
  clearAuction,
  removeRunningAuction,
  readyToBid,
  newBid,
  bonusTime,
  bidEnded,
  setAuctionEnded,
  setAuctionSound,
  setMaxValue,
  setUpcomingVehicle,
  offlineMaxBidStatusChange,
  auctionBreak,
  clearWatchToast
} = auctionSlice.actions;

export default auctionSlice.reducer;
