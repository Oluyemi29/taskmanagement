import { create } from "zustand";
import type { userAuthStoreProps } from "../types/authType";
import { addToast } from "@heroui/react";

export const userAuthStore = create<userAuthStoreProps>((set) => ({
  userData: null,
  userToken: null,

  // logging in user
  Login: async (email, password) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const response = await request.json();
    if (response.success) {
      set((data) => {
        return {
          ...data,
          userToken: response.token,
          userData: response.data,
          isActive: response.success,
          isCheckingActive: false,
        };
      });
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },

  // registering user accunt
  Register: async (email, name, password) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },

  // adding new task
  AddTask: async (title, description, userId) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description, userId }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },

  // editing task
  EditTask: async (title, description, userId, id) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/edittask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, description, userId, id }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },

  // deleting task
  DeleteTask: async (userId, id) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/deletetask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, id }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },


  // marking the task as completed 
  CompletedTask: async (userId, id) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/completetask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, id }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Success",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },

  // getting all my task
  getMyTasks: async (userId) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/mytask/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      return response.data;
    } else {
      return [];
    }
  },
  isActive: false,
  isCheckingActive: false,
  CheckActive: async () => {
    set((prevData) => {
      return {
        ...prevData,
        isCheckingActive: true,
      };
    });
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/isactive`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      return set((prevData) => {
        return {
          ...prevData,
          isActive: response.success,
          isCheckingActive: false,
          userData: response.data,
        };
      });
    } else {
      return set((prevData) => {
        return {
          ...prevData,
          isActive: response.success,
          isCheckingActive: false,
        };
      });
    }
  },
  LogOut: async (userId) => {
    const API = import.meta.env.VITE_BackendAPI as string;
    const request = await fetch(`${API}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });
    const response = await request.json();
    if (response.success) {
      addToast({
        title: "Done",
        description: response.message,
        color: "success",
        timeout: 5000,
      });
      return true;
    } else {
      addToast({
        title: "Error",
        description: response.message,
        color: "danger",
        timeout: 5000,
      });
      return false;
    }
  },
}));
