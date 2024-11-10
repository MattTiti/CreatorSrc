import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import InfoIcon from "@/components/InfoIcon";

export function ProfileCard({
  formData,
  accountType,
  handleInputChange,
  setFormData,
  setAccountType,
  handleSubmit,
  handleLinkChange,
  addLink,
  removeLink,
  tagInput,
  setTagInput,
  handleTagKeyDown,
  removeTag,
  handleBrandBudgetChange,
  handlePriceRangeChange,
  PLATFORM_OPTIONS,
  handleStatusChange,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create FormData and append file
      const formData = new FormData();
      formData.append("file", file);

      // Send file directly to API
      const response = await fetch("/api/avatar/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Update form data with the new avatar URL
      handleInputChange({
        target: {
          name: "avatar",
          value: data.url,
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="mx-auto">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <div className="flex items-center gap-2">
            <Select
              value={formData.status}
              onValueChange={(value) => handleStatusChange(value)}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Status">
                  {formData.status === "active" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Inactive
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </div>
                </SelectItem>
                <SelectItem value="inactive">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    Inactive
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <InfoIcon
              className="flex items-start justify-start -ml-1"
              description="Active profiles appear in search results and are visible to the public. Inactive profiles are hidden from the public, but can still be accessed directly by their live link."
              type="warning"
            />
            <Button variant="outline" size="sm" disabled={!formData._id}>
              <Link
                href={`/${accountType === "creator" ? "creator" : "brand"}/${
                  formData.username
                }`}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Live Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback>
                  {formData.displayName?.charAt(0) ||
                    formData.username?.charAt(0) ||
                    "?"}
                </AvatarFallback>
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Change Profile Picture"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-sm text-black/60">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            {/* Username, Account Type, and Rules */}
            <div className="grid grid-cols-[2fr,1fr] gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Account Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={accountType}
                    onValueChange={(value) => setAccountType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 bg-muted/50 p-3 rounded-lg">
                <div className="text-sm text-black/70">
                  Username rules:
                  <ul className="list-disc list-inside mt-1">
                    <li>Only letters, numbers, and underscores</li>
                    <li>No spaces or special characters</li>
                    <li>3-20 characters long</li>
                    <li>All lowercase</li>
                  </ul>
                </div>
                <p className="text-sm text-black/70 mt-2">
                  Your profile URL will be:
                  <br />
                  <span className="font-mono text-primary">
                    creatorsource.io/{accountType}/
                    {formData.username || "[username]"}
                  </span>
                </p>
              </div>
            </div>

            {/* Display Name and Email side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  Display Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="Your display name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  Contact Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortTitle">
                Short Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="shortTitle"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleInputChange}
                placeholder={
                  accountType === "creator"
                    ? "e.g., Fitness Youtuber, Tech Reviewer, etc."
                    : "e.g., AI Expense Tracker, Marketing Agency, etc."
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">
                About <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Links</Label>
              <div className="space-y-3">
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={link.name}
                      onChange={(e) =>
                        handleLinkChange(index, "name", e.target.value)
                      }
                      placeholder="Link name (e.g., Website, Twitter)"
                      className="w-1/3"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                      placeholder="https://your-website.com"
                      className="flex-1"
                    />
                    {formData.links.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeLink(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={addLink}
                >
                  Add Link
                </Button>
              </div>
            </div>
          </div>

          {/* Creator Specific Fields */}
          {accountType === "creator" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Price Range (USD)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="minPrice"
                      className="text-sm text-muted-foreground"
                    >
                      Minimum <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={formData.priceRange.min}
                      onChange={(e) =>
                        handlePriceRangeChange("min", e.target.value)
                      }
                      placeholder="Min price"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxPrice"
                      className="text-sm text-muted-foreground"
                    >
                      Maximum
                    </Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={formData.priceRange.max}
                      onChange={(e) =>
                        handlePriceRangeChange("max", e.target.value)
                      }
                      placeholder="Max price"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platforms">Platforms</Label>
                <Select
                  onValueChange={(value) => {
                    if (!value) return;
                    setFormData((prev) => ({
                      ...prev,
                      platforms: prev.platforms.includes(value)
                        ? prev.platforms.filter((p) => p !== value)
                        : [...prev.platforms, value],
                    }));
                  }}
                >
                  <SelectTrigger id="platforms">
                    <SelectValue placeholder="Select platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORM_OPTIONS.map((platform) => (
                      <SelectItem
                        key={platform.value}
                        value={platform.value}
                        disabled={formData.platforms.includes(platform.value)}
                      >
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {formData.platforms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="secondary"
                        className="px-2 py-1 flex items-center gap-1"
                      >
                        {
                          PLATFORM_OPTIONS.find((p) => p.value === platform)
                            ?.label
                        }
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              platforms: prev.platforms.filter(
                                (p) => p !== platform
                              ),
                            }));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type a tag and press Enter"
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brand Specific Fields */}
          {accountType === "brand" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Enter your industry"
                />
              </div>

              <div className="space-y-2">
                <Label>Marketing Budget Range (USD)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="minBudget"
                      className="text-sm text-muted-foreground"
                    >
                      Minimum <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="minBudget"
                      type="number"
                      value={formData.marketBudget.min}
                      onChange={(e) =>
                        handleBrandBudgetChange("min", e.target.value)
                      }
                      placeholder="Min budget"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="maxBudget"
                      className="text-sm text-muted-foreground"
                    >
                      Maximum
                    </Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      value={formData.marketBudget.max}
                      onChange={(e) =>
                        handleBrandBudgetChange("max", e.target.value)
                      }
                      placeholder="Max budget"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandTags">Tags</Label>
                  <Input
                    id="brandTags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Type a tag and press Enter"
                  />
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-1 flex items-center gap-1"
                        >
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            Publish Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
