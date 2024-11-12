"use client";
import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { validateUsername } from "@/lib/utils";

export default function ProfilePage() {
  const [accountType, setAccountType] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    contactEmail: "",
    shortTitle: "",
    about: "",
    avatar: "",
    links: [{ name: "", url: "" }],
    // Creator specific fields
    priceRange: { min: "", max: "" },
    platforms: [],
    tags: [],
    // Brand specific fields
    industry: "",
    marketBudget: {
      min: "",
      max: "",
    },
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    if (usernameError) {
      toast.error(usernameError);
      return;
    }

    const requiredFields = [
      { field: "username", label: "Username" },
      { field: "displayName", label: "Display Name" },
      { field: "contactEmail", label: "Contact Email" },
      { field: "shortTitle", label: "Short Title" },
      { field: "about", label: "About" },
      ...(accountType === "creator"
        ? [{ field: "priceRange.min", label: "Minimum Price" }]
        : [
            { field: "marketBudget.min", label: "Minimum Budget" },
            { field: "industry", label: "Industry" },
          ]),
    ];

    const missingFields = requiredFields.filter(({ field }) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return !formData[parent]?.[child];
      }
      return !formData[field];
    });

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in: ${missingFields.map((f) => f.label).join(", ")}`
      );
      return;
    }

    try {
      const endpoint =
        accountType === "creator" ? "/api/creator/save" : "/api/brand/save";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          ...data.brand,
        }));
        toast.success("Profile saved!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim()) {
        setFormData((prev) => ({
          ...prev,
          tags: [...new Set([...prev.tags, tagInput.trim()])],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const PLATFORM_OPTIONS = [
    { value: "Youtube", label: "YouTube" },
    { value: "Twitch", label: "Twitch" },
    { value: "Instagram", label: "Instagram" },
    { value: "TikTok", label: "TikTok" },
  ];

  const handleLinkChange = (index, field, value) => {
    setFormData((prev) => {
      const newLinks = [...prev.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, links: newLinks };
    });
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { name: "", url: "" }],
    }));
  };

  const removeLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleBrandBudgetChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      marketBudget: {
        ...prev.marketBudget,
        [field]: value,
      },
    }));
  };

  const checkUserType = async () => {
    try {
      const response = await fetch("/api/user/type");
      if (!response.ok) {
        throw new Error("Failed to fetch user type");
      }

      const data = await response.json();
      if (data.success && data.accountType) {
        setAccountType(data.accountType);
      }
    } catch (error) {
      console.error("Error checking user type:", error);
      toast.error("Failed to load user type");
    }
  };

  const fetchProfile = async () => {
    if (!accountType) return;

    try {
      const endpoint =
        accountType === "creator" ? "/api/creator/user" : "/api/brand/user";
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      if (data.profile) {
        // Update form data with profile information
        setFormData({
          _id: data.profile._id,
          displayName: data.profile.displayName || "",
          username: data.profile.username || "",
          contactEmail: data.profile.contactEmail || "",
          shortTitle: data.profile.shortTitle || "",
          about: data.profile.about || "",
          avatar: data.profile.avatar || "",
          links: data.profile.links || [{ name: "", url: "" }],
          priceRange: data.profile.priceRange || { min: "", max: "" },
          platforms: data.profile.platforms || [],
          tags: data.profile.tags || [],
          industry: data.profile.industry || "",
          marketBudget: data.profile.marketBudget || { min: "", max: "" },
          status: data.profile.status || "active",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    }
  };

  const handlePriceRangeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    checkUserType();
  }, []); // Run once on mount

  useEffect(() => {
    fetchProfile();
  }, [accountType]); // Run when accountType changes

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  if (!accountType) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ProfileCard
        formData={formData}
        setFormData={setFormData}
        accountType={accountType}
        handleInputChange={handleInputChange}
        setAccountType={setAccountType}
        handleSubmit={handleSubmit}
        handleLinkChange={handleLinkChange}
        addLink={addLink}
        removeLink={removeLink}
        tagInput={tagInput}
        setTagInput={setTagInput}
        handleTagKeyDown={handleTagKeyDown}
        removeTag={removeTag}
        handleBrandBudgetChange={handleBrandBudgetChange}
        handlePriceRangeChange={handlePriceRangeChange}
        PLATFORM_OPTIONS={PLATFORM_OPTIONS}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}
