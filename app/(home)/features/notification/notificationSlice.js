import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myNotifications: {
    unread_notifications: 0,
    data: {},
  },
};

const notifcationSlice = createSlice({
  name: "notificationUser",
  initialState,
  reducers: {
    setNotification: (state, action) => {      
      state.myNotifications.unread_notifications = action.payload.unread_notifications ?? 0;
      state.myNotifications.data = action.payload.data ?? {};
    },

    updateReadNotification: (state, action) => {
      let { unread_notifications, notification_ids } = action.payload;
      state.myNotifications.unread_notifications = unread_notifications;

      notification_ids.map((e) => {
        let cloneObj = state.myNotifications.data[e.toString()];

        if (cloneObj) {
          state.myNotifications.data[e.toString()] = {...cloneObj, is_read : true};
        }
      });
    },

    updateAddNotification: (state, action) => {
      let { unread_notifications, notification } = action.payload;
      state.myNotifications.unread_notifications = unread_notifications;

      let cloneObj = state.myNotifications.data;
      cloneObj[notification.id.toString()] = notification;
      state.myNotifications.data = cloneObj;
    },

    updateDeleteNotification: (state, action) => {
      let { unread_notifications, notification_ids } = action.payload;
      state.myNotifications.unread_notifications = unread_notifications;

      let cloneObj = state.myNotifications.data;
      notification_ids.map((id) => {
        delete cloneObj[id.toString()];
      });
      state.myNotifications.data = cloneObj;
    },

    clearNotification: (state) => {
      state.myNotifications.unread_notifications =  0;
      state.myNotifications.data =  {};
    }
  },
});

export const {
  setNotification,
  updateReadNotification,
  updateAddNotification,
  updateDeleteNotification,
  clearNotification
} = notifcationSlice.actions;
export default notifcationSlice.reducer;
