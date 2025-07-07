"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { quotes } from "@/data/quotes"
import { motion, AnimatePresence } from "framer-motion"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { jsPDF } from "jspdf"

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic."),
})

// Add visually hidden utility
const srOnly = "sr-only"

export default function QuoteForm() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [apiQuote, setApiQuote] = useState("")
  const [apiAuthor, setApiAuthor] = useState("")
  const [analysis, setAnalysis] = useState({ words: 0, chars: 0, vowels: 0 })
  const [chatOpen, setChatOpen] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const quoteBoxRef = useRef<HTMLDivElement>(null)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  // Chat comments state
  const [comments, setComments] = useState<string[]>([])
  const [commentInput, setCommentInput] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editInput, setEditInput] = useState("")
  const chatInputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  const popularTopics = [
    "success",
    "life",
    "inspiration",
    "motivation",
    "happiness",
    "wisdom",
    "courage",
    "friendship",
    "resilience",
    "discipline",
    "growth",
    "mindfulness",
    "gratitude",
    "purpose",
    "self-care",
    "self-respect",
    "emotional-intelligence",
    "creativity",
    "kindness",
    "connection",
    "perseverance",
    "optimism",
    "integrity",
    "passion",
    "balance",
  ]

  const onSubmit = (data: { topic: string }) => {
    setLoading(true)
    setTimeout(() => {
      const filtered = quotes
        .filter((q) =>
          q.topic.toLowerCase().includes(data.topic.toLowerCase())
        )
        .map((q) => q.text)
        .slice(0, 3)
      setResults(filtered)
      setLoading(false)
    }, 700)
  }

  const handleTopicClick = (topic: string) => {
    form.setValue("topic", topic)
    onSubmit({ topic })
  }

  const copyToClipboard = (quote: string) => {
    navigator.clipboard.writeText(quote)
    toast.success("Quote copied!")
  }

  // Fetch quote from API Ninjas
  const fetchApiQuote = async () => {
    setApiLoading(true)
    setApiQuote("")
    setApiAuthor("")
    setAnalysis({ words: 0, chars: 0, vowels: 0 })
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "SlKO+RuumFpFsg1MXQbwsw==lqu3LDqCaK7VP76k" },
      })
      if (!response.ok) throw new Error("Network error")
      const [data] = await response.json()
      setApiQuote(data.quote)
      setApiAuthor(data.author)
    } catch {
      setApiQuote("Error: Unable to fetch quote. Check your network connection.")
      setApiAuthor("")
    } finally {
      setApiLoading(false)
    }
  }

  // Analyze the current API quote
  const analyzeQuote = () => {
    if (!apiQuote) return
    const chars = apiQuote.length + (apiAuthor ? (" - " + apiAuthor).length : 0)
    const words = (apiQuote + (apiAuthor ? " - " + apiAuthor : "")).split(/\s+/).length
    const vowels = ((apiQuote + (apiAuthor ? " - " + apiAuthor : "")).match(/[aeiou]/gi) || []).length
    setAnalysis({ words, chars, vowels })
  }

  // Reset API quote and analysis
  const resetApiQuote = () => {
    setApiQuote("")
    setApiAuthor("")
    setAnalysis({ words: 0, chars: 0, vowels: 0 })
  }

  // Download quote as PDF
  const downloadPdf = () => {
    if (!apiQuote) return
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      doc.setFontSize(12)
      const fullQuote = apiQuote + (apiAuthor ? ` - ${apiAuthor}` : "")
      const splitQuote = doc.splitTextToSize(fullQuote, 180)
      doc.text(splitQuote, 20, 20)
      doc.save("quote.pdf")
    } catch (error) {
      setApiQuote("Error generating PDF: " + (error instanceof Error ? error.message : "Unknown error"))
    }
  }

  // Toggle chat window
  const toggleChat = () => setChatOpen((v) => !v)

  // Load comments from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quote_comments")
    if (saved) setComments(JSON.parse(saved))
  }, [])

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quote_comments", JSON.stringify(comments))
  }, [comments])

  // Handle comment submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentInput.trim()) {
      setComments([commentInput.trim(), ...comments])
      setCommentInput("")
      setTimeout(() => chatInputRef.current?.focus(), 0)
    }
  }

  // Handle delete comment
  const handleDeleteComment = (idx: number) => {
    setComments(comments.filter((_, i) => i !== idx))
  }

  // Handle start editing
  const handleEditComment = (idx: number) => {
    setEditingIndex(idx)
    setEditInput(comments[idx])
    setTimeout(() => editInputRef.current?.focus(), 0)
  }

  // Handle save edit
  const handleSaveEdit = (idx: number) => {
    if (editInput.trim()) {
      setComments(comments.map((c, i) => (i === idx ? editInput.trim() : c)))
      setEditingIndex(null)
      setEditInput("")
    }
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditInput("")
  }

  return (
    <>
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-purple-900 px-4 py-2 rounded z-50">Skip to main content</a>
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-purple-900 to-fuchsia-600" tabIndex={-1} lang="en">
        <div className="min-h-screen flex bg-white border-2  items-center justify-center p-4">
          <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl p-6 md:p-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-purple-500 transition-all duration-200">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-purple-900 text-center" tabIndex={0} aria-label="Quote Generator">✨ Quote Generator</h1>

            {/* --- Random Quote (API) Section - always at the top --- */}
            <section className="mt-4 p-4 md:p-6 bg-purple-100/60 rounded-lg border border-purple-500 border-purple-1000 shadow" role="region" aria-labelledby="api-quote-heading">
              <div className="flex flex-col md:flex-row md:items-center mb-2 gap-2 md:gap-0">
                <span id="api-quote-heading" className="text-lg md:text-xl font-bold text-purple-800 flex items-center gap-2">
                  <span role="img" aria-label="globe">🌐</span> Random Quote (API)
                </span>
                <button
                  onClick={toggleChat}
                  className="md:ml-auto text-purple-600 hover:text-purple-900 p-1 rounded-full self-start md:self-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  aria-label="Open chat window"
                  tabIndex={0}
                >
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
              </div>
              <div ref={quoteBoxRef} id="quoteBox" className="min-h-[48px] text-purple-900 italic mb-4 text-base md:text-lg flex items-center gap-2" aria-live="polite">
                {apiQuote ? (
                  <>
                    <span>{apiQuote}{apiAuthor && <span> - <b>{apiAuthor}</b></span>}</span>
                    <button
                      onClick={() => {
                        const fullQuote = apiQuote + (apiAuthor ? ` - ${apiAuthor}` : "")
                        navigator.clipboard.writeText(fullQuote)
                        toast.success("Quote copied!")
                      }}
                      className="ml-2 text-purple-600 hover:text-purple-900 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      aria-label="Copy API quote to clipboard"
                      tabIndex={0}
                    >
                      <Copy size={20} aria-hidden="true" />
                      <span className={srOnly}>Copy quote</span>
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500">Click &quot;Generate Quote&quot; to get started!</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mb-4" role="group" aria-label="API quote actions">
                <Button
                  id="generateBtn"
                  onClick={fetchApiQuote}
                  disabled={apiLoading}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:brightness-110 transition-all duration-200 flex-1 min-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  aria-label="Generate a new random quote"
                >
                  {apiLoading ? "Loading..." : "✨ Generate Quote"}
                </Button>
                <Button
                  id="analyzeBtn"
                  onClick={analyzeQuote}
                  disabled={!apiQuote}
                  className={`flex-1 min-w-[120px] text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    apiQuote
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  aria-label="Analyze the current quote"
                >
                  🔍 Analyze
                </Button>
                <Button
                  id="resetBtn"
                  onClick={resetApiQuote}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-100 transition-all duration-200 flex-1 min-w-[100px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Reset API quote and analysis"
                >
                  ❌ Reset
                </Button>
                <Button
                  id="downloadBtn"
                  onClick={downloadPdf}
                  disabled={!apiQuote}
                  className={`flex-1 min-w-[130px] text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                    apiQuote
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-300"
                  }`}
                  aria-label="Download quote as PDF"
                >
                  ⬇️ Download PDF
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm md:text-base text-purple-800 px-1 pb-1" aria-live="polite">
                <div>Words: <span id="wordCount">{analysis.words}</span></div>
                <div>Chars: <span id="charCount">{analysis.chars}</span></div>
                <div>Vowels: <span id="vowelCount">{analysis.vowels}</span></div>
              </div>
            </section>

            {/* Popular Topics */}
            <section className="mt-6" role="region" aria-labelledby="popular-topics-heading">
              <p id="popular-topics-heading" className="text-sm text-purple-900 mb-3 font-medium">
                Try clicking on popular topics:
              </p>
              <div className="flex flex-wrap gap-2" role="list">
                {popularTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className="px-3 py-1.5 bg-purple-100 text-purple-700 border border-purple-300 rounded-full text-sm hover:bg-purple-200 transition-all capitalize font-medium whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label={`Search quotes for topic: ${topic}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </section>

            {/* Keyword Search Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-6"
                aria-label="Search quotes by keyword"
              >
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter a Keyword Like (e.g. success, life, inspiration, motivation, happiness, wisdom, courage, friendship, resilience, discipline, growth, mindfulness, gratitude, purpose, self-care, self-respect, emotional-intelligence, creativity, kindness, connection, perseverance, optimism, integrity, passion, balance)"
                          className="placeholder:text-purple-400 border-purple-300 focus:border-fuchsia-500 focus:ring-fuchsia-500 bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                          aria-label="Enter a keyword to search quotes"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  disabled={loading}
                  aria-label="Get quotes for entered keyword"
                >
                  {loading ? "Searching..." : "Get Quotes"}
                </Button>
              </form>
            </Form>

            {/* Keyword Quotes (search results) */}
            <section className="mt-6 space-y-4" role="region" aria-labelledby="search-results-heading">
              <h2 id="search-results-heading" className="sr-only">Search Results</h2>
              <AnimatePresence>
                {results.map((quote, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-purple-50/80 p-4 border border-purple-200 rounded-lg text-sm shadow-md flex justify-between items-center group"
                  >
                    <p className="text-gray-700 italic mr-2 flex-1">&ldquo;{quote}&rdquo;</p>
                    <button
                      onClick={() => copyToClipboard(quote)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 hover:text-purple-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      aria-label="Copy quote to clipboard"
                    >
                      <Copy size={18} aria-hidden="true" />
                      <span className={srOnly}>Copy quote</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {results.length === 0 && !loading && (
                <p className="text-sm text-center text-gray-600">
                  No quotes found. Try a different topic.
                </p>
              )}
            </section>

            {/* --- New: Chat Window --- */}
            {chatOpen && (
              <div id="chatWindow" className="fixed z-50 bottom-4 right-4 w-full max-w-xs sm:max-w-sm md:max-w-md h-80 md:h-96 bg-white border border-purple-300 rounded-xl shadow-2xl flex flex-col transition-all duration-200" role="dialog" aria-modal="true" aria-label="Chat window">
                <div className="flex items-center justify-between p-3 border-b border-purple-200 bg-purple-50 rounded-t-xl">
                  <span className="font-semibold text-purple-800">Comments</span>
                  <button onClick={toggleChat} className="text-purple-600 hover:text-purple-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500" aria-label="Close chat window">✕</button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto text-gray-700 flex flex-col-reverse gap-3">
                  {/* Comments list, newest first */}
                  {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                  ) : (
                    comments.map((c, i) => (
                      <div key={i} className="bg-purple-50 border border-purple-200 rounded p-2 text-sm text-gray-800 shadow-sm flex items-center justify-between gap-2">
                        {editingIndex === i ? (
                          <>
                            <input
                              ref={editInputRef}
                              className="flex-1 border border-purple-200 rounded px-2 py-1 mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                              value={editInput}
                              onChange={e => setEditInput(e.target.value)}
                              aria-label="Edit comment"
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveEdit(i)
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                            />
                            <button
                              onClick={() => handleSaveEdit(i)}
                              className="text-green-600 hover:text-green-800 px-2"
                              aria-label="Save comment edit"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700 px-2"
                              aria-label="Cancel edit"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 break-words">{c}</span>
                            <button
                              onClick={() => handleEditComment(i)}
                              className="text-blue-600 hover:text-blue-800 px-2"
                              aria-label="Edit comment"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(i)}
                              className="text-red-600 hover:text-red-800 px-2"
                              aria-label="Delete comment"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleCommentSubmit} className="p-3 border-t border-purple-200 bg-purple-50 rounded-b-xl flex gap-2">
                  <input
                    ref={chatInputRef}
                    className="w-full border border-purple-200 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    placeholder="Type a message..."
                    aria-label="Type a message"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label="Post comment"
                  >
                    Post
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
