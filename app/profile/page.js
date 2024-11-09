"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/profile/ProfileCard";
import ProductCard from "@/components/profile/ProductCard";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { capitalizeFirstLetter, validateUsername } from "@/lib/utils";

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
  });

  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      category: "",
      marketingBudget: {
        min: "",
        max: "",
      },
      tags: [],
      images: [],
    },
  ]);

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
        : [{ field: "marketBudget.min", label: "Minimum Budget" }]),
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
      if (data.success) toast.success("Profile saved!");
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

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) =>
      prev.map((product, index) =>
        index === 0 ? { ...product, [name]: value } : product
      )
    );
  };

  const handleBudgetChange = (field, value) => {
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        marketingBudget: {
          ...product.marketingBudget,
          [field]: value,
        },
      }))
    );
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

  const addNewProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        category: "",
        marketingBudget: {
          min: "",
          max: "",
        },
        tags: [],
        images: [],
      },
    ]);
  };

  const handleProductTagKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim()) {
        setProducts((prev) =>
          prev.map((product, i) => {
            if (i === index) {
              return {
                ...product,
                tags: [...new Set([...product.tags, e.target.value.trim()])],
              };
            }
            return product;
          })
        );
        e.target.value = ""; // Clear input after adding
      }
    }
  };

  const removeProductTag = (productIndex, tagToRemove) => {
    setProducts((prev) =>
      prev.map((product, i) => {
        if (i === productIndex) {
          return {
            ...product,
            tags: product.tags.filter((tag) => tag !== tagToRemove),
          };
        }
        return product;
      })
    );
  };

  const removeProduct = (indexToRemove) => {
    setProducts((prev) => prev.filter((_, index) => index !== indexToRemove));
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
        accountType === "creator" ? "/api/creator" : "/api/brand";
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      if (data.profile) {
        // Update form data with profile information
        setFormData({
          _id: data.profile._id || "",
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
        });

        // If brand profile, update products
        if (accountType === "brand" && data.profile.products) {
          setProducts(data.profile.products);
        }
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

  const handleImageUpload = (productIndex, type, url, imageIndex) => {
    setProducts((prev) =>
      prev.map((product, i) => {
        if (i === productIndex) {
          if (type === "avatar") {
            return {
              ...product,
              avatar: url,
            };
          } else if (type === "images") {
            const newImages = [...(product.images || [])];
            newImages[imageIndex] = url;
            return {
              ...product,
              images: newImages,
            };
          }
        }
        return product;
      })
    );
  };

  const handleImageDelete = (productIndex, imgIndex) => {
    setProducts((prev) =>
      prev.map((p, i) => {
        if (i === productIndex) {
          const newImages = [...p.images];
          newImages[imgIndex] = "";
          // Shift remaining images forward
          for (let j = imgIndex; j < newImages.length - 1; j++) {
            if (newImages[j + 1]) {
              newImages[j] = newImages[j + 1];
              newImages[j + 1] = "";
            }
          }
          return { ...p, images: newImages };
        }
        return p;
      })
    );
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
    <div className="container mx-auto px-4 py-8 space-y-8">
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
      />
      {accountType === "brand" && (
        <>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              index={index}
              handleProductInputChange={(e) =>
                handleProductInputChange(index, e)
              }
              handleBudgetChange={(value) => handleBudgetChange(index, value)}
              removeProduct={() => removeProduct(index)}
              handleProductTagKeyDown={handleProductTagKeyDown}
              removeProductTag={removeProductTag}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
            />
          ))}
          <div className="max-w-5xl mx-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addNewProduct}
            >
              Add Another Product
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
