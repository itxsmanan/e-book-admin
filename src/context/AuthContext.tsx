import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin';
  joinedDate: string;
  subscription: 'Monthly' | 'Quarterly' | 'Half-Yearly' | '9-Month Plan' | 'Annual' | 'None';
  status: 'Active' | 'Suspended';
  avatar: string;
  purchasedBooks: number[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  badgeDate: string;
  location: string;
  description: string;
  celebrity: {
    avatar: string;
    name: string;
    title: string;
  };
  quote: string;
  imageIcon: string;
  testimonials: Array<{
    name: string;
    role: string;
    avatar: string;
    quote: string;
  }>;
  gallery?: string[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  rating: number;
  reviews: number;
  description: string;
  pages: number;
  language: string;
  isbn: string;
  publisher: string;
  published: string;
  ebookPrice: number;
  printPrice: number;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  period: string;
  saveText: string;
  features: string[];
  btnText: string;
  isGold: boolean;
  isPopular: boolean;
  badge?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'Pending' | 'Resolved';
}

interface AuthContextType {
  // Authentication
  isAuthenticated: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Users List
  users: User[];
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;
  addUser: (user: Omit<User, 'id' | 'joinedDate'>) => void;

  // Events CRUD
  eventsList: Event[];
  createEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, updatedEvent: Partial<Event>) => void;
  deleteEvent: (id: number) => void;

  // Books CRUD
  booksList: Book[];
  createBook: (book: Omit<Book, 'id' | 'rating' | 'reviews'>) => void;
  updateBook: (id: number, updatedBook: Partial<Book>) => void;
  deleteBook: (id: number) => void;

  // Subscription Plans
  plansList: SubscriptionPlan[];
  updatePlan: (name: string, updatedPlan: Partial<SubscriptionPlan>) => void;

  // Inquiries
  inquiriesList: Inquiry[];
  resolveInquiry: (id: string) => void;
  deleteInquiry: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Seed Data
const initialUsers: User[] = [
  { id: 'usr-101', name: 'Ali Khan', email: 'ali.khan@gmail.com', role: 'User', joinedDate: '2026-01-10', subscription: 'Monthly', status: 'Active', avatar: '🧑‍💻', purchasedBooks: [1, 2] },
  { id: 'usr-102', name: 'Fatima Zahra', email: 'fatima.zahra@yahoo.com', role: 'User', joinedDate: '2026-02-14', subscription: 'Annual', status: 'Active', avatar: '👩‍⚕️', purchasedBooks: [1, 3, 4] },
  { id: 'usr-103', name: 'Bilal Ahmed', email: 'bilal.ahmed@gmail.com', role: 'User', joinedDate: '2025-11-20', subscription: 'None', status: 'Suspended', avatar: '👨‍💼', purchasedBooks: [] },
  { id: 'usr-104', name: 'Dolat Khan Kakar', email: 'author@kitabondolat.com', role: 'Admin', joinedDate: '2025-05-01', subscription: 'Annual', status: 'Active', avatar: '✍️', purchasedBooks: [1, 2, 3, 4] },
  { id: 'usr-105', name: 'Zainab Bibi', email: 'zainab.bibi@gmail.com', role: 'User', joinedDate: '2026-03-01', subscription: 'Quarterly', status: 'Active', avatar: '👩‍🏫', purchasedBooks: [3] },
  { id: 'usr-106', name: 'Hamza Siddiqui', email: 'hamza.s@gmail.com', role: 'User', joinedDate: '2026-05-18', subscription: '9-Month Plan', status: 'Active', avatar: '👨‍🎨', purchasedBooks: [2, 4] }
];

const initialPlans: SubscriptionPlan[] = [
  {
    name: "Monthly",
    price: 499,
    period: "/month",
    saveText: "Perfect for trial",
    features: ["Full E-Library access", "Unlimited book downloads", "Audio book streaming", "Mobile & tablet apps", "Cancel anytime"],
    btnText: "Start Free Trial",
    isGold: false,
    isPopular: false
  },
  {
    name: "Quarterly",
    price: 1299,
    period: "/3 months",
    saveText: "Save 13% • Rs. 433/month",
    features: ["Everything in Monthly", "Priority support", "Early book access", "Exclusive Q&As", "10% off print books"],
    btnText: "Subscribe Now",
    isGold: false,
    isPopular: false
  },
  {
    name: "Half-Yearly",
    price: 2399,
    period: "/6 months",
    saveText: "Save 20% • Rs. 400/month",
    features: ["Everything in Quarterly", "1 signed paperback free", "Private community access", "Reading analytics", "20% off print books"],
    btnText: "Best Value",
    isGold: true,
    isPopular: true,
    badge: "Most Popular"
  },
  {
    name: "9-Month Plan",
    price: 3299,
    period: "/9 months",
    saveText: "Save 26% • Rs. 367/month",
    features: ["Everything in Half-Yearly", "2 signed books included", "Virtual author meetups", "Gift 1 month to friend", "25% off print books"],
    btnText: "Subscribe Now",
    isGold: false,
    isPopular: false
  },
  {
    name: "Annual",
    price: 3999,
    period: "/year",
    saveText: "Save 33% • Rs. 333/month",
    features: ["Everything in 9-Month", "3 signed books + merch", "Lifetime print discounts", "Name in acknowledgments", "Annual gala invite"],
    btnText: "Join Now",
    isGold: true,
    isPopular: false,
    badge: "Best Deal"
  }
];

const initialInquiries: Inquiry[] = [
  { id: 'inq-1', name: 'Sajid Kakar', email: 'sajid.kakar@gmail.com', message: 'Assalam-o-Alaikum! I want to buy the printed/signed copy of "Khwahishon Ki Baarish". Do you ship to Quetta or Harnai? Please guide me about payment.', date: '2026-06-19', status: 'Pending' },
  { id: 'inq-2', name: 'Amna Malik', email: 'amna.m@gmail.com', message: 'I transferred Rs. 1,299 via EasyPaisa for the Quarterly plan, but my app access is still showing basic. I have sent the receipt screenshot to your WhatsApp number.', date: '2026-06-20', status: 'Pending' },
  { id: 'inq-3', name: 'Prof. Tariq', email: 'tariq@uob.edu.pk', message: 'Excellent website and audio library! Is there a plan to publish Dolat Khan Kakar sahib\'s legal analysis articles as a separate book in the near future?', date: '2026-06-18', status: 'Resolved' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Lists in state, synced to localStorage
  const [users, setUsers] = useState<User[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [plansList, setPlansList] = useState<SubscriptionPlan[]>([]);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);

  // Load from local storage
  useEffect(() => {
    // Auth Check
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    const storedAdmin = sessionStorage.getItem('admin_user');
    if (sessionAuth === 'true' && storedAdmin) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(storedAdmin));
    }

    // Users loading
    const localUsers = localStorage.getItem('kitabon_users');
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      localStorage.setItem('kitabon_users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }

    // Plans loading
    const localPlans = localStorage.getItem('kitabon_plans');
    if (localPlans) {
      setPlansList(JSON.parse(localPlans));
    } else {
      localStorage.setItem('kitabon_plans', JSON.stringify(initialPlans));
      setPlansList(initialPlans);
    }

    // Inquiries loading
    const localInquiries = localStorage.getItem('kitabon_inquiries');
    if (localInquiries) {
      setInquiriesList(JSON.parse(localInquiries));
    } else {
      localStorage.setItem('kitabon_inquiries', JSON.stringify(initialInquiries));
      setInquiriesList(initialInquiries);
    }

    // Events loading (uses defaultEvents if not present)
    const localEvents = localStorage.getItem('kitabon_events');
    if (localEvents) {
      const obj = JSON.parse(localEvents);
      setEventsList(Object.values(obj));
    } else {
      const initialEventsObj = {
        1: {
          id: 1,
          title: "Supreme Court Book Launch",
          date: "December 15, 2025",
          badgeDate: "Dec 15, 2025",
          location: "Supreme Court of Pakistan, Islamabad",
          description: "A momentous occasion where 'The Silent Echo' was presented to the Chief Justice of Pakistan. The event saw attendance from senior judges, legal scholars, and members of the bar.",
          celebrity: { avatar: "👨‍⚖️", name: "Justice Qazi Faez Isa", title: "Chief Justice of Pakistan" },
          quote: "This book brilliantly captures the essence of Pakistani jurisprudence...",
          imageIcon: "📸",
          testimonials: [
            { name: "Justice Qazi Faez Isa", role: "Chief Justice of Pakistan", avatar: "👨‍⚖️", quote: "This book brilliantly captures the essence of Pakistani jurisprudence and presents complex legal concepts through an engaging narrative. Dolat Khan Kakar has done remarkable work in making law accessible to the common reader." },
            { name: "Justice Ayesha Malik", role: "Supreme Court Judge", avatar: "👩‍⚖️", quote: "An important contribution to legal literature in Pakistan. The author's deep understanding of our legal system shines through every chapter." }
          ]
        },
        2: {
          id: 2,
          title: "Bollywood Celebrity Meet",
          date: "November 22, 2025",
          badgeDate: "Nov 22, 2025",
          location: "Pearl Continental Hotel, Karachi",
          description: "An exclusive evening where leading Pakistani celebrities received signed copies of 'Mindful Leadership'. The event featured panel discussions on literature's role in shaping society.",
          celebrity: { avatar: "🌟", name: "Mahira Khan", title: "Leading Pakistani Actor" },
          quote: "Dolat's storytelling transported me to another world. A must-read!",
          imageIcon: "🎬",
          testimonials: [
            { name: "Mahira Khan", role: "Leading Actor", avatar: "🌟", quote: "Dolat's storytelling transported me to another world. His characters feel so real, so Pakistani, yet so universal. A must-read for anyone who loves good literature." },
            { name: "Fawad Khan", role: "Actor & Producer", avatar: "🎭", quote: "As someone who appreciates good narratives, I was blown away by the depth and authenticity of this work. Dolat has given Pakistan a literary treasure." }
          ]
        },
        3: {
          id: 3,
          title: "Governor House Ceremony",
          date: "October 10, 2025",
          badgeDate: "Oct 10, 2025",
          location: "Governor House, Lahore",
          description: "A prestigious ceremony attended by government officials, bureaucrats, and prominent business leaders. The event celebrated Pakistani literature and its contribution to national discourse.",
          celebrity: { avatar: "🎖️", name: "Governor Punjab", title: "Government Official" },
          quote: "An exceptional contribution to Pakistani literature...",
          imageIcon: "🏛️",
          testimonials: [
            { name: "Governor Punjab", role: "Chief Guest", avatar: "🎖️", quote: "An exceptional contribution to Pakistani literature. This book represents the intellectual prowess of our young generation and should be in every library." }
          ]
        },
        4: {
          id: 4,
          title: "Authors Convention",
          date: "September 5, 2025",
          badgeDate: "Sep 5, 2025",
          location: "National Library, Islamabad",
          description: "Pakistan's literary community gathered to celebrate the release of 'Khwahishon Ki Baarish'. Fellow authors, poets, and literary critics engaged in meaningful discussions about the state of Urdu literature.",
          celebrity: { avatar: "📚", name: "Intizar Hussain", title: "Renowned Pakistani Author" },
          quote: "Dolat Khan Kakar represents the new generation of Pakistani writers...",
          imageIcon: "✍️",
          testimonials: [
            { name: "Intizar Hussain", role: "Renowned Author", avatar: "📚", quote: "Dolat Khan Kakar represents the new generation of Pakistani writers who are unafraid to push boundaries while staying rooted in our rich literary tradition." }
          ]
        }
      };
      localStorage.setItem('kitabon_events', JSON.stringify(initialEventsObj));
      setEventsList(Object.values(initialEventsObj));
    }

    // Books loading
    const localBooks = localStorage.getItem('kitabon_books');
    if (localBooks) {
      const obj = JSON.parse(localBooks);
      setBooksList(Object.values(obj));
    } else {
      const initialBooksObj = {
        1: {
          id: 1,
          title: "The Silent Echo",
          author: "Dolat Khan Kakar",
          category: "Fiction • Thriller",
          cover: "📖",
          rating: 4.8,
          reviews: 1247,
          description: "A gripping psychological thriller set in the heart of Lahore. When a renowned psychiatrist begins hearing echoes of conversations that haven't happened yet, he must unravel a conspiracy that threatens to destroy everything he holds dear. A masterfully crafted tale of suspense, identity, and the power of the human mind.",
          pages: 384,
          language: "English",
          isbn: "978-969-XXXXX-1",
          publisher: "Kitabon Ki Dolat Publishing",
          published: "2025",
          ebookPrice: 899,
          printPrice: 1299
        },
        2: {
          id: 2,
          title: "Mindful Leadership",
          author: "Dolat Khan Kakar",
          category: "Self-Help • Business",
          cover: "📚",
          rating: 4.9,
          reviews: 892,
          description: "Transform your leadership style with ancient wisdom and modern psychology. Dolat Khan Kakar draws from years of experience and research to present a revolutionary approach to leadership that emphasizes mindfulness, emotional intelligence, and authentic connection. Perfect for CEOs, managers, and anyone looking to lead with purpose.",
          pages: 312,
          language: "English",
          isbn: "978-969-XXXXX-2",
          publisher: "Kitabon Ki Dolat Publishing",
          published: "2026",
          ebookPrice: 1199,
          printPrice: 1599
        },
        3: {
          id: 3,
          title: "Khwahishon Ki Baarish",
          author: "Dolat Khan Kakar",
          category: "Poetry • Urdu Literature",
          cover: "📕",
          rating: 5.0,
          reviews: 2156,
          description: "A beautiful collection of Urdu poetry that captures the essence of longing, love, hope, and the human experience. Dolat Khan Kakar's verses flow like rain, each poem a droplet of emotion that resonates with the soul. Winner of the Pakistan Literary Award 2025.",
          pages: 256,
          language: "Urdu",
          isbn: "978-969-XXXXX-3",
          publisher: "Kitabon Ki Dolat Publishing",
          published: "2025",
          ebookPrice: 699,
          printPrice: 999
        },
        4: {
          id: 4,
          title: "Building Fortune",
          author: "Dolat Khan Kakar",
          category: "Business • Finance",
          cover: "📗",
          rating: 4.7,
          reviews: 634,
          description: "A comprehensive guide to building wealth in Pakistan's evolving economy. From investment strategies to entrepreneurship, from saving habits to creating multiple income streams, this book covers everything you need to know about achieving financial independence. Includes real case studies from Pakistani success stories.",
          pages: 428,
          language: "English",
          isbn: "978-969-XXXXX-4",
          publisher: "Kitabon Ki Dolat Publishing",
          published: "2026",
          ebookPrice: 1399,
          printPrice: 1799
        }
      };
      localStorage.setItem('kitabon_books', JSON.stringify(initialBooksObj));
      setBooksList(Object.values(initialBooksObj));
    }
  }, []);

  // Update localStorage helper
  const syncUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('kitabon_users', JSON.stringify(newUsers));
  };

  const syncEvents = (newEvents: Event[]) => {
    setEventsList(newEvents);
    const obj: Record<number, Event> = {};
    newEvents.forEach(e => {
      obj[e.id] = e;
    });
    localStorage.setItem('kitabon_events', JSON.stringify(obj));
  };

  const syncBooks = (newBooks: Book[]) => {
    setBooksList(newBooks);
    const obj: Record<number, Book> = {};
    newBooks.forEach(b => {
      obj[b.id] = b;
    });
    localStorage.setItem('kitabon_books', JSON.stringify(obj));
  };

  const syncPlans = (newPlans: SubscriptionPlan[]) => {
    setPlansList(newPlans);
    localStorage.setItem('kitabon_plans', JSON.stringify(newPlans));
  };

  const syncInquiries = (newInquiries: Inquiry[]) => {
    setInquiriesList(newInquiries);
    localStorage.setItem('kitabon_inquiries', JSON.stringify(newInquiries));
  };

  // Auth Functions
  const login = (username: string, password: string): boolean => {
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      const user = { name: 'Dolat Khan Kakar', email: 'author@kitabondolat.com', role: 'Super Admin' };
      setIsAuthenticated(true);
      setAdminUser(user);
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_user');
  };

  // User Actions
  const toggleUserStatus = (id: string) => {
    const updated = users.map(u => 
      u.id === id ? { ...u, status: (u.status === 'Active' ? 'Suspended' : 'Active') as 'Active' | 'Suspended' } : u
    );
    syncUsers(updated);
  };

  const deleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    syncUsers(updated);
  };

  const addUser = (user: Omit<User, 'id' | 'joinedDate'>) => {
    const newUser: User = {
      ...user,
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    syncUsers([...users, newUser]);
  };

  // Event Actions
  const createEvent = (event: Omit<Event, 'id'>) => {
    const maxId = eventsList.reduce((max, e) => e.id > max ? e.id : max, 0);
    const newEvent: Event = {
      ...event,
      id: maxId + 1
    };
    syncEvents([...eventsList, newEvent]);
  };

  const updateEvent = (id: number, updatedEvent: Partial<Event>) => {
    const updated = eventsList.map(e => {
      if (e.id === id) {
        return {
          ...e,
          ...updatedEvent,
          celebrity: {
            ...e.celebrity,
            ...updatedEvent.celebrity
          }
        };
      }
      return e;
    });
    syncEvents(updated);
  };

  const deleteEvent = (id: number) => {
    const updated = eventsList.filter(e => e.id !== id);
    syncEvents(updated);
  };

  // Book Actions
  const createBook = (book: Omit<Book, 'id' | 'rating' | 'reviews'>) => {
    const maxId = booksList.reduce((max, b) => b.id > max ? b.id : max, 0);
    const newBook: Book = {
      ...book,
      id: maxId + 1,
      rating: 5.0,
      reviews: 0
    };
    syncBooks([...booksList, newBook]);
  };

  const updateBook = (id: number, updatedBook: Partial<Book>) => {
    const updated = booksList.map(b => b.id === id ? { ...b, ...updatedBook } : b);
    syncBooks(updated);
  };

  const deleteBook = (id: number) => {
    const updated = booksList.filter(b => b.id !== id);
    syncBooks(updated);
  };

  // Plans Actions
  const updatePlan = (name: string, updatedPlan: Partial<SubscriptionPlan>) => {
    const updated = plansList.map(p => p.name === name ? { ...p, ...updatedPlan } : p);
    syncPlans(updated);
  };

  // Inquiries Actions
  const resolveInquiry = (id: string) => {
    const updated = inquiriesList.map(inq => 
      inq.id === id ? { ...inq, status: 'Resolved' as const } : inq
    );
    syncInquiries(updated);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiriesList.filter(inq => inq.id !== id);
    syncInquiries(updated);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, adminUser, login, logout,
      users, toggleUserStatus, deleteUser, addUser,
      eventsList, createEvent, updateEvent, deleteEvent,
      booksList, createBook, updateBook, deleteBook,
      plansList, updatePlan,
      inquiriesList, resolveInquiry, deleteInquiry
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
};
