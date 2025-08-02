import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArticleCard from "../components/ArticleCard";
import CommentSection from "../components/CommentSection";
import api from "../utils/axios";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaWhatsapp,
  FaLink,
  FaLinkedin,
} from "react-icons/fa";

export default function ArticlePage() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { t } = useTranslation();
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the latest 5 articles using backend pagination and sorting
        const articlesResponse = await api.get(
          "/articles?limit=5&sort=-createdAt"
        );

        const allArticles = articlesResponse.data.data || [];

        if (allArticles.length === 0) throw new Error("No articles found");

        // The newest article (first in the array) becomes the main article
        const mainArticle = allArticles[0];

        // The remaining articles become related articles
        const relatedArticles = allArticles.slice(1);

        setArticle(mainArticle);
        setRelatedArticles(relatedArticles);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            t("error_fetching_article")
        );
        if (err.response?.status === 404) {
          navigate("/404", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArticleData();
  }, [navigate, t]);

  // Close share dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    }
    if (showShare) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShare]);

  const handleShare = (platform) => {
    if (!article) return;
    const url = window.location.href;
    const title = article.title;
    let shareUrl = "";
    // For Twitter, Telegram, WhatsApp, pre-populate with url + title + summary (URL only at the start)
    const summary = (article.content || "")
      .replace(/<[^>]+>/g, "")
      .slice(0, 150);
    const message = `${url}  ${title}: ${summary}`;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(`${title}: ${summary}`)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setShowShare(false);
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setShowShare(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-red-400">{error}</h1>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#383C00] text-white rounded hover:bg-[#2c2f00]"
        >
          {t("try_again")}
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>{t("article_not_found")}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {article.title}
            </h1>
            <div className="relative" ref={shareRef}>
              <button
                className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setShowShare((s) => !s)}
                aria-label="Share"
              >
                <FaShareAlt className="text-xl text-[#383C00]" />
              </button>
              {showShare && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in">
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-[#1877f3]"
                    onClick={() => handleShare("facebook")}
                  >
                    <FaFacebook className="mr-2" /> Facebook
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-[#1da1f2]"
                    onClick={() => handleShare("twitter")}
                  >
                    <FaTwitter className="mr-2" /> Twitter
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-[#0088cc]"
                    onClick={() => handleShare("telegram")}
                  >
                    <FaTelegram className="mr-2" /> Telegram
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-[#25d366]"
                    onClick={() => handleShare("whatsapp")}
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-[#0077b5]"
                    onClick={() => handleShare("linkedin")}
                  >
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => handleShare("copy")}
                  >
                    <FaLink className="mr-2" /> {t("copy_link") || "Copy Link"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>
              {new Date(article.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="mx-2">•</span>
            <span>{article.author?.name || t("anonymous")}</span>
          </div>
        </header>

        {/* Image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto mb-8 rounded-lg object-cover max-h-96"
            loading="lazy"
          />
        )}

        {/* Video */}
        {article.video && !article.file && (
          <div className="mb-8 aspect-video w-full">
            <video
              controls
              className="w-full h-auto rounded-lg"
              poster={article.image}
            >
              <source src={article.video} type="video/mp4" />
              {t("browser_not_support_video")}
            </video>
          </div>
        )}

        {/* PDF file */}
        {article.file && article.file.endsWith(".pdf") && (
          <div className="mt-2">
            <a
              href={article.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {t("download_pdf") || "Download PDF"}
            </a>
          </div>
        )}

        <div
          className="prose text-gray-500 max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags?.length > 0 && (
          <footer className="mb-12">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        )}

        <CommentSection articleId={article._id} comments={article.comments} />
      </article>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {t("related_articles")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
