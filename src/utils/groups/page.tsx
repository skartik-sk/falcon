"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

import Stepper from "@/components/Stepper";
import { useLogContext } from "@/context/LogContext";
import { useSemaphoreContext } from "@/context/SemaphoreContext";
import useSemaphoreIdentity from "@/hooks/useSemaphoreIdentity";
import Feedback from "@/contract-artifacts/Feedback.json";

export default function GroupPage() {
  const router = useRouter();
  const { setLog } = useLogContext();
  const { _users, refreshUsers, addUser } = useSemaphoreContext();
  const [_loading, setLoading] = useState(false);
  const { _identity } = useSemaphoreIdentity();

  // New state for pincode
  const [pincode, setPincode] = useState("");

  // Check if current user has joined the group
  const userHasJoined = useMemo(
    () =>
      _identity !== undefined &&
      _users.includes(_identity.commitment.toString()),
    [_identity, _users]
  );

  type Notification = {
    title: string;
    description: string;
    type: "success" | "error" | "info";
  } | null;

  const [notification, setNotification] = useState<Notification>(null);

  const showNotification = (
    title: string,
    description: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({ title, description, type });

    setTimeout(() => setNotification(null), 3000);
  };

  // Group join/create handler
  const handleGroupAction = useCallback(async () => {
    // Validate inputs
    if (!_identity) {
      showNotification("Error", "Create an identity first", "error");
      return;
    }

    if (!pincode.trim()) {
      showNotification("Error", "Please enter a pincode", "error");
      return;
    }

    setLoading(true);
    setLog(`Processing group with pincode: ${pincode}`);

    try {
      // Attempt to join/create group
      const response = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityCommitment: _identity.commitment.toString(),
          pincode: pincode,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success scenarios
        if (result.newGroup) {
          showNotification(
            "Group Created",
            `New group created with pincode: ${pincode}`,
            "success"
          );
        } else {
          showNotification(
            "Group Joined",
            `Successfully joined group with pincode: ${pincode}`,
            "success"
          );
        }

        // Add user to local context
        addUser(_identity.commitment.toString());

        // Optional: Refresh users list
        refreshUsers();
      } else {
        // Error handling
        showNotification(
          "Error",
          result.message || "Failed to process group",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showNotification(
        "Network Error",
        "Unable to connect to the server",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [_identity, pincode, addUser, refreshUsers, setLog]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      {notification && (
        <div
          style={{
            padding: "1rem",
            backgroundColor:
              notification.type === "error"
                ? "#ffdddd"
                : notification.type === "success"
                ? "#ddffdd"
                : "#f0f0f0",
            border:
              "1px solid " +
              (notification.type === "error"
                ? "red"
                : notification.type === "success"
                ? "green"
                : "gray"),
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          <strong>{notification.title}</strong>
          <p>{notification.description}</p>
        </div>
      )}

      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Group Management
      </h2>

      <p style={{ fontSize: "1rem" }}>
        Create or join a group using a unique pincode. Each group is a Semaphore
        group representing an event or organization.
      </p>

      <input
        type="text"
        placeholder="Enter Group Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        disabled={_loading || userHasJoined}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <button
        onClick={handleGroupAction}
        disabled={!_identity || userHasJoined}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: !_identity || userHasJoined ? "#cccccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: !_identity || userHasJoined ? "not-allowed" : "pointer",
        }}
      >
        {userHasJoined ? "Already Joined" : "Join/Create Group"}
      </button>

      {_users.length > 0 && (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #eee",
            padding: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            Group Members
          </h3>
          {_users.map((user, index) => (
            <p
              key={index}
              style={{
                fontWeight:
                  _identity?.commitment.toString() === user ? "bold" : "normal",
              }}
            >
              {user}
            </p>
          ))}
        </div>
      )}

      <Stepper
        step={2}
        onPrevClick={() => router.push("/")}
        onNextClick={userHasJoined ? () => router.push("/proofs") : undefined}
      />
    </div>
  );
}
