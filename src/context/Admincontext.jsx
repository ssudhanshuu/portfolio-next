"use client";

import React, { createContext, useState } from "react";


export const AdminContext = createContext();


export const AdminProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchData = async (url, onData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      onData(data);
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };

  const fetchSkills = async (category) => {
    await fetchData("http://localhost:3000/api/skills", (data) => {
      setSkills(Array.isArray(data) ? data : []);
    });
  };



  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects");
      const data = await response.json();

      if (data.success) {

        setProjects(data.data);
      }
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };

  const fetchProjectswithid = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {

        setProjects(data.data);
      }
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };


  const fetchblogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();

      if (data.success) {

        setblogs(data.data);
      }
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };

  const fetchblogswithid = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${bolgId}`);
      const data = await response.json();

      if (data.success) {

        setblogs(data.data);
      }
    } catch (error) {
      console.error("Data not fetched:", error);
    }
  };





  return (
    <AdminContext.Provider value={{ projects, fetchProjects, fetchProjectswithid, blogs, fetchblogs, fetchblogswithid, skills, fetchSkills }}>
      {children}
    </AdminContext.Provider>
  );
};
