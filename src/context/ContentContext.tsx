import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Product,
  BlogPost,
  ResearchArticle,
  FAQItem,
  HeroContent,
  ScienceContent,
  AboutContent,
  ContactContent,
  MediaAsset,
  SiteContent
} from "../types";
import { DEFAULT_SITE_CONTENT } from "../data/molecureData";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface ContentContextType {
  content: SiteContent;
  isLoading: boolean;
  saveContent: (updated: SiteContent) => Promise<boolean>;
  resetContent: () => Promise<void>;
  // Product actions
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  // Article actions
  addArticle: (article: ResearchArticle) => Promise<void>;
  updateArticle: (article: ResearchArticle) => Promise<void>;
  deleteArticle: (articleId: string) => Promise<void>;
  // Post actions
  addPost: (post: BlogPost) => Promise<void>;
  updatePost: (post: BlogPost) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  // FAQ actions
  addFaq: (faq: FAQItem) => Promise<void>;
  updateFaq: (faq: FAQItem) => Promise<void>;
  deleteFaq: (faqId: string) => Promise<void>;
  // Page sections actions
  updateHero: (hero: HeroContent) => Promise<void>;
  updateScience: (science: ScienceContent) => Promise<void>;
  updateAbout: (about: AboutContent) => Promise<void>;
  updateContact: (contact: ContactContent) => Promise<void>;
  // Media actions
  addMediaAsset: (asset: MediaAsset) => Promise<void>;
  deleteMediaAsset: (assetId: string) => Promise<void>;
  uploadImage: (file: File, title?: string, category?: MediaAsset["category"]) => Promise<string | null>;
  // Auth actions
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = "molecure_site_content_v1";
const AUTH_KEY = "molecure_admin_auth_v1";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    // Initial local cache check
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...DEFAULT_SITE_CONTENT, ...parsed };
      }
    } catch (e) {
      console.error("Failed to parse cached content", e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Admin authentication state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        return JSON.parse(storedAuth);
      }
    } catch (e) {
      console.error("Failed to parse stored auth", e);
    }
    return null;
  });

  // Load content from server API on mount
  useEffect(() => {
    const fetchRemoteContent = async () => {
      try {
        const res = await fetch("/api/site-content");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const merged = { ...DEFAULT_SITE_CONTENT, ...json.data };
            setContent(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote site-content, using local fallback", err);
      }

      // If server has no content yet, persist defaults
      try {
        await fetch("/api/site-content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
        });
      } catch (e) {
        // quiet fallback
      }
      setIsLoading(false);
    };

    fetchRemoteContent();
  }, []);

  // Save content helper
  const saveContent = async (updated: SiteContent): Promise<boolean> => {
    setContent(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }

    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      return res.ok;
    } catch (e) {
      console.error("Failed to persist to server", e);
      return true; // Still true locally
    }
  };

  const resetContent = async (): Promise<void> => {
    setContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
    try {
      await fetch("/api/site-content/reset", { method: "POST" });
    } catch (e) {
      console.error("Reset request failed", e);
    }
  };

  // Product CRUD
  const addProduct = async (product: Product) => {
    const updated: SiteContent = {
      ...content,
      products: [product, ...content.products],
    };
    await saveContent(updated);
  };

  const updateProduct = async (product: Product) => {
    const updated: SiteContent = {
      ...content,
      products: content.products.map((p) => (p.id === product.id ? product : p)),
    };
    await saveContent(updated);
  };

  const deleteProduct = async (productId: string) => {
    const updated: SiteContent = {
      ...content,
      products: content.products.filter((p) => p.id !== productId),
    };
    await saveContent(updated);
  };

  // Article CRUD
  const addArticle = async (article: ResearchArticle) => {
    const updated: SiteContent = {
      ...content,
      articles: [article, ...content.articles],
    };
    await saveContent(updated);
  };

  const updateArticle = async (article: ResearchArticle) => {
    const updated: SiteContent = {
      ...content,
      articles: content.articles.map((a) => (a.id === article.id ? article : a)),
    };
    await saveContent(updated);
  };

  const deleteArticle = async (articleId: string) => {
    const updated: SiteContent = {
      ...content,
      articles: content.articles.filter((a) => a.id !== articleId),
    };
    await saveContent(updated);
  };

  // Post CRUD
  const addPost = async (post: BlogPost) => {
    const updated: SiteContent = {
      ...content,
      posts: [post, ...content.posts],
    };
    await saveContent(updated);
  };

  const updatePost = async (post: BlogPost) => {
    const updated: SiteContent = {
      ...content,
      posts: content.posts.map((p) => (p.id === post.id ? post : p)),
    };
    await saveContent(updated);
  };

  const deletePost = async (postId: string) => {
    const updated: SiteContent = {
      ...content,
      posts: content.posts.filter((p) => p.id !== postId),
    };
    await saveContent(updated);
  };

  // FAQ CRUD
  const addFaq = async (faq: FAQItem) => {
    const updated: SiteContent = {
      ...content,
      faqs: [...content.faqs, faq],
    };
    await saveContent(updated);
  };

  const updateFaq = async (faq: FAQItem) => {
    const updated: SiteContent = {
      ...content,
      faqs: content.faqs.map((f) => (f.id === faq.id ? faq : f)),
    };
    await saveContent(updated);
  };

  const deleteFaq = async (faqId: string) => {
    const updated: SiteContent = {
      ...content,
      faqs: content.faqs.filter((f) => f.id !== faqId),
    };
    await saveContent(updated);
  };

  // Page sections
  const updateHero = async (hero: HeroContent) => {
    await saveContent({ ...content, hero });
  };

  const updateScience = async (science: ScienceContent) => {
    await saveContent({ ...content, science });
  };

  const updateAbout = async (about: AboutContent) => {
    await saveContent({ ...content, about });
  };

  const updateContact = async (contact: ContactContent) => {
    await saveContent({ ...content, contact });
  };

  // Media
  const addMediaAsset = async (asset: MediaAsset) => {
    await saveContent({
      ...content,
      media: [asset, ...content.media],
    });
  };

  const deleteMediaAsset = async (assetId: string) => {
    await saveContent({
      ...content,
      media: content.media.filter((m) => m.id !== assetId),
    });
  };

  // Upload file helper
  const uploadImage = async (
    file: File,
    title?: string,
    category: MediaAsset["category"] = "general"
  ): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        try {
          // Attempt server upload
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dataUrl,
              filename: file.name,
              title: title || file.name,
            }),
          });

          let finalUrl = dataUrl;
          if (res.ok) {
            const data = await res.json();
            if (data.url) finalUrl = data.url;
          }

          const newAsset: MediaAsset = {
            id: `media_${Date.now()}`,
            title: title || file.name,
            url: finalUrl,
            category,
            createdAt: new Date().toISOString().split("T")[0],
          };

          await addMediaAsset(newAsset);
          resolve(finalUrl);
        } catch (e) {
          // Fallback to storing raw base64 as asset
          const newAsset: MediaAsset = {
            id: `media_${Date.now()}`,
            title: title || file.name,
            url: dataUrl,
            category,
            createdAt: new Date().toISOString().split("T")[0],
          };
          await addMediaAsset(newAsset);
          resolve(dataUrl);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Admin Login with exact credentials
  const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Verify against required credentials: pappuott@gmail.com and Admin@2026
    if (cleanEmail === "pappuott@gmail.com" && cleanPass === "Admin@2026") {
      const user: AdminUser = {
        email: "pappuott@gmail.com",
        name: "Molecure Super Admin",
        role: "Administrator",
      };

      try {
        // Also call server login
        await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
        });
      } catch (e) {
        // quiet
      }

      setAdminUser(user);
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true };
    }

    return {
      success: false,
      error: "Authentication failed. The email or password entered does not match administrator authorization.",
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        saveContent,
        resetContent,
        addProduct,
        updateProduct,
        deleteProduct,
        addArticle,
        updateArticle,
        deleteArticle,
        addPost,
        updatePost,
        deletePost,
        addFaq,
        updateFaq,
        deleteFaq,
        updateHero,
        updateScience,
        updateAbout,
        updateContact,
        addMediaAsset,
        deleteMediaAsset,
        uploadImage,
        adminUser,
        isAdminAuthenticated: !!adminUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
