// ---------------------------------------------------------------------------
// MOCK DATA — temporary frontend-only data for demonstration.
// This will be replaced by real API calls to the Flask backend.
// Do NOT treat this file (or localStorage) as the PostgreSQL database.
// ---------------------------------------------------------------------------

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

export const MOCK_MESSAGES = [
  {
    id: "m01",
    name: "Elena Marsh",
    message:
      "Such a lovely space. I came in for a moment and left with a smile. Wishing you all the best!",
    mood: "Happy",
    createdAt: new Date(now - 1 * day).toISOString(),
  },
  {
    id: "m02",
    name: "Daniel Okafor",
    message:
      "A beautiful reminder that small moments can become wonderful memories. I signed this guestbook on a quiet Tuesday afternoon and somehow it made the whole week feel lighter.",
    mood: "Inspired",
    createdAt: new Date(now - 3 * day).toISOString(),
  },
  {
    id: "m03",
    name: "Priya Raman",
    message:
      "Loved the warmth and thought behind this. Keep creating spaces that bring people together.",
    mood: "Grateful",
    createdAt: new Date(now - 5 * day).toISOString(),
  },
  {
    id: "m04",
    name: "Tomás Herrera",
    message:
      "Leaving a little note to say thank you for making this feel so welcoming. It is rare to find a corner of the internet that feels like a handwritten letter rather than a billboard.",
    mood: "Grateful",
    createdAt: new Date(now - 8 * day).toISOString(),
  },
  {
    id: "m05",
    name: "Alice Nguyen",
    message:
      "My grandmother kept a guestbook by her front door. This reminds me of her, in the best possible way.",
    mood: "Nostalgic",
    createdAt: new Date(now - 12 * day).toISOString(),
  },
  {
    id: "m06",
    name: "Marcus Bell",
    message:
      "Stopped by while researching microservices for a college project and ended up reading every message here. Lovely idea, beautifully done.",
    mood: "Inspired",
    createdAt: new Date(now - 16 * day).toISOString(),
  },
  {
    id: "m07",
    name: "Sofia Lindqvist",
    message:
      "Hej from Sweden! Signed this on my lunch break. Now I want to start a guestbook for our apartment building.",
    mood: "Happy",
    createdAt: new Date(now - 21 * day).toISOString(),
  },
  {
    id: "m08",
    name: "James Whitfield",
    message:
      "Came back to edit my message from last month just to say: still love this place.",
    mood: "Nostalgic",
    createdAt: new Date(now - 27 * day).toISOString(),
  },
  {
    id: "m09",
    name: "Amara Diallo",
    message:
      "There is something quietly radical about a place that asks for nothing but your words.",
    mood: "Inspired",
    createdAt: new Date(now - 34 * day).toISOString(),
  },
  {
    id: "m10",
    name: "Oliver Chen",
    message: "Short and sweet: thank you for existing.",
    mood: "Grateful",
    createdAt: new Date(now - 40 * day).toISOString(),
  },
  {
    id: "m11",
    name: "Isabelle Fournier",
    message:
      "I found this site through a friend's recommendation and stayed far longer than I planned. Every message reads like a small gift. Merci!",
    mood: "Happy",
    createdAt: new Date(now - 46 * day).toISOString(),
  },
  {
    id: "m12",
    name: "Ravi Patel",
    message:
      "Good design is invisible, they say. This page proves it — everything fades away and only the words remain.",
    mood: "Inspired",
    createdAt: new Date(now - 52 * day).toISOString(),
  },
];
