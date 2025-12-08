"use client";
import { useAllFormFields } from "@payloadcms/ui";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { includes } from "zod";

export const DynamicRoleSelector= ({path}) => {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [fields,dispatchFields] = useAllFormFields()
  // console.log(fields)
  useEffect(() => {
   const FetchRole = async() => {
    try {
      console.log("Fetching roles...");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/roles`, {
        withCredentials: true
      });
      console.log("Fetched Roles:", response.data.docs);
      // setRoles(response.data.docs);
      if (response?.data?.docs) {
        setRoles(response.data.docs as any[]);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);  
    }
   }
  void FetchRole();
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    console.log("selectedRole",selectedRole)
    setSelectedRole(selectedRole);
    dispatchFields({
      type: "UPDATE",
      path: "role",
      value:selectedRole
    })
    // onChange?.(selectedRole);
  };

  

  return (
    <div style={{ margin: "10px 0", width: "100%" }}>
      <label style={{ display: "block", marginBottom: 6, fontWeight: 500, fontSize: 14, color: "#222" }}>
        Roles <span style={{ color: "#e53e3e" }}>*</span>
      </label>
      <select
        onChange={handleSelect}
        value={selectedRole || ""}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          fontSize: 14,
          background: "#fff",
          color: selectedRole ? "#222" : "#888",
          outline: "none",
          marginTop: 2,
          boxSizing: "border-box"
        }}
      >
        <option value="" disabled>Select a value</option>
        <option value="admin">admin</option>
        {roles.map((r) => (
          <option key={r.id} value={r.roleTitle}>{r.roleTitle}</option>
        ))}
      </select>
    </div>
  );
};


